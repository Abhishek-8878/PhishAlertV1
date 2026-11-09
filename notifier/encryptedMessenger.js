// Simple Base64 encryption/decryption for now (can replace with AES later):

export const encryptMessage = (message) => {
return btoa(unescape(encodeURIComponent(message)));
};

export const decryptMessage = (encoded) => {
return decodeURIComponent(escape(atob(encoded)));
};