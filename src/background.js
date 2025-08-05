chrome.webRequest.onCompleted.addListener(details => {
  if (details.type === 'main_frame' && details.url.endsWith('.json') && !details.url.startsWith(chrome.runtime.getURL(''))) {
    chrome.tabs.create({
      url: chrome.runtime.getURL('src/view/index.html?url=' + encodeURIComponent(details.url))
    });
  }
}, { urls: ['<all_urls>'] });
