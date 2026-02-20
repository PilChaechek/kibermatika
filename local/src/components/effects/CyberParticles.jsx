import React, { useEffect, useRef } from 'react';

const CyberParticles = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animationFrame = useRef(null);
    const context = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const loop = () => {
            // Clear with slight trail for motion blur effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade out old frames
            ctx.globalCompositeOperation = 'source-over';
            // Actually, for transparent overlay we need full clear to see website behind
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow

            // Update and draw particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.015;
                p.size *= 0.96; // Shrink

                if (p.life <= 0 || p.size < 0.5) {
                    particles.current.splice(i, 1);
                    continue;
                }

                // Draw glowing liquid drop
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, `rgba(200, 255, 255, ${p.life})`); // White core
                gradient.addColorStop(0.4, `rgba(0, 255, 255, ${p.life * 0.5})`); // Cyan mid
                gradient.addColorStop(1, `rgba(0, 0, 255, 0)`); // Fade edge

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrame.current = requestAnimationFrame(loop);
        };
        loop();

        const triggerExplosion = (x, y) => {
            // Create particles
            for (let i = 0; i < 100; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 20 + 5; // Fast burst
                
                particles.current.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * 20 + 5,
                    color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff', // Cyan/Magenta
                    life: 1.0 + Math.random() * 0.5
                });
            }
        };

        const handleDrop = (e) => {
            const { x, y } = e.detail || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            triggerExplosion(x, y);
        };

        window.addEventListener('bass-drop', handleDrop);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('bass-drop', handleDrop);
            cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    const triggerExplosion = (x, y) => {
        // Create 100 particles
        for (let i = 0; i < 150; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 15 + 2; // Fast burst
            
            particles.current.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 15 + 5,
                color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff', // Cyan/Magenta
                life: 1.0 + Math.random() * 0.5
            });
        }
    };

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CyberParticles;
