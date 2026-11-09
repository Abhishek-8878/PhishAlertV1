document.addEventListener("submit", (e) => {
  const form = e.target;
  const sensitiveInputs = form.querySelectorAll("input[type='password'], input[type='email'], input[type='text']");

  if (sensitiveInputs.length > 0) {
    const overlay = document.createElement("div");
    overlay.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;">
        <h2>Your info may be compromised!</h2>
        <p>Have you updated your password?</p>
        <button id="phish-no">No</button>
        <button id="phish-yes">Yes</button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector("#phish-no").onclick = () => {
      chrome.runtime.sendMessage({
        action: "notify",
        payload: btoa("Please update your credentials immediately!")
      });
      overlay.remove();
    };

    overlay.querySelector("#phish-yes").onclick = () => {
      chrome.runtime.sendMessage({
        action: "notify",
        payload: btoa("You are safe from the phishing attack.")
      });
      overlay.remove();
    };
  }
});
