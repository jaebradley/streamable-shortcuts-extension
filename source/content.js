import {
  checkIfDOMElementsAreAvailable,
  areObjectsAvailable,
} from './utilities';
import {
  STICKY_FOOTER_CLASS_NAME,
} from './constants';

const setup = async () => {
  await checkIfDOMElementsAreAvailable();
  if (areObjectsAvailable()) {
    // inject shortcuts JavaScript
    const shortcutsScript = document.createElement('script');
    shortcutsScript.type = 'text/javascript';
    shortcutsScript.src = global.chrome.extension.getURL('shortcuts.js');
    (document.head || document.documentElement).appendChild(shortcutsScript);

    // Inject help HTML
    try {
      const response = await fetch(global.chrome.extension.getURL('help.html'));
      const html = response.text();
      html.then((help) => {
        document.querySelector(STICKY_FOOTER_CLASS_NAME).insertAdjacentHTML('beforebegin', help);
      });
    } catch (e) {
      console.error(e);
    }
  };
};

setup();
