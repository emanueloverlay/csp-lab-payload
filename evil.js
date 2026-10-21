// evil.js — DEMO EDUCATIVA de CSP (laboratorio). Código BENIGNO.
// Representa un "payload de atacante" entregado por un CDN público (jsDelivr /gh)
// para demostrar por qué permitir un CDN entero en la CSP es un riesgo.
//
// Seguridad / cumplimiento:
//  - Solo actúa en localhost / 127.0.0.1 (el laboratorio). En cualquier otro sitio no hace nada.
//  - No envía datos a terceros: el "beacon" es RELATIVO (mismo origen).
//  - La redirección es RELATIVA a fake-login.html (una página de laboratorio).
//  - No descarga ni ejecuta más código, no persiste nada, no accede al sistema.

(function () {
  var host = location.hostname;
  if (host !== 'localhost' && host !== '127.0.0.1') {
    console.warn('[evil.js] Demo de laboratorio CSP: inactivo fuera de localhost.');
    return;
  }

  console.warn('[evil.js] Payload de atacante ejecutándose (simulado, benigno).');

  var banner = document.createElement('div');
  banner.textContent = '⚠ Payload de atacante ejecutado — redirigiendo a un login falso (simulación)…';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#b00020;' +
    'color:#fff;font:bold 15px system-ui,Arial,sans-serif;padding:12px;text-align:center';
  document.body.appendChild(banner);

  // "Exfiltración" simulada al MISMO origen (no sale a terceros).
  try {
    new Image().src = 'fake-login.html?beacon=' +
      encodeURIComponent('cookies=' + (document.cookie || '(ninguna)'));
  } catch (e) {}

  setTimeout(function () {
    location.href = 'fake-login.html?from=' + encodeURIComponent(location.pathname);
  }, 2500);
})();
