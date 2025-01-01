interface DiaryEntry {
  title: string;
  content: string;
  date: string;
}

// const electron = require('electron');
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electron", {
  getAppPath: () => {
    return ipcRenderer.invoke('get-app-path')
  },

  getStaticData: () => console.log('static'),
  readDiaryFile: (fileName: number) => {
    return ipcRenderer.invoke('read-diary-file', fileName);
  },
  writeDiaryFile: (fileName: number, content: string) => {
    return ipcRenderer.invoke('write-diary-file', fileName, content);
  },
  readAllDiaryFiles: () => {
    return ipcRenderer.invoke('read-all-diary-files');
  },
  writeJsonDiaryFile: (diaryEntry: DiaryEntry) => {
    return ipcRenderer.invoke('write-json-diary-file', diaryEntry);
  },
  readAllJsonDiaryFiles: () => {
    return ipcRenderer.invoke('read-all-json-diary-files');
  },
  readJsonSetting: () => {
    return ipcRenderer.invoke('read-json-settings');
  },
  writeJsonSetting: (key: string, content: string) => {
    return ipcRenderer.invoke('write-json-settings', key, content);
  },
});
