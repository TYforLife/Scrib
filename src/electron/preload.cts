// const electron = require('electron');
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electron", {
  getStaticData: () => console.log('static'),
  readDiaryFile: (fileName: number) => {
    return ipcRenderer.invoke('read-diary-file', fileName);
  },
  writeDiaryFile: (fileName: number, content: string) => {
    return ipcRenderer.invoke('write-diary-file', fileName, content);
  },
  readAllDiaryFiles: () => {
    return ipcRenderer.invoke('read-all-diary-files');
  }
});
