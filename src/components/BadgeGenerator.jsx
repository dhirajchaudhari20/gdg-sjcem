import React, { useState, useRef, useEffect } from 'react';
import './BadgeGenerator.css';

const BadgeGenerator = ({ eventName }) => {
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const canvasRef = useRef(null);

    // Initial draw to show empty badge or instructions
    useEffect(() => {
        drawBadge();
    }, []);

    const drawBadge = (userName = '') => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Square 1080x1080 for Instagram/LinkedIn
        canvas.width = 1080;
        canvas.height = 1080;

        // 1. Sophisticated Background
        // Soft gradient base
        const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#f8f9fa'); // Even lighter grey
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1080);

        // Geometric Pattern Overlay (Dot Grid) - Fainter
        ctx.fillStyle = '#eaecf0';
        for (let i = 0; i < 1080; i += 40) {
            for (let j = 0; j < 1080; j += 40) {
                if ((i + j) % 80 === 0) {
                    ctx.beginPath();
                    ctx.arc(i, j, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // 2. Google Color Borders / Accents (Top Bar)
        const barHeight = 24;
        ctx.fillStyle = '#4285F4'; // Blue
        ctx.fillRect(0, 0, 270, barHeight);
        ctx.fillStyle = '#EA4335'; // Red
        ctx.fillRect(270, 0, 270, barHeight);
        ctx.fillStyle = '#FBBC04'; // Yellow
        ctx.fillRect(540, 0, 270, barHeight);
        ctx.fillStyle = '#34A853'; // Green
        ctx.fillRect(810, 0, 270, barHeight);

        // 3. Central Card / container
        // White card with deep shadow for "Canva" feel
        ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
        ctx.shadowBlur = 50;
        ctx.shadowOffsetY = 20;
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, 140, 160, 800, 760, 40);
        ctx.fill();

        ctx.shadowColor = 'transparent'; // Reset shadow

        // 4. Load & Draw Logo
        const logo = new Image();
        logo.src = '/gdg-logo-new.png';

        const drawContent = () => {
            // Logo Centered
            const logoWidth = 300;
            const logoHeight = (logo.naturalHeight / logo.naturalWidth) * logoWidth;
            ctx.drawImage(logo, (1080 - logoWidth) / 2, 220, logoWidth, logoHeight);

            // "I AM ATTENDING" Pill - Cleaner Font
            const pillY = 380;
            ctx.fillStyle = '#e8f0fe';
            roundRect(ctx, 365, pillY, 350, 60, 30);
            ctx.fill();

            ctx.fillStyle = '#1967d2';
            // Use system font stack fallback for broad support, but prioritize modern sans
            ctx.font = '700 28px "Google Sans", "Inter", "Roboto", "Segoe UI", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('I AM ATTENDING', 540, pillY + 40);

            // Event Title - Proper Spacing
            ctx.fillStyle = '#202124';
            ctx.font = '800 72px "Google Sans", "Inter", "Roboto", sans-serif'; // Bolder
            ctx.fillText('TechSprint', 540, 540);
            ctx.font = '700 64px "Google Sans", "Inter", "Roboto", sans-serif';
            ctx.fillText('Hackathon 2025', 540, 630);

            // Subtitle / Session - Proper Red
            ctx.fillStyle = '#d93025'; // Google Red
            ctx.font = '600 36px "Google Sans", "Inter", "Roboto", sans-serif';
            ctx.fillText('Session One', 540, 690);

            // Divider Line - Subtle
            ctx.strokeStyle = '#f1f3f4';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(340, 730);
            ctx.lineTo(740, 730);
            ctx.stroke();

            // User Name
            if (userName) {
                // Name scaling logic to fit container
                ctx.font = '700 70px "Google Sans", "Inter", "Roboto", sans-serif';
                let textWidth = ctx.measureText(userName).width;
                if (textWidth > 700) ctx.font = '700 50px "Google Sans", "Inter", "Roboto", sans-serif';

                ctx.fillStyle = '#202124';
                ctx.fillText(userName, 540, 810);

                ctx.fillStyle = '#5f6368';
                ctx.font = '500 28px "Google Sans", "Inter", "Roboto", sans-serif';
                ctx.letterSpacing = '1px'; // Slight letter spacing for "Proper" look
                ctx.fillText('CONTRIBUTOR / ATTENDEE', 540, 860);
            } else {
                ctx.fillStyle = '#dadce0';
                ctx.font = 'italic 50px "Google Sans", "Inter", "Roboto", sans-serif';
                ctx.fillText('Your Name Here', 540, 810);
            }

            // Footer (Date & Badge)
            // Blue bottom bar on the card
            // clip bottom area of card to fill
            ctx.save();
            roundRect(ctx, 140, 160, 800, 760, 40);
            ctx.clip();
            ctx.fillStyle = '#4285F4';
            ctx.fillRect(140, 840, 800, 80); // bottom strip

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 30px "Google Sans", "Inter", "Roboto", sans-serif';
            ctx.fillText('Dec 17-18 • SJCEM Palghar', 540, 890);
            ctx.restore();
        };

        if (logo.complete) {
            drawContent();
        } else {
            logo.onload = drawContent;
        }
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
        link.download = `TechSprint_Badge_${name.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
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
                        <div className="badge-actions" data-aos="fade-up">
                            <button className="btn-download" onClick={handleDownload}>
                                Download Image 📥
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BadgeGenerator;
