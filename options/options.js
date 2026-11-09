document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings when the options page loads
  chrome.storage.sync.get(
    {
      alertsEnabled: true,
      interfaceMatchingEnabled: true,
      encryptedNotifications: true
    },
    (items) => {
      document.getElementById('alertsEnabled').checked = items.alertsEnabled;
      document.getElementById('interfaceMatchingEnabled').checked = items.interfaceMatchingEnabled;
      document.getElementById('encryptedNotifications').checked = items.encryptedNotifications;
    }
  );

  // Save settings when checkboxes change
  const settings = ['alertsEnabled', 'interfaceMatchingEnabled', 'encryptedNotifications'];
  settings.forEach((settingId) => {
    document.getElementById(settingId).addEventListener('change', () => {
      const updatedSetting = {};
      updatedSetting[settingId] = document.getElementById(settingId).checked;
      chrome.storage.sync.set(updatedSetting, () => {
        console.log(`Setting ${settingId} saved.`);
      });
    });
  });
});
