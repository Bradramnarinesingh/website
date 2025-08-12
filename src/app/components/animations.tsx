import { Variants } from 'framer-motion';

// Fade up animation variants
export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Stagger children animation variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Scale animation variants for cards
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" }
  }
};

// Button animation variants
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1, ease: "easeOut" }
  }
};

// Modal animation variants
export const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

// Overlay animation variants
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

// Hero text animation variants
export const heroTextVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// List item animation variants
export const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  in: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  out: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};
