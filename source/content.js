// inject shortcuts JavaScript
const shortcutsScript = document.createElement('script');
shortcutsScript.type = 'text/javascript';
shortcutsScript.src = global.chrome.extension.getURL('shortcuts.js');
(document.head || document.documentElement).appendChild(shortcutsScript);

// Inject help HTML
fetch(global.chrome.extension.getURL('help.html'))
  .then(response => response.text())
  .then((data) => {
    document.body.innerHTML += data;
  }).catch((err) => {
    console.error(err);
  });
