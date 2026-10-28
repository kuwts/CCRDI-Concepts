// Scroll-reveal stagger → Tailwind transition-delay utilities.
// Class names are written out in full so Tailwind can detect them at build
// time (it can't see classes built from runtime template literals). Index by
// item position; index 0 yields '' (no delay).
export const animDelay = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-[400ms]', 'delay-500'];
