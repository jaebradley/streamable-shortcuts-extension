const ASCENDING_VOLUMES = [
  0,
  0.2,
  0.4,
  0.6,
  0.8,
  1.0,
];
const DESCENDING_VOLUMES = ASCENDING_VOLUMES.slice().reverse();

const TOGGLE_FULL_SCREEN_KEY = 'f';
const TOGGLE_MUTE_KEY = 'm';
const TOGGLE_PLAY_KEY = 'p';
const INCREASE_VOLUME_KEY = 'V';
const DECREASE_VOLUME_KEY = 'v';
const DOWNLOAD_KEY = 'd';

const FULL_SCREEN_BUTTON_ID = '#player-fullscreen-button';
const BODY = 'body';
const DOWNLOAD_LINK_ID = '#download';
const PLAYER_ID = '#player-content';
const REQUIRED_DOM_ELEMENTS = [
  BODY,
  FULL_SCREEN_BUTTON_ID,
  DOWNLOAD_LINK_ID,
  PLAYER_ID,
];

export {
  ASCENDING_VOLUMES,
  DESCENDING_VOLUMES,
  TOGGLE_FULL_SCREEN_KEY,
  TOGGLE_MUTE_KEY,
  TOGGLE_PLAY_KEY,
  INCREASE_VOLUME_KEY,
  DECREASE_VOLUME_KEY,
  DOWNLOAD_KEY,
  FULL_SCREEN_BUTTON_ID,
  BODY,
  DOWNLOAD_LINK_ID,
  PLAYER_ID,
  REQUIRED_DOM_ELEMENTS,
};
