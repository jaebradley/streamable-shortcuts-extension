import elementReady from 'element-ready';
import retryer from 'retryer';

import {
  areObjectsAvailable,
  findNextVolume,
  findPreviousVolume,
  getFullScreenButton,
  isPaused,
  play,
  pause,
  getVolume,
  setVolume,
  getFilename,
  getDownloadURL,
  getDownloadLink,
} from './utilities';

import {
  TOGGLE_FULL_SCREEN_KEY,
  TOGGLE_PLAY_KEY,
  TOGGLE_MUTE_KEY,
  INCREASE_VOLUME_KEY,
  DECREASE_VOLUME_KEY,
  DOWNLOAD_KEY,
  REQUIRED_DOM_ELEMENTS,
} from './constants';

let LAST_POSITIVE_VOLUME = 0.5;

const keyDown = ({ key }) => {
  switch (key) {
    case TOGGLE_FULL_SCREEN_KEY: {
      const fullScreenButton = getFullScreenButton();
      if (fullScreenButton) {
        fullScreenButton.click();
      }
      return;
    }
    case TOGGLE_PLAY_KEY: {
      if (isPaused()) {
        play();
      } else {
        pause();
      }
      return;
    }

    case TOGGLE_MUTE_KEY: {
      const currentVolume = getVolume();
      if (currentVolume > 0) {
        setVolume(0);
        LAST_POSITIVE_VOLUME = currentVolume;
      } else {
        setVolume(LAST_POSITIVE_VOLUME);
      }
      return;
    }

    case INCREASE_VOLUME_KEY: {
      const nextVolume = findNextVolume(getVolume());
      setVolume(nextVolume);
      if (nextVolume > 0) {
        LAST_POSITIVE_VOLUME = nextVolume;
      }
      return;
    }

    case DECREASE_VOLUME_KEY: {
      const nextVolume = findPreviousVolume(getVolume());
      setVolume(nextVolume);
      if (nextVolume > 0) {
        LAST_POSITIVE_VOLUME = nextVolume;
      }
      return;
    }

    case DOWNLOAD_KEY: {
      const link = getDownloadLink();
      if (link) {
        global.fetch(getDownloadURL())
          .then(response => response.blob())
          .then((blob) => {
            const url = global.URL.createObjectURL(blob);
            const a = global.document.createElement('a');
            a.href = url;
            a.download = getFilename();
            a.click();
          });
      }
      return;
    }

    default: {
      console.debug('Streamable shortcuts extension: Unprocessed key ', key);
    }
  }
};

const setShortcuts = () => {
  if (!areObjectsAvailable()) {
    return Promise.reject(new Error('Streamable shortcuts extension: Objects are not available'));
  }

  global.document.addEventListener('keydown', keyDown, false);
  return Promise.resolve('Streamable shortcuts extension: keydown event listener is now set');
};

const checkIfDOMElementsAreAvailable = () => Promise.all(
  REQUIRED_DOM_ELEMENTS
    .map(async (element) => {
      const domElement = await elementReady(element);
      console.debug(`Streamable shortcuts extension: element ${element} is ready: ${domElement}`);
      return domElement;
    }),
);

const shortcuts = async () => {
  await checkIfDOMElementsAreAvailable();

  retryer(setShortcuts, {
    total: 10,
    timeout: 2000,
  });
};

shortcuts();
