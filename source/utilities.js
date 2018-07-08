import elementReady from 'element-ready';

import {
  ASCENDING_VOLUMES,
  DESCENDING_VOLUMES,
  FULL_SCREEN_BUTTON_ID,
  DOWNLOAD_LINK_ID,
  REQUIRED_DOM_ELEMENTS,
} from './constants';

const areObjectsAvailable = () => {
  console.debug('Streamable shortcuts extension: global object is ', global);
  return global
    && global.document
    && global.URL
    && global.videoObject
    && global.playerObject
    && global.playerObject.player;
};

const findNextVolume = current => ASCENDING_VOLUMES.find(volume => volume > current) || 1.0;
const findPreviousVolume = current => DESCENDING_VOLUMES.find(volume => volume < current) || 0.0;

const getFullScreenButton = () => global.document.querySelector(FULL_SCREEN_BUTTON_ID);
const isPaused = () => global.playerObject.player.paused;
const play = () => global.playerObject.play();
const pause = () => global.playerObject.pause();
const getVolume = () => parseFloat(global.playerObject.player.volume);
const setVolume = value => global.playerObject.setVolume(value, true);

const getFilename = () => `${global.videoObject.reddit_title
  || global.videoObject.file_id
  || global.videoObject.shortcode
  || 'streamable'}.mp4`;

// Bypass CORS
// https://github.com/Rob--W/cors-anywhere/#documentation
const getDownloadLink = () => global.document.querySelector(DOWNLOAD_LINK_ID);
const getDownloadURL = () => `https://cors-anywhere.herokuapp.com/${getDownloadLink().getAttribute('href')}`;

const checkIfDOMElementsAreAvailable = () => Promise.all(
  REQUIRED_DOM_ELEMENTS
    .map(async element => elementReady(element)),
);

export {
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
  checkIfDOMElementsAreAvailable,
};
