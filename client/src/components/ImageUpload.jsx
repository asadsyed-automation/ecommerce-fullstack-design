import { useState, useRef } from 'react';
import { uploadImage } from '../services/api';

function ImageUpload({ value, onChange }) {
  const [activeTab, setActiveTab] = useState(value && !value.includes('imagekit.io') ? 'url' : 'upload');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    // Client-side validations
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, WebP, and GIF images are allowed.');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      setError('File is too large. Maximum size is 10 MB.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await uploadImage(formData);
      if (res.data && res.data.url) {
        onChange(res.data.url);
      } else {
        throw new Error('Upload succeeded but no URL returned.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    onChange('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--bg-white)',
      marginTop: '6px'
    }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border)',
        background: 'var(--gray-50)'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            background: activeTab === 'upload' ? 'var(--white)' : 'transparent',
            borderRight: '1px solid var(--border)',
            fontWeight: activeTab === 'upload' ? '600' : '400',
            color: activeTab === 'upload' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '13px',
            outline: 'none',
          }}
        >
          📤 Upload Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            background: activeTab === 'url' ? 'var(--white)' : 'transparent',
            fontWeight: activeTab === 'url' ? '600' : '400',
            color: activeTab === 'url' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '13px',
            outline: 'none',
          }}
        >
          🔗 Image URL
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Error message */}
        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px',
            marginBottom: '12px'
          }}>
            {error}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div>
            {value ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={value}
                  alt="Uploaded preview"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    border: '1px solid var(--border)'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    wordBreak: 'break-all',
                    marginBottom: '8px'
                  }}>
                    Uploaded to ImageKit
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        background: '#FEF2F2',
                        color: 'var(--accent-red)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '6px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  background: dragActive ? 'var(--primary-light)' : 'var(--gray-50)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                {uploading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid var(--border)',
                      borderTop: '3px solid var(--primary)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Uploading image to ImageKit...</span>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>📸</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Drag and drop your image here, or <span style={{ color: 'var(--primary)', textDecoration: 'underline' }}>browse</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Supports JPEG, PNG, WebP, GIF (Max 10MB)
                    </div>
                  </div>
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/jpeg,image/png,image/webp,image/gif"
              style={{ display: 'none' }}
            />
          </div>
        )}

        {/* URL Tab */}
        {activeTab === 'url' && (
          <div>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {value && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <img
                  src={value}
                  alt="Manual URL preview"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    border: '1px solid var(--border)'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Manual URL Preview
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ImageUpload;
