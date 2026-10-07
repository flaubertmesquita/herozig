(() => {
  const hero = document.querySelector('[data-pet-hero]');
  const video = hero?.querySelector('[data-pet-video]');
  if (!hero || !video) return;

  let targetTime = 0;
  let seekInFlight = false;
  let ready = false;

  function seekToTarget() {
    if (!ready || seekInFlight || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const maxTime = Math.max(0, video.duration - 0.04);
    const nextTime = Math.max(0, Math.min(maxTime, targetTime));
    if (Math.abs(video.currentTime - nextTime) < 0.025) return;

    seekInFlight = true;
    try {
      video.currentTime = nextTime;
    } catch (error) {
      seekInFlight = false;
      console.error('Não foi possível buscar esse quadro do vídeo.', error);
    }
  }

  function updateFromPointer(event) {
    if (!ready || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const bounds = hero.getBoundingClientRect();
    if (bounds.width <= 0) return;

    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    // O clipe começa olhando para a direita e termina olhando para a esquerda:
    // cursor à direita -> começo do clipe; cursor à esquerda -> final do clipe.
    targetTime = (1 - x) * video.duration;
    seekToTarget();
  }

  function onMetadata() {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    ready = true;
    hero.classList.add('is-ready');
    const bounds = hero.getBoundingClientRect();
    updateFromPointer({ clientX: bounds.left + bounds.width / 2 });
  }

  video.addEventListener('loadedmetadata', onMetadata);
  video.addEventListener('loadeddata', () => hero.classList.add('is-ready'));
  video.addEventListener('seeked', () => {
    seekInFlight = false;
    if (Math.abs(video.currentTime - targetTime) > 0.08) seekToTarget();
  });
  video.addEventListener('error', () => {
    console.error('Não foi possível carregar src/assets/videos/cachorrinho.mp4. Confira o caminho do arquivo.');
  });
  hero.addEventListener('pointermove', updateFromPointer, { passive: true });

  // Caso o navegador já tenha lido os metadados antes da instalação dos listeners.
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onMetadata();
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) hero.classList.add('is-ready');
})();
