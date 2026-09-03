/**
 * Optimizes image URLs by routing them through a global image CDN (wsrv.nl)
 * or applying native Cloudinary transformations.
 * 
 * @param {string} url - The original image URL
 * @param {number} width - Target width (default 400)
 * @param {number} quality - Target quality (default 80)
 * @returns {string} - The optimized CDN URL
 */
export const getOptimizedImageUrl = (url, width = 400, quality = 80) => {
    if (!url) return '';

    // Handle Cloudinary URLs natively (they are already fast if used correctly)
    if (url.includes('cloudinary.com')) {
        // If it already has optimization params, leave it (or we could force our own)
        // But for safety, let's assume valid Cloudinary links are okay, 
        // or we could replace definitions. 
        // Simpler strategy: Cloudinary is good, let it be.
        return url;
    }

    // For everything else (LinkedIn, ImgBB, etc.), use wsrv.nl Global CDN
    // Docs: https://wsrv.nl/
    // It caches, resizes, and converts to WebP/AVIF automatically.

    const cdnBase = 'https://wsrv.nl/';
    const params = new URLSearchParams({
        url: url,
        w: width,
        h: width, // Square aspect ratio for avatars
        fit: 'cover',
        a: 'center', // Attention center
        q: quality,
        output: 'webp'
    });

    return `${cdnBase}?${params.toString()}`;
};
