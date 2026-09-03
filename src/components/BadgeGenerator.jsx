import React, { useState, useRef, useEffect } from 'react';
import './BadgeGenerator.css';

const BadgeGenerator = ({ eventName, subtitle = 'Session One', dateString = 'Dec 17-18 • SJCEM Palghar' }) => {
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const canvasRef = useRef(null);

    // Initial draw to show empty badge or instructions
    useEffect(() => {
        drawBadge();
    }, [subtitle, dateString]);

    const drawBadge = (userName = '') => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // High resolution for crisp text (2160x2160 internally, scaled down by CSS)
        // Standard Instagram Square is 1080, but let's go double for quality
        const size = 1080;
        canvas.width = size;
        canvas.height = size;

        // --- 1. Background ---
        // Premium Mesh Gradient
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(1, '#F0F4F8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Soft Orbs
        const drawOrb = (x, y, r, color) => {
            const orbGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
            orbGrad.addColorStop(0, color);
            orbGrad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        };

        drawOrb(900, 100, 400, 'rgba(66, 133, 244, 0.08)'); // Blue top-right
        drawOrb(100, 900, 500, 'rgba(234, 67, 53, 0.06)');  // Red bottom-left

        // --- 2. Google Colors Top Bar (Sleek) ---
        const barHeight = 16;
        const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];
        const segWidth = size / 4;
        colors.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.fillRect(i * segWidth, 0, segWidth, barHeight);
        });

        // --- 3. Central Card Container ---
        // Matte Glass Effect
        const cardW = 860;
        const cardH = 860;
        const cardX = (size - cardW) / 2;
        const cardY = (size - cardH) / 2 + 20;
        const cardR = 48;

        // Card Drop Shadow (Deep & Soft)
        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 60;
        ctx.shadowOffsetY = 30;
        ctx.fillStyle = '#FFFFFF';
        roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
        ctx.fill();
        ctx.shadowColor = 'transparent'; // Reset

        // Card Content Container Clip
        ctx.save();
        roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
        ctx.clip();

        // 4. Content - Logo & Title
        const logo = new Image();
        logo.src = '/gdg-sjc-logo.png'; // Updated wide logo

        const drawText = () => {
            const centerX = size / 2;

            // Logo - Wide format adjustments
            // Calculate height based on aspect ratio, max width constrained
            const maxLogoWidth = 580;
            const logoAspectRatio = logo.naturalWidth / logo.naturalHeight;
            let logoWidth = maxLogoWidth;
            let logoHeight = logoWidth / logoAspectRatio;

            // If logo is too tall (unlikely for wide logo but safe check)
            if (logoHeight > 200) {
                logoHeight = 200;
                logoWidth = logoHeight * logoAspectRatio;
            }

            ctx.drawImage(logo, centerX - logoWidth / 2, cardY + 60, logoWidth, logoHeight);

            // "I AM ATTENDING" Pill - Pushed down further
            const pillY = cardY + logoHeight + 110;
            const pillW = 400;
            const pillH = 70;
            const pillX = centerX - pillW / 2;

            ctx.fillStyle = '#E8F0FE'; // Light Blue
            roundRect(ctx, pillX, pillY, pillW, pillH, 35);
            ctx.fill();

            ctx.fillStyle = '#1967D2';
            ctx.font = '700 28px "Google Sans", "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('I AM ATTENDING', centerX, pillY + pillH / 2 + 2);

            // Main Title - Pushed down
            // Calculate Y based on pill position
            const titleStartY = pillY + pillH + 110;

            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#202124';
            ctx.font = '800 84px "Google Sans", "Inter", sans-serif';
            ctx.fillText('TechSprint', centerX, titleStartY);

            ctx.font = '700 72px "Google Sans", "Inter", sans-serif';
            ctx.fillText('Hackathon 2025', centerX, titleStartY + 90);

            // Subtitle
            ctx.fillStyle = '#EA4335';
            ctx.font = '600 40px "Google Sans", "Inter", sans-serif';
            ctx.fillText(subtitle, centerX, titleStartY + 160);

            // User Name Highlight - Pushed to bottom relative to title
            const nameY = titleStartY + 270;

            if (userName) {
                // Determine font size based on length
                let userFont = 76;
                if (userName.length > 15) userFont = 60;
                if (userName.length > 20) userFont = 48;

                ctx.fillStyle = '#202124';
                ctx.font = `800 ${userFont}px "Google Sans", "Inter", sans-serif`;
                ctx.fillText(userName, centerX, nameY);

                // Role line
                ctx.fillStyle = '#5f6368';
                // Add simple line above name
                ctx.fillRect(centerX - 40, nameY - 70, 80, 4);
            } else {
                ctx.fillStyle = '#DADCE0';
                ctx.font = 'italic 500 60px "Google Sans", "Inter", sans-serif';
                ctx.fillText('Your Name Here', centerX, nameY);
            }

            // Bottom Brand Strip (Inside Card)
            ctx.fillStyle = '#4285F4';
            ctx.fillRect(cardX, cardY + cardH - 100, cardW, 100);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '600 32px "Google Sans", "Inter", sans-serif';
            ctx.fillText(dateString, centerX, cardY + cardH - 40);
        };

        if (logo.complete) {
            drawText();
        } else {
            logo.onload = drawText;
        }

        ctx.restore(); // Undo clip
    };

    // Helper for rounded rectangle
    const roundRect = (ctx, x, y, w, h, r) => {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    };

    const handleGenerate = () => {
        if (!name.trim()) return;
        drawBadge(name);
        setIsGenerated(true);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'TechSprint_Badge_' + name.replace(/\s+/g, '_') + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handleShare = (platform) => {
        const text = "I'm attending TechSprint Hackathon 2025! 🚀\n\nJoin me at the Kick-Off Session by GDG on Campus SJCEM.\n\n#TechSprint2025 #GDGonCampus #SJCEM #GoogleDevs";
        const url = 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-techsprint-hackathon-2025-kick-off-session-gdg-on-campus-sjcem/';

        let shareUrl = '';
        if (platform === 'twitter') {
            shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
        } else if (platform === 'linkedin') {
            shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    return (
        <div className="badge-generator-section" id="get-badge">
            <div className="badge-generator-container">
                <div className="badge-header">
                    <h2 className="badge-title">Get Your Virtual Badge 🎫</h2>
                    <p className="badge-subtitle">Generate your official event badge and share it with the world!</p>
                </div>

                <div className="badge-input-group">
                    <input
                        type="text"
                        className="badge-input"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (isGenerated) setIsGenerated(false); // Reset state to encourage re-generate
                        }}
                        maxLength={20}
                    />
                    <button className="btn-generate" onClick={handleGenerate}>
                        Generate ✨
                    </button>
                </div>

                <div className="badge-preview-container">
                    <canvas ref={canvasRef} className="badge-canvas" style={{ width: '100%', maxWidth: '600px' }}></canvas>

                    {isGenerated && (
                        <div className="badge-actions-container">
                            <div className="badge-actions">
                                <button className="btn-download" onClick={handleDownload}>
                                    Download Image 📥
                                </button>
                            </div>

                            <div className="share-text">Share your badge!</div>

                            <div className="social-share-buttons">
                                <button className="btn-share btn-twitter" onClick={() => handleShare('twitter')}>
                                    <i className="fab fa-twitter"></i> Share on X
                                </button>
                                <button className="btn-share btn-linkedin" onClick={() => handleShare('linkedin')}>
                                    <i className="fab fa-linkedin"></i> Share on LinkedIn
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BadgeGenerator;
