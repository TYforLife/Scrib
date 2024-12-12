const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
  // things UI can use.
  // In the app, say window.electron.{function_name}
  getStaticData: () => console.log('static'),
})