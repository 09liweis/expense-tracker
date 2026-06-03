import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "100%" | "fit-content";
}

export default function ScrollReveal({ children, width = "100%" }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} style={{ width }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}