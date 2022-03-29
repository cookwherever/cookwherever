import {injectIntoPage} from "../inject";


function isInjected(tabId) {
  return chrome.scripting.executeScript({
    target: {tabId},
    func: () => {
      var injected = window.reactExampleInjected;
      window.reactExampleInjected = true;
      injected;
    }
  });
}

function loadScript(name, tabId) {
  if (process.env.NODE_ENV === 'production') {
    chrome.scripting.executeScript( {
      target: { tabId },
      func: `/js/${name}.js`,
      args: []
    });
  } else {
    void chrome.scripting.executeScript({
      target: { tabId },
      func: injectIntoPage,
      args: []
    });

    // // dev: async fetch bundle
    // fetch(`http://localhost:3000/js/${name}.js`)
    // .then(res => res.text())
    // .then((fetchRes) => {
    //   // Load redux-devtools-extension inject bundle,
    //   // because inject script and page is in a different context
    //   const request = new XMLHttpRequest();
    //   request.open('GET', 'chrome-extension://chgcjdgpbpaommnaafollkkjblkggngi/js/redux-devtools-extension.js');  // sync
    //   request.send();
    //   request.onload = async () => {
    //     if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
    //       await chrome.scripting.executeScript({
    //         target: { tabId,  allFrames: true },
    //         func: () => { eval(request.responseText) },
    //       });
    //     }
    //   };
    //   console.log(fetchRes);
    //   void chrome.scripting.executeScript({
    //     target: { tabId },
    //     func: () => { eval(fetchRes) }
    //   });
    // }).catch((e) => {
    //   console.error(e);
    // });
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(`tab status: ${changeInfo.status}`);
  if (changeInfo.status !== 'loading') return;

  const result = await isInjected(tabId);
  if (chrome.runtime.lastError || result[0]) return;

  loadScript('inject', tabId);
});
