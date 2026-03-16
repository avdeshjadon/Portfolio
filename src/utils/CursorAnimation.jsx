import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [cursorSize, setCursorSize] = useState(32); // Default size
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible((prev) => {
        if (!prev) return true;
        return prev;
      });
    };

    const handleMouseOverText = () => {
      setCursorSize(80); // Increase cursor size when hovering over text
    };

    const handleMouseLeaveText = () => {
      setCursorSize(32); // Reset cursor size when leaving text
    };

    // Select all text elements
    const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    textElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseOverText);
      el.addEventListener("mouseleave", handleMouseLeaveText);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOverText);
        el.removeEventListener("mouseleave", handleMouseLeaveText);
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed bg-white rounded-full pointer-events-none mix-blend-difference"
      style={{ 
        width: cursorSize, 
        height: cursorSize, 
        zIndex: 9999,
        opacity: isVisible ? 1 : 0 
      }}
      animate={{ x: cursorPosition.x - cursorSize / 2, y: cursorPosition.y - cursorSize / 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
  );
}
