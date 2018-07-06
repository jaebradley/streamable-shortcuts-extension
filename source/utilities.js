import { check as isReserved } from 'github-reserved-names';

// From refined-github: https://github.com/sindresorhus/refined-github/blob/master/source/libs/page-detect.js

const getCleanPathname = () => window.location.pathname.replace(/^[/]|[/]$/g, '');

const getOwnerAndRepo = () => {
  const [, ownerName, repoName] = window.location.pathname.split('/');
  return { ownerName, repoName };
};

const isDashboard = () => /^$|^(orgs[/][^/]+[/])?dashboard([/]|$)/.test(getCleanPathname());

const isNotifications = () => /^([^/]+[/][^/]+\/)?notifications/.test(getCleanPathname());

const isGist = () => window.location.hostname.startsWith('gist.') || window.location.pathname.startsWith('gist/');

const isRepo = () => /^[^/]+\/[^/]+/.test(getCleanPathname())
  && !isReserved(getOwnerAndRepo().ownerName)
  && !isNotifications()
  && !isDashboard()
  && !isGist();

const getRepoPath = () => {
  if (!isRepo()) {
    return false;
  }
  const match = /^[^/]+[/][^/]+[/]?(.*)$/.exec(getCleanPathname());
  return match && match[1];
};

const is404 = () => document.title === 'Page not found · GitHub';

const is500 = () => document.title === 'Server Error · GitHub';

const isLoggedOut = () => document.body.classList.contains('logged-out');

const isPRPage = () => /^pull\/\d+/.test(getRepoPath());

const shouldSetShortcuts = () => !is404() && !is500() && !isLoggedOut() && isPRPage();

const isPRPageURL = url => /pull\/\d+/.test(url);

const isPRCommitPageURL = url => /pull\/\d+\/commits/.test(url);

const isPRFilesPageURL = url => /pull\/\d+\/files/.test(url);

const identifyShortcut = (url) => {
  if (isPRFilesPageURL(url)) {
    return 'r f';
  } if (isPRCommitPageURL(url)) {
    return 'r c';
  } if (isPRPageURL(url)) {
    return 'r d';
  }

  return null;
};

const setShortcut = (tab) => {
  const shortcut = identifyShortcut(tab.href);
  if (shortcut) {
    tab.setAttribute('data-hotkey', shortcut);
  }
};

export {
  shouldSetShortcuts,
  setShortcut,
};
