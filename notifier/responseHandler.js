import { encryptMessage } from './encryptedMessenger.js';

export function handleUserResponse(didUpdate) {
  const message = didUpdate
    ? 'You’re safe from the phishing attack.'
    : 'Please update your credentials immediately to protect your account.';

  const encrypted = encryptMessage(message);
  showEncryptedAlert(encrypted);
}

function showEncryptedAlert(encryptedText) {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: #fff;
    padding: 15px 20px;
    border-radius: 8px;
    font-family: monospace;
    z-index: 9999;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  `;

  container.textContent = `🔐 Encrypted Message: ${encryptedText}`;
  document.body.appendChild(container);

  setTimeout(() => document.body.removeChild(container), 8000);
}
