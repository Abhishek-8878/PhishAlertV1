// List of suspicious TLDs (can be expanded)
const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.pw'];

// Known brands for phishing keyword detection
const brandKeywords = ['google', 'facebook', 'microsoft', 'instagram', 'amazon', 'paypal', 'netflix'];

// Optional: local blacklist (can be expanded or loaded from external source)
const localBlacklist = [
    'phishy-login.com',
    'secure-google-verify.xyz',
    'fake-facebook-login.tk',
];

// Util: Extract hostname from current page
function getHostname(url = window.location.href) {
    try {
        return new URL(url).hostname.toLowerCase();
    } catch {
        return '';
    }
}

// Util: Check if domain uses IP instead of a name
function isIPAddress(domain) {
    return /^\d{1,3}(.\d{1,3}){3}$/.test(domain);
}

// Util: Count subdomains
function getSubdomainCount(domain) {
    return domain.split('.').length - 2; // Remove TLD + main domain
}

// Main phishing detection logic
function detectSuspiciousURL() {
    const hostname = getHostname();
    const fullURL = window.location.href.toLowerCase();

    const reasons = [];

    // Check if in local blacklist
    if (localBlacklist.some(bad => hostname.includes(bad))) {
        reasons.push('Listed in local blacklist');
    }

    // Check for suspicious TLD
    if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
        reasons.push('Uses suspicious TLD');
    }

    // Check if domain is an IP address
    if (isIPAddress(hostname)) {
        reasons.push('Domain is an IP address');
    }

    // Check for too many subdomains
    if (getSubdomainCount(hostname) >= 3) {
        reasons.push('Too many subdomains');
    }

    // Check for brand keyword impersonation
    for (const brand of brandKeywords) {
        if (hostname.includes(brand) && !hostname.endsWith(`${ brand }.com`)) {
            reasons.push(`Impersonates ${ brand }`);
        }
    }

    // Optional: You can add integration with external phishing detection APIs here

    if (reasons.length > 0) {
        return {
            isPhishing: true,
            reasons,
            domain: hostname,
            url: fullURL
        };
    } else {
        return {
            isPhishing: false,
            domain: hostname,
            url: fullURL
        };
    }
}

export default detectSuspiciousURL;