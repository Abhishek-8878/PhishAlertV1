import { encryptMessage } from './encryptedMessenger.js';
import { handleUserResponse } from './responseHandler.js';

export function showPhishingResponsePrompt() {
  const overlay = document.createElement('div');
  overlay.id = 'phishalert-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: white;
    font-family: sans-serif;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: #222;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  `;

  const msg = document.createElement('p');
  msg.textContent = 'Have you updated your credentials since the last login attempt?';

  const yesBtn = document.createElement('button');
  yesBtn.textContent = 'Yes';
  yesBtn.style.cssText = 'margin: 10px; padding: 10px;';
  yesBtn.onclick = () => {
    document.body.removeChild(overlay);
    handleUserResponse(true);
  };

  const noBtn = document.createElement('button');
  noBtn.textContent = 'No';
  noBtn.style.cssText = 'margin: 10px; padding: 10px;';
  noBtn.onclick = () => {
    document.body.removeChild(overlay);
    handleUserResponse(false);
  };

  box.appendChild(msg);
  box.appendChild(yesBtn);
  box.appendChild(noBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}
