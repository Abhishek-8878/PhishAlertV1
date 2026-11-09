// content.js

// import { detectImpersonatedSite } from "../ai/interfaceMatcher.js";
// import { showAlertOverlay } from "../alerts/alertOverlay.js";
// import detectSuspiciousURL from "../ai/urlChecker.js";
console.log("PhishAlert content script loaded");
(async function () {
    try {
        // Wait for the DOM to fully load
        if (document.readyState === "loading") {
            await new Promise((resolve) => {
                document.addEventListener("DOMContentLoaded", resolve);
            });
        }

        const reasons = [];

        // 1. Run domain-based detection
        const urlCheck = detectSuspiciousURL();
        if (urlCheck.isPhishing) {
            reasons.push(...urlCheck.reasons);
        }

        // 2. Run visual interface matcher
        const detectedSite = detectImpersonatedSite();
        if (detectedSite !== "Unknown Site" && detectedSite !== "Detection Failed") {
            reasons.push(`Impersonates ${detectedSite}`);
        }

        // 3. Show alert if any reasons found
        if (reasons.length > 0) {
            const alertMessage = `⚠️ Phishing Detected!\n\nReasons:\n- ${reasons.join("\n- ")}`;
            showAlertOverlay(alertMessage);
        }

    } catch (error) {
        console.error("PhishAlert content script failed:", error);
    }
})();
