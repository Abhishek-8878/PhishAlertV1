// background/background.js

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PHISHING_DETECTED') {
    console.log('[PhishAlert] Phishing form submitted, triggering alert...');

    // Inject alert overlay into the tab
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['alerts/alertOverlay.js'],
    });

    sendResponse({ status: 'alert_triggered' });
  }

  if (message.type === 'USER_RESPONSE') {
    const { response } = message;

    // Send encrypted message based on user choice
    let plaintextMessage = '';
    if (response === 'yes') {
      plaintextMessage = "You're safe. Stay alert!";
    } else {
      plaintextMessage = "Please update your credentials immediately!";
    }

    // Use simple encryption
    chrome.runtime.sendMessage({
      type: 'ENCRYPTED_ALERT',
      payload: btoa(plaintextMessage), // Base64 encryption (simple for demo)
    });

    sendResponse({ status: 'encrypted_message_sent' });
  }
});
