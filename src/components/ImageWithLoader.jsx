import React, { useState } from 'react';
import './ImageWithLoader.css';

const ImageWithLoader = ({ src, alt, className, style, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`image-loader-container ${className || ''}`} style={style}>
            {!isLoaded && !hasError && (
                <div className="image-skeleton-loader"></div>
            )}

            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    className={`smooth-image ${isLoaded ? 'loaded' : 'loading'}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    loading="lazy"
                    decoding="async"
                    {...props}
                />
            ) : (
                <div className="image-error-fallback" style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e8f0fe',
                    color: '#1a73e8',
                    fontWeight: 'bold'
                }}>
                    {alt ? alt.split(' ').map(n => n[0]).join('').substring(0, 2) : '?'}
                </div>
            )}
        </div>
    );
};

export default ImageWithLoader;
