/* eslint no-undef: 0 */
chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  chrome.tabs.executeScript(null, { file: 'content.js' });
});
