
chrome.webNavigation.onCommitted.addListener((details) => {
  console.log('Page chargée :', details.url);
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ['content.js']
  });
}, { url: [{ schemes: ['http', 'https'] }] });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.closeThis) chrome.tabs.remove(sender.tab.id);
  });