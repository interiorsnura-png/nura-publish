(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/png';
  icon.sizes = '192x192';
  let timer;
  let lit = false;
  const reset = () => {
    clearInterval(timer);
    timer = undefined;
    lit = false;
    icon.href = '/favicon.png';
  };
  const update = () => {
    reset();
    if (reduced.matches || document.hidden) return;
    if (!icon.isConnected) document.head.appendChild(icon);
    timer = setInterval(() => {
      lit = !lit;
      icon.href = lit ? '/favicon-glow.png' : '/favicon.png';
    }, 1800);
  };
  const glow = new Image();
  glow.onload = update;
  glow.src = '/favicon-glow.png';
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
  window.addEventListener('pagehide', reset);
})();
