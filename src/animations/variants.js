// Apple-style motion: slow, restrained, expensive. Fade / reveal / subtle scale only.

// easeOutExpo-ish — the smooth, decisive Apple curve.
export const easeApple = [0.16, 1, 0.3, 1];

export const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeApple },
  },
};

export const fadeUp = reveal; // alias kept for existing imports

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: easeApple } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: easeApple } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: easeApple } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: easeApple } },
};

// Parent that staggers children's reveal.
export const staggerContainer = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const viewportOnce = { once: true, amount: 0.3 };
