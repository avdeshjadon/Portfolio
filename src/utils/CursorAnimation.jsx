import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values to track mouse position without triggering React re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the motion values with spring physics
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Check if device is desktop on mount
  useEffect(() => {
    const checkIsDesktop = () => {
      // Use media query to check if the primary pointer is a mouse (fine)
      const hasMouse = window.matchMedia("(pointer: fine)").matches;
      setIsDesktop(hasMouse);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Handle mouse movement (no re-renders)
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, isVisible, cursorX, cursorY]);

  // Handle hover effect via event delegation (works for dynamically added elements)
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      // Define elements that should trigger the cursor growth
      const isHoverable = 
        target.tagName.match(/^(P|H[1-6]|A|BUTTON|LABEL|LI|SPAN)$/i) || 
        target.closest('a, button');
      
      setIsHovering(!!isHoverable);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed bg-white rounded-full pointer-events-none mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 9999,
        top: 0,
        left: 0,
      }}
      animate={{
        width: isHovering ? 80 : 32,
        height: isHovering ? 80 : 32,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}
