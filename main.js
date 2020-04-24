if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_caches.js")
      .then(() => console.log("ServiceWorker registered"));
  });
}
