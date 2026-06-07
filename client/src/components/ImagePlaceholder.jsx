// Reusable placeholder — replace src prop with real image path when available
// Usage: <ImagePlaceholder src="/images/products/p1.jpg" alt="Product" />
function ImagePlaceholder({ src = null, alt = '', className = '', style = {} }) {
  if (src) {
    return <img src={src} alt={alt} className={className} style={style} loading="lazy" />;
  }
  return (
    <div
      className={`img-placeholder ${className}`}
      style={style}
      aria-label={alt}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1" opacity="0.3">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}
export default ImagePlaceholder;