import elementReady from 'element-ready';
import retryer from 'retryer';

const setShortcuts = () => {
  if (areObjectsAvailable()) {
    return Promise.reject('Objects are not available');
  }

  document.addEventListener('keydown', keyDown, false);
  return Promise.resolve(true);
}

const areObjectsAvailable = () => {
  console.debug('global: ', global);
  console.debug('video: ', global.videoObject);
  console.debug('player: ', global.playerObject);
  return global
    && global.videoObject
    && global.playerObject
    && global.playerObject.player;
}

const volumes = [
  0,
  0.2,
  0.4,
  0.6,
  0.8,
  1.0,
];
const reversedVolumes = volumes.slice().reverse();

const findNextVolume = current => volumes.find(volume => volume > current) || 1.0;
const findPreviousVolume = current => reversedVolumes.find(volume => volume < current) || 0.0;
const getFilename = () => `${global.videoObject.reddit_title
|| global.videoObject.file_id
|| global.videoObject.shortcode
|| 'streamable'}.mp4`;

let lastNonZeroVolume = 0.5;

const getVolume = () => parseFloat(global.playerObject.player.volume);
const setVolume = value => global.playerObject.setVolume(value, true);

const keyDown = (e) => {
  if (e.key === 'f') {
    const fullScreenButton = document.querySelector('#player-fullscreen-button');
    if (fullScreenButton) {
      fullScreenButton.click();
    }
  } else if (e.key === ' ') {
    if (global.playerObject.player.paused) {
      global.playerObject.play();
    } else {
      global.playerObject.pause();
    }
  } else if (e.key === 'm') {
    const currentVolume = getVolume();
    if (currentVolume > 0) {
      setVolume(0);
      lastNonZeroVolume = currentVolume;
    } else {
      setVolume(lastNonZeroVolume);
    }
  } else if (e.key === 'V') {
    const nextVolume = findNextVolume(getVolume());
    setVolume(findNextVolume(getVolume()));
    if (nextVolume > 0) {
      lastNonZeroVolume = nextVolume;
    }
  } else if (e.key === 'v') {
    const nextVolume = findPreviousVolume(getVolume());
    setVolume(nextVolume);
    if (nextVolume > 0) {
      lastNonZeroVolume = nextVolume;
    }
  } else if (e.key === 'd') {
    const downloadButton = document.querySelector('#download');
    if (downloadButton) {
      // Bypass CORS
      // https://github.com/Rob--W/cors-anywhere/#documentation
      const downloadURL = `https://cors-anywhere.herokuapp.com/${downloadButton.getAttribute('href')}`;
      window.fetch(downloadURL)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = getFilename();
            a.click();
        });
    }
  }
};

const set = async () => {
  await elementReady('body');
  retryer(setShortcuts, {
    total: 10,
    timeout: 1000,
  });
};

set();
