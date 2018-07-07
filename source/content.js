import elementReady from 'element-ready';

const setup = async () => {
  await elementReady('body');

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
      document.querySelector('.stickyfooter')
        .insertAdjacentHTML('beforebegin', help);
    });
  } catch (e) {
    console.error(e);
  }
};

setup();
