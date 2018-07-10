import {
  checkIfDOMElementsAreAvailable,
} from './utilities';
import {
  PLAYER_ID,
} from './constants';

const setup = async () => {
  try {
    console.debug('Streamable shortcuts extension: checking if all necessary DOM elements are available...');
    await checkIfDOMElementsAreAvailable();
    console.debug('Streamable shortcuts extension: All necessary DOM elements are available!');

    // inject shortcuts JavaScript
    const shortcutsScript = document.createElement('script');
    shortcutsScript.type = 'text/javascript';
    shortcutsScript.src = global.chrome.extension.getURL('shortcuts.js');
    (document.head || document.documentElement).appendChild(shortcutsScript);

    // Inject help HTML
    const response = await global.fetch(global.chrome.extension.getURL('help.html'));
    await response.text()
      .then(help => document.querySelector(PLAYER_ID).insertAdjacentHTML('afterend', help));
    return null;
  } catch (e) {
    console.error('Streamable shortcuts extension error: ', e);
    return null;
  }
};

setup();
