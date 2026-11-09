// ai/interfaceMatcher.js
window.detectImpersonatedSite = function () {
const knownInterfaces = [
  {
    name: "Google",
    keywords: ["gmail", "google", "signin", "account", "gstatic"],
    favicon: /google\.com|gstatic\.com/,
  },
  {
    name: "Facebook",
    keywords: ["facebook", "fb", "login", "meta"],
    favicon: /facebook\.com/,
  },
  {
    name: "Microsoft",
    keywords: ["microsoft", "outlook", "office", "live.com"],
    favicon: /microsoft\.com|live\.com|office\.com/,
  },
  {
    name: "Instagram",
    keywords: ["instagram", "insta", "login"],
    favicon: /instagram\.com/,
  },
  {
    name: "Amazon",
    keywords: ["amazon", "signin", "auth"],
    favicon: /amazon\./,
  },
];

function matchInterface(documentContent = document.body.innerText, faviconHref = "") {
  const lowerText = documentContent.toLowerCase();
  for (const iface of knownInterfaces) {
    const keywordMatch = iface.keywords.some((kw) => lowerText.includes(kw));
    const faviconMatch = iface.favicon.test(faviconHref);
    if (keywordMatch || faviconMatch) {
      return iface.name;
    }
  }
  return "Unknown Site";
}

function getFaviconHref() {
  const links = document.querySelectorAll("link[rel~='icon']");
  if (!links || links.length === 0) return "";
  return links[0].href;
}

// Final exposed method
function detectImpersonatedSite() {
  try {
    const content = document.body.innerText;
    const favicon = getFaviconHref();
    const result = matchInterface(content, favicon);
    return result;
  } catch (err) {
    console.error("[PhishAlert] Interface matching failed:", err);
    return "Detection Failed";
  }
}

};
