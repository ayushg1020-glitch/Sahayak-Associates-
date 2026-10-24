import { MediaItem, MediaUsage, R2StorageStatus, Book, Author, BlogPost, WebsiteSettings } from '../types';
import { processImageFile } from '../utils/imageUtils';

// Authenticated fetch helper
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('sahayak_session_token');
  if (!token) throw new Error('Please sign in as an administrator.');
  
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  
  return await fetch(url, { ...options, headers });
}

/**
 * Upload an image or document to Cloudflare R2 via the server-side API endpoint
 */
export async function uploadFileToR2(
  file: File,
  options: {
    folder?: string;
    categoryFolder?: string;
    altText?: string;
    caption?: string;
    uploadedBy?: string;
    onProgress?: (progressPercent: number) => void;
  } = {}
): Promise<MediaItem> {
  const {
    folder = options.categoryFolder || 'books',
    altText,
    caption,
    uploadedBy,
    onProgress,
  } = options;

  let dimensions = '800 x 1200';
  let width = 800;
  let height = 1200;

  try {
    if (onProgress) onProgress(15);

    // Convert file to base64 dataUrl so it transmits cleanly as JSON to Express / Vite backend
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file into memory.'));
      reader.readAsDataURL(file);
    });

    if (onProgress) onProgress(40);

    // Try to extract actual image dimensions
    if (file.type && file.type.startsWith('image/')) {
      try {
        const img = new Image();
        img.src = dataUrl;
        await new Promise((res) => {
          img.onload = () => {
            width = img.naturalWidth || width;
            height = img.naturalHeight || height;
            dimensions = `${width} x ${height}`;
            res(true);
          };
          img.onerror = () => res(false);
        });
      } catch {
        // ignore dimension extraction error
      }
    }

    if (onProgress) onProgress(60);

    const response = await authenticatedFetch('/api/media/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataUrl,
        originalFilename: file.name,
        mimeType: file.type || 'image/jpeg',
        folder: folder.toLowerCase(),
        altText,
        caption,
        uploadedBy,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Session expired. Please sign in again as an administrator.');
      }
      throw new Error(errorData.error || `Server returned error ${response.status}`);
    }

    const data = await response.json();
    if (onProgress) onProgress(100);

    const media: MediaItem = {
      ...data.media,
      dimensions: dimensions,
      width,
      height,
      date: data.media?.date || new Date().toISOString().split('T')[0],
      createdAt: data.media?.createdAt || new Date().toISOString(),
    };

    return media;
  } catch (err: any) {
    console.warn('R2 upload endpoint error, checking resilient fallback:', err);
    if (onProgress) onProgress(0);

    // If server upload throws (e.g. unconfigured R2 credentials or network glitch),
    // fallback gracefully to client-side dataUrl so the administrator is NEVER blocked
    // from updating author photos, logos, or catalog assets!
    try {
      const fallbackDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const fallbackMedia: MediaItem = {
        id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: fallbackDataUrl,
        publicUrl: fallbackDataUrl,
        fileName: file.name,
        originalFileName: file.name,
        objectKey: `local/${file.name}`,
        folder: folder.toLowerCase() as any,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        dimensions: dimensions,
        width,
        height,
        mimeType: file.type || 'image/jpeg',
        storageProvider: 'local',
        altText: altText || file.name,
        caption: caption || '',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      return fallbackMedia;
    } catch {
      throw new Error(err.message || 'Failed to upload image. Please try again.');
    }
  }
}

/**
 * Delete an object from Cloudflare R2 bucket
 */
export async function deleteFileFromR2(mediaId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await authenticatedFetch(`/api/media/${mediaId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error deleting media:', err);
    return { success: false, message: err.message };
  }
}

/**
 * Fetch masked Cloudflare R2 configuration status from server
 */
export async function fetchR2StorageStatus(): Promise<R2StorageStatus> {
  try {
    const res = await fetch('/api/media/status');
    if (!res.ok) throw new Error('Status check failed');
    return await res.json();
  } catch (err: any) {
    return {
      isConfigured: false,
      isConnected: false,
      provider: 'Local Emulated R2',
      bucketName: 'Not Connected',
      publicUrl: 'Local In-Memory Cache',
      accountIdMasked: 'Not Configured',
      region: 'auto',
      maxImageSizeMB: 10,
      maxLogoSizeMB: 5,
      maxPdfSizeMB: 25,
      error: 'Backend API unavailable',
    };
  }
}

/**
 * Ping Cloudflare R2 server-side test connection
 */
export async function runR2ConnectionTest(): Promise<{
  success: boolean;
  message: string;
  latencyMs?: number;
  bucket?: string;
  objectsCount?: number;
  error?: string;
}> {
  try {
    const res = await fetch('/api/media/test-connection', {
      method: 'POST',
    });
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to ping R2 endpoint: ${err.message}`,
      error: 'NETWORK_ERROR',
    };
  }
}

/**
 * Media Usage Tracking Engine:
 * Scans all entities (books, authors, blogs, settings/logos, home banners)
 * to verify if this image is actively referenced anywhere on the public website.
 */
export function calculateMediaUsage(
  mediaUrl: string,
  mediaId: string,
  state: {
    books?: Book[];
    authors?: Author[];
    blogs?: BlogPost[];
    settings?: WebsiteSettings;
  }
): MediaUsage[] {
  const usages: MediaUsage[] = [];
  if (!mediaUrl && !mediaId) return usages;

  const urlMatches = (targetUrl?: string) => {
    if (!targetUrl) return false;
    return targetUrl === mediaUrl || (mediaUrl.length > 50 && targetUrl.includes(mediaUrl.slice(0, 40)));
  };

  // 1. Books
  (state.books || []).forEach((book) => {
    if (urlMatches(book.coverImage)) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Front Cover Artwork',
        link: `/book/${book.slug || book.id}`,
      });
    }
    if (urlMatches(book.backCoverImage)) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Back Cover Art',
        link: `/book/${book.slug || book.id}`,
      });
    }
    if (urlMatches(book.spineImage)) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Spine Art',
        link: `/book/${book.slug || book.id}`,
      });
    }
    const bookGalleries = (book as any).galleryImages || (book as any).gallery;
    if (Array.isArray(bookGalleries) && bookGalleries.some((g: string) => urlMatches(g))) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Interior Spreads Gallery',
        link: `/book/${book.slug || book.id}`,
      });
    }
  });

  // 2. Authors
  (state.authors || []).forEach((author) => {
    const authorPhoto = (author as any).avatar || (author as any).photoUrl || (author as any).photo;
    if (urlMatches(authorPhoto)) {
      usages.push({
        locationType: 'author',
        title: `Author Profile: "${author.name}"`,
        field: 'Portrait Photo',
        link: `/author/${author.slug || author.id}`,
      });
    }
  });

  // 3. Blogs
  (state.blogs || []).forEach((blog) => {
    if (urlMatches(blog.featuredImage)) {
      usages.push({
        locationType: 'blog',
        title: `Blog Essay: "${blog.title}"`,
        field: 'Featured Hero Image',
        link: `/blog/${blog.slug || blog.id}`,
      });
    }
    if (urlMatches(blog.authorAvatar)) {
      usages.push({
        locationType: 'blog',
        title: `Blog Essay: "${blog.title}"`,
        field: 'Author Avatar',
        link: `/blog/${blog.slug || blog.id}`,
      });
    }
  });

  // 4. Website Settings & Branding Logos
  if (state.settings) {
    const s = state.settings;
    if (urlMatches(s.mainLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Main Header Logo' });
    }
    if (urlMatches(s.darkLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Dark Mode Insignia' });
    }
    if (urlMatches(s.lightLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Light Mode Insignia' });
    }
    if (urlMatches(s.mobileLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Mobile Navigation Logo' });
    }
    if (urlMatches(s.footerLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Footer Insignia' });
    }
    if (urlMatches(s.favicon)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Browser Favicon' });
    }
    if (urlMatches(s.socialShareLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'OpenGraph Social Share Image' });
    }
  }

  return usages;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
