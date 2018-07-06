import elementReady from 'element-ready';


const keyDown = (e) => {
  if (e.keyCode === 70) {
    const fullScreenButton = document.querySelector('#player-fullscreen-button');
    if (fullScreenButton) {
      fullScreenButton.click();
    }
  }
};

const set = async () => {
  await elementReady('body');

  document.addEventListener('keydown', keyDown, false);


  // const speedOptions = document.querySelectorAll('.speed-button.context-menu-selection-item-button');

  // const copyUrl = '#copyurl';
  // const download = '#download';

  // window.playerObject.play() // pause
  // window.playerObject.setVolume('0', true)
};

export default set;
