// src/lib/motion.ts — Física única do site para motion/react (DESIGN.md › Movimento).
// As mesmas três molas existem em CSS (global.css: --ease-spring-snappy, --ease-spring, --ease-spring-bouncy).
// Regra: press afunda na sombra (translate, nunca escala); entradas sobem com a mola; ginga só em celebração.
// Movimento é sempre ativo: o site não encurta animações por prefers-reduced-motion.

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Firme (ζ≈0.88): press, abas, troca de vista. */
export const snappySpring = { type: 'spring' as const, stiffness: 520, damping: 40, mass: 1 };
/** Mola (ζ≈0.72): sheets, drawers, fichas entrando, indicador da aba. */
export const tactileSpring = { type: 'spring' as const, stiffness: 380, damping: 28, mass: 1 };
/** Ginga (ζ≈0.55): carimbo, germinar, conquista. Nunca em navegação ou formulário. */
export const celebrateSpring = { type: 'spring' as const, stiffness: 320, damping: 20, mass: 1 };
/** Nome legado usado em ~15 ilhas para layout e listas: é a mola firme com um fio de sobra, não a ginga. */
export const bounceSpring = { type: 'spring' as const, stiffness: 440, damping: 30, mass: 1 };
/** Sheets e gavetas: mola com um pouco mais de massa para o painel parecer papel grosso. */
export const drawerSpring = { type: 'spring' as const, stiffness: 340, damping: 32, mass: 1.1 };
export const photoZoomSpring = tactileSpring;

/** Foto de integrante: sobe e a sombra cresce (papel colado), sem zoom nem rotação. */
export const photoCardHover = {
  x: -2,
  y: -4,
  boxShadow: '6px 6px 0px var(--color-border, #1F1F1F)',
  transition: tactileSpring,
};

export const photoCardTap = {
  x: 3,
  y: 3,
  boxShadow: '0px 0px 0px var(--color-border, #1F1F1F)',
  transition: snappySpring,
};

/** Ficha clicável: repouso 3px, hover sobe 1px e a sombra vai a 5px, toque afunda na sombra. */
export const cardHoverVariants = {
  rest: {
    x: 0,
    y: 0,
    boxShadow: '3px 3px 0px var(--color-border, #1F1F1F)',
    transition: tactileSpring,
  },
  hover: {
    x: -1,
    y: -1,
    boxShadow: '5px 5px 0px var(--color-border, #1F1F1F)',
    transition: tactileSpring,
  },
  tap: {
    x: 3,
    y: 3,
    boxShadow: '0px 0px 0px var(--color-border, #1F1F1F)',
    transition: snappySpring,
  },
};

export const buttonTapVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: -1, y: -1, transition: snappySpring },
  tap: { x: 3, y: 3, transition: snappySpring },
};

export const staggerContainer = (staggerDelay = 0.045) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: tactileSpring,
  },
};
