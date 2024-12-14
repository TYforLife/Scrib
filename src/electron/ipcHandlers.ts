import { ipcMain, app } from 'electron';
import { resolve, basename } from 'path';
import path from 'path';
import fs from 'fs';

ipcMain.handle('read-diary-file', (event, currDate) => {
  const fileDateName = new Date(currDate).toDateString().replace(/ /g, '-')
  const userDataPath = app.getPath('userData');
  const normalizedFileName = basename(fileDateName);
  // Since we are in development, use Diaries/Test
  const diaryPath = resolve(userDataPath, 'Diaries/Test', normalizedFileName);
  console.log(diaryPath);

  if (!fs.existsSync(diaryPath)) {
    throw new Error(`no file of this Date: ${normalizedFileName}`);
  }

  return fs.readFileSync(diaryPath, 'utf-8');
});

ipcMain.handle('write-diary-file', (event, currDate, content) => {
  const fileDateName = new Date(currDate).toDateString().replace(/ /g, '-')
  const userDataPath = app.getPath('userData');
  const normalizedFileName = basename(fileDateName);
  // Since we are in development, use Diaries/Test
  const diaryPath = resolve(userDataPath, 'Diaries/Test', normalizedFileName);
  console.log(diaryPath);

  if (!fs.existsSync(diaryPath)) {
    fs.mkdirSync(resolve(userDataPath, 'Diaries'), { recursive: true });
  }

  fs.writeFileSync(diaryPath, content, 'utf-8');
  return content;
});

ipcMain.handle('read-all-diary-files', () => {
  // Get path to AppData.../Diaries/Test
  const userDataPath = app.getPath('userData');
  const diaryPath = path.resolve(userDataPath, 'Diaries/Test');

  const files = fs.readdirSync(diaryPath);
  const diaryContents = files.map(file => {
    const filePath = path.join(diaryPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return { fileName: file, content };
  });

  // The Diary entires are sorted in ascending order
  const sortedDiaryContents = diaryContents.sort((a, b) => {
    //For a file name Fri-Dec-13-2024, the replace method transforms it to Dec 13, 2024, 
    //which is a format that the Date constructor can parse.
    const dateA = new Date(a.fileName.replace(/(\w+)-(\w+)-(\d+)-(\d+)/, '$2 $3, $4')).getTime() as number;
    const dateB = new Date(b.fileName.replace(/(\w+)-(\w+)-(\d+)-(\d+)/, '$2 $3, $4')).getTime() as number;
    return dateA - dateB;
});
  return sortedDiaryContents;
});