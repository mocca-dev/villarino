// Service worker registration, backed by vite-plugin-pwa (Workbox).
//
// `register()` returns a promise that resolves once the worker reaches a state
// worth telling the user about, which is what <OfflineToast /> renders:
//   - UPDATE: a new version is precached and waiting. `update()` activates it
//     and reloads the page.
//   - CACHED: the app is fully precached and now works offline.
//
// The promise stays pending when neither happens (the common case on a repeat
// visit with no new deploy), so no toast is shown.
import { registerSW } from 'virtual:pwa-register';

export function register() {
  return new Promise((resolve) => {
    const updateSW = registerSW({
      onNeedRefresh() {
        resolve({
          type: 'UPDATE',
          text: 'Actualización disponible',
          update: () => updateSW(true),
        });
      },
      onOfflineReady() {
        resolve({
          type: 'CACHED',
          text: 'La aplicación está lista para funcionar sin conexión.',
        });
      },
      onRegisterError(error) {
        console.error('Error during service worker registration:', error);
      },
    });
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
