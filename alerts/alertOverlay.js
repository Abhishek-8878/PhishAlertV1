// alerts/alertOverlay.js

(function () {
  if (document.getElementById('phish-alert-modal')) return; // Prevent duplicates

  const style = document.createElement('style');
  style.textContent = `
    #phish-alert-modal {
      position: fixed;
      z-index: 999999;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
    }

    .phish-box {
      background: #fff;
      padding: 2em;
      border-radius: 10px;
      text-align: center;
      max-width: 90%;
      width: 400px;
      box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
    }

    .phish-box h2 {
      color: #cc0000;
      margin-bottom: 1em;
    }

    .phish-box button {
      padding: 10px 20px;
      margin: 0 10px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .phish-yes {
      background: #4CAF50;
      color: white;
    }

    .phish-no {
      background: #f44336;
      color: white;
    }
  `;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.id = 'phish-alert-modal';
  modal.innerHTML = `
    <div class="phish-box">
      <h2>⚠️ Phishing Alert Detected!</h2>
      <p>Have you updated your login credentials after visiting the suspicious site?</p>
      <div style="margin-top: 1.5em;">
        <button class="phish-yes">Yes, I updated</button>
        <button class="phish-no">No, not yet</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const sendResponse = (response) => {
    chrome.runtime.sendMessage({ type: 'USER_RESPONSE', response }, (res) => {
      console.log('[PhishAlert] Response sent:', res);
    });

    // Close modal
    document.getElementById('phish-alert-modal').remove();
  };

  document.querySelector('.phish-yes').addEventListener('click', () => {
    sendResponse('yes');
  });

  document.querySelector('.phish-no').addEventListener('click', () => {
    sendResponse('no');
  });
})();
