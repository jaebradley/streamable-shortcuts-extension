const shortcutsScript = document.createElement('script');
shortcutsScript.type = 'text/javascript';
shortcutsScript.src = global.chrome.extension.getURL('shortcuts.js');
(document.head || document.documentElement).appendChild(shortcutsScript);
