// const electron = require('electron');
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electron", {
  getStaticData: () => console.log('static'),
  readDiaryFile: (fileName: string) => {
    return ipcRenderer.invoke('read-diary-file', fileName);
  },
  writeDiaryFile: (fileName: string, content: string) => {
    return ipcRenderer.invoke('write-diary-file', fileName, content);
  }
});