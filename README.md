# 🛡️ PhishAlert – Anti-Phishing Browser Extension

PhishAlert is a browser extension designed to alert users immediately after they fall victim to phishing attacks. Unlike traditional phishing detection tools that aim to block phishing links before action, PhishAlert educates and notifies users in real time – after credentials are submitted – with actionable next steps.

---

## 🚀 Features

- 🔒 Detects submission of credentials on known phishing pages.
- ⚠️ Shows a persistent in-browser alert if credentials are compromised.
- 🧠 Uses AI interface recognition to identify which site's UI is being faked.
- 📬 Asks the user post-submission: "Have you updated your credentials?"
  - If NO → "Please update immediately!"
  - If YES → "You're now safe."
- 🔐 Sends notifications using lightweight encrypted messages.
- 🧩 Fully functional Chrome extension — no simulated login pages.

---


---

## 🛠️ How It Works

1. When a user clicks a suspicious link and submits credentials, formListener.js captures the event.
2. interfaceMatcher.js checks the page’s UI structure and compares it with known legitimate sites.
3. If a match is found and the page is not the official one → trigger alertOverlays.js to inject an alert.
4. The user is then asked: "Have you updated your info?"
   - If not, a strong warning is shown urging immediate action.
   - If yes, the user receives confirmation of safety.
5. background.js handles encrypted communication and general logic.
6. content.js acts as the bridge between the DOM and backend logic.
7. The Options page lets users control alert settings, interface matcher toggle, and notification behavior.

---

## 🧪 How To Install

1. Download or clone this repo.
2. Open Chrome and go to chrome://extensions
3. Enable "Developer Mode" in the top right.
4. Click "Load unpacked" and select the phishalert/ folder.
5. The extension should now be active in your browser.

---

## 🔐 Encryption Notice

- All alert messages and user choices are sent with basic encryption for privacy.
- No sensitive data is ever stored or transmitted to external servers.
- This tool is 100% client-side and respects user privacy.

---

## 📌 Why It’s Unique

- Not just detection – it teaches users after a real mistake.
- AI-based UI matching rather than relying on static URL blacklists.
- Persistent alerts even after interaction to ensure awareness.
- Works on real-world phishing cases, not demos.

---

## 📧 Contact

Built by: Muhammed Sakir K  , Kiran Raj k, C Muhammed Rifas ,Abhishek K
📍 Bengaluru, India  
✉️ shadowtap.org@gmail.com

---

## 🔖 License

MIT License – Free to use, modify, and improve.

---


