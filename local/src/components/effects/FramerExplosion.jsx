import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FramerExplosion = () => {
  const [explosions, setExplosions] = useState([]);

  useEffect(() => {
    const handleDrop = (e) => {
      const { x, y } = e.detail || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const id = Date.now();
      setExplosions((prev) => [...prev, { id, x, y }]);
      
      // Cleanup
      setTimeout(() => {
        setExplosions((prev) => prev.filter((exp) => exp.id !== id));
      }, 2000);
    };

    window.addEventListener('bass-drop', handleDrop);
    return () => window.removeEventListener('bass-drop', handleDrop);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <AnimatePresence>
        {explosions.map((exp) => (
          <React.Fragment key={exp.id}>
            {/* Glass Shockwave Ring 1 */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0, x: exp.x, y: exp.y }}
              animate={{ 
                width: 4000, // Очень большой радиус
                height: 4000, 
                opacity: [0, 1, 0], // Быстрая вспышка
                x: exp.x - 2000,
                y: exp.y - 2000
              }}
              transition={{ duration: 0.8, ease: "circOut" }}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                // Frosted Glass Blast
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
                backdropFilter: 'blur(12px) brightness(1.5)', // Сильный блюр + яркость
                boxShadow: '0 0 100px rgba(255,255,255,0.5)',
                pointerEvents: 'none',
                mixBlendMode: 'overlay', // Накладываем как свет
                zIndex: 9999
              }}
            />
             {/* Secondary Chromatic Ring - "Aberration" */}
             <motion.div
              initial={{ width: 0, height: 0, opacity: 0, x: exp.x, y: exp.y }}
              animate={{ 
                width: 3500, 
                height: 3500, 
                opacity: [0, 0.4, 0],
                x: exp.x - 1750,
                y: exp.y - 1750
              }}
              transition={{ duration: 1.0, delay: 0.05, ease: "easeOut" }}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                border: '4px solid rgba(0, 255, 255, 0.4)', // Cyan edge
                boxShadow: 'inset 0 0 40px rgba(255, 0, 255, 0.3)', // Magenta glow inside
                pointerEvents: 'none',
                mixBlendMode: 'screen',
                filter: 'blur(2px)' // Soften edges
              }}
            />
             {/* Core Flash */}
             <motion.div
              initial={{ scale: 0, opacity: 1, x: exp.x, y: exp.y }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'white',
                filter: 'blur(20px)', // Soft flash
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'screen'
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FramerExplosion;
