var s = document.createElement('script');
s.type = 'text/javascript';
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('shortcuts.js');
(document.head || document.documentElement).appendChild(s);
