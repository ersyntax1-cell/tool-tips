/// <reference types="chrome" />

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
    console.log("Content script injected successfully");
  } catch (error) {
    console.error("Failed to inject content script:", error);
  }
});

console.log('Extension run.');
