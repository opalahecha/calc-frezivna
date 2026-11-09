export const scrollToPath = () => {
  const target = document.getElementById('my-path');

  if (!target) {
    return;
  }

  if (window.parent !== window) {
    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : 'https://frezivna.com';
    const offset = Math.max(
      0,
      Math.ceil(target.getBoundingClientRect().top + window.scrollY),
    );

    window.parent.postMessage(
      { type: 'frezivna:scroll-to-summary', offset },
      parentOrigin,
    );
    return;
  }

  target.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
  });
};
