const cache = new Map();

self.addEventListener("message", async (e) => {
  const { page } = e.data;
  if (cache.has(page)) {
    postMessage({ page, data: cache.get(page) });
    return;
  }

  try {
    const res = await fetch(`https://yapter.bluestardotos.workers.dev/posts/${page}`);
    const data = await res.json();
    cache.set(page, data);
    postMessage({ page, data });
  } catch (err) {
    postMessage({ page, error: err.message });
  }
});
