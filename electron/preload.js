const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  isElectron: true,
  platform: process.platform
});

// Optional: Expose notification API
contextBridge.exposeInMainWorld('notifications', {
  show: (title, body) => {
    new Notification(title, { body });
  }
});
