/* Demo progressive enhancement for desktop background only, not a replacement for existing site scripts. */
(() => {
  const root = document.querySelector('[data-lareen-cinema]');
  if (!root) return;
  const video = root.querySelector('.lareen-cinema__video');
  if (!video) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 700px)');
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(conn && conn.saveData);
  if (reduce.matches || narrow.matches || saveData) return;
  let visible = false;
  const start = async () => {
    if (!visible || document.hidden) return;
    if (!video.src) {
      const src = video.dataset.src;
      if (!src) return; // Poster remains.
      video.src = src;
      video.load();
    }
    try { await video.play(); video.classList.add('is-ready'); }
    catch (e) { video.classList.remove('is-ready'); } // Browser blocks autoplay: poster works.
  };
  const stop = () => { video.pause(); video.classList.remove('is-ready'); };
  video.addEventListener('error', stop);
  video.addEventListener('ended', stop);
  const observer = new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? false;
    if (visible) start(); else stop();
  }, { threshold: 0.25 });
  observer.observe(root);
  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
  reduce.addEventListener?.('change', () => { reduce.matches ? stop() : start(); });
})();
