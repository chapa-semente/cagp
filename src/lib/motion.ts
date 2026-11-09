// src/lib/motion.ts
// Motor Central de Física Tátil & Animações Expressivas (motion/react)
// Diretriz Impeccable: Desaceleração natural confiante, sem oscilações artificiais/bounce excessivo

export const FORCE_EXPRESSIVE_MOTION = true;

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const tactileSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 30,
};

export const bounceSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 32,
};

export const photoZoomSpring = {
  type: "spring" as const,
  stiffness: 360,
  damping: 28,
};

export const drawerSpring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 35,
};

export const photoCardHover = {
  scale: 1.06,
  rotate: -1.5,
  y: -4,
  transition: photoZoomSpring,
};

export const photoCardTap = {
  scale: 0.98,
  rotate: 0,
  y: 0,
  transition: tactileSpring,
};

export const cardHoverVariants = {
  rest: {
    x: 0,
    y: 0,
    boxShadow: "4px 4px 0px var(--border, #16181d)",
    transition: tactileSpring,
  },
  hover: {
    x: -1,
    y: -1,
    boxShadow: "6px 6px 0px var(--border, #16181d)",
    transition: tactileSpring,
  },
  tap: {
    x: 4,
    y: 4,
    boxShadow: "0px 0px 0px var(--border, #16181d)",
    transition: tactileSpring,
  },
};

export const buttonTapVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: -1, y: -1, transition: tactileSpring },
  tap: { x: 4, y: 4, transition: tactileSpring },
};

export const staggerContainer = (staggerDelay = 0.05) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: tactileSpring,
  },
};
