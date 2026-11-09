document.getElementById('test-notify').addEventListener('click', () => {
chrome.runtime.sendMessage({
action: 'notify',
payload: btoa('🔔 This is a test notification from PhishAlert.')
});
});