let windowId = 0;
const CONTEXT_MENU_ID = 'food_data_context_menu';

function closeIfExist() {
  if (windowId > 0) {
    chrome.windows.remove(windowId);
    windowId = chrome.windows.WINDOW_ID_NONE;
  }
}

function popWindow(type) {
  closeIfExist();
  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 800,
    height: 475,
  };
  if (type === 'open') {
    options.url = 'window.html';
    chrome.windows.create(options, (win) => {
      windowId = win.id;
    });
  }
}

function tell(message, data) {
  var data = data || {};
  chrome.tabs.getSelected(null, (tab) => {
    if (!tab) return;
    chrome.tabs.sendMessage(tab.id, {
      message,
      data
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'Save a Recipe',
    contexts: ['all'],
    documentUrlPatterns: [
      'http://*/*',
      'https://*/*'
    ]
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === CONTEXT_MENU_ID) {
    tell('contextMenu', event);
  }
});
