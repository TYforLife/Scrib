import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { resolve, basename } from 'path';
import { isDev } from './util.js'
import { getPreloadPath } from './pathResolver.js';
import fs from 'fs';

app.on("ready", ()=> {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }

})

ipcMain.handle('read-diary-file', (event, fileName) => {
  console.log(fileName);
  const userDataPath = app.getPath('userData');
  const normalizedFileName = basename(fileName);
  const diaryPath = resolve(userDataPath, 'Diaries', normalizedFileName);
  console.log(diaryPath);

  if (!fs.existsSync(diaryPath)) {
    return new Error('no file')
  }

  return fs.readFileSync(diaryPath, 'utf-8');
});

ipcMain.handle('write-diary-file', (event, fileName, content) => {
  console.log(fileName);
  const userDataPath = app.getPath('userData');
  const normalizedFileName = basename(fileName);
  const diaryPath = resolve(userDataPath, 'Diaries', normalizedFileName);
  console.log(diaryPath);

  if (!fs.existsSync(diaryPath)) {
    fs.mkdirSync(resolve(userDataPath, 'Diaries'), { recursive: true });
    fs.writeFileSync(diaryPath, content, 'utf-8');
    return "made new file"
  }

  fs.writeFileSync(diaryPath, content, 'utf-8');
  return "override existing file"
});