"use client";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUpVariants } from './animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function AnimatedSection({ children, className, id, style }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
    >
      {children}
    </motion.section>
  );
}
