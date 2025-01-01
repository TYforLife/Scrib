import { ipcMain, app } from 'electron';
import { resolve, basename } from 'path';
import path from 'path';
import fs from 'fs';
import { isDev } from './util.js'


ipcMain.handle('get-app-path', () => {
  if (isDev()) {
    // return ('http://localhost:5123')
    return ('')
  } else {
    return (path.join(app.getAppPath(), '/dist-react/index.html'))
  }
});

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


ipcMain.handle('write-json-diary-file', (event, { title, date, content }) => {
  try {
    const fileDateName = new Date(Date.now()).toDateString().replace(/ /g, '-');
    console.log(fileDateName);
    const userDataPath = app.getPath('userData');
    const normalizedFileName = basename(fileDateName);
    const diaryDirPath = resolve(userDataPath, 'Diaries/NewTest');
    const diaryFilePath = resolve(diaryDirPath, normalizedFileName);
    console.log(diaryFilePath);

    if (!fs.existsSync(diaryDirPath)) {
      fs.mkdirSync(diaryDirPath, { recursive: true });
    }

    const diaryEntry = { title, date, content };

    fs.writeFileSync(diaryFilePath, JSON.stringify(diaryEntry, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing diary entry:', error);
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle('read-all-json-diary-files', () => {
  // Get path to AppData.../Diaries/Test
  const userDataPath = app.getPath('userData');
  const diaryPath = path.resolve(userDataPath, 'Diaries/NewTest');

  const files = fs.readdirSync(diaryPath);
  const diaryContents = files.map(file => {
    const filePath = path.join(diaryPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const diaryEntry = JSON.parse(fileContent);
    return { fileName: file, diaryEntry };
  });

  // // The Diary entires are sorted in ascending order
  // const sortedDiaryContents = diaryContents.sort((a, b) => {
  //   //For a file name Fri-Dec-13-2024, the replace method transforms it to Dec 13, 2024, 
  //   //which is a format that the Date constructor can parse.
  //   const dateA = new Date(a.fileName.replace(/(\w+)-(\w+)-(\d+)-(\d+)/, '$2 $3, $4')).getTime() as number;
  //   const dateB = new Date(b.fileName.replace(/(\w+)-(\w+)-(\d+)-(\d+)/, '$2 $3, $4')).getTime() as number;
  //   return dateA - dateB;
  // });
  return diaryContents;
});

ipcMain.handle('read-json-settings', () => {
  // Get path to AppData.../Diaries/Test
  const userDataPath = app.getPath('userData');
  const diaryPath = path.resolve(userDataPath, 'Settings');

  const filePath = path.join(diaryPath, 'settings');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent)

  const files = fs.readdirSync(diaryPath);
  const diaryContents = files.map(file => {
    const filePath = path.join(diaryPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const diaryEntry = JSON.parse(fileContent);
    return { fileName: file, diaryEntry };
  });

  // // The Diary entires are sorted in ascending order
  // const sortedDiaryContents = diaryContents.sort((a, b) => {
  //   //For a file name Fri-Dec-13-2024, the replace method transforms it to Dec 13, 2024, 
  //   //which is a format that the Date constructor can parse.
  //   const dateA = new Date(a.fileName.replace(/(\w+)-(\w+)-(\d+)-(\d+)/, '$2 $3, $4')).getTime() as number;
  //   const dateB = new Date(b.fileName.replace(/(\w+)-(\w+)-(\d+)-(\d+)/, '$2 $3, $4')).getTime() as number;
  //   return dateA - dateB;
  // });
  return diaryContents;
});


ipcMain.handle('write-json-settings', (event, key, content) => {
  // Get path to AppData.../Diaries/Test
  const userDataPath = app.getPath('userData');
  const diaryPath = path.resolve(userDataPath, 'Settings');

  if (!fs.existsSync(diaryPath)) {
    fs.mkdirSync(diaryPath, { recursive: true });
  }

  const filePath = path.join(diaryPath, 'settings');
  let jsonFileContent: { [key: string]: unknown } = {};

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    jsonFileContent = JSON.parse(fileContent);
  } else {
    // Create the file with an empty object if it doesn't exist
    fs.writeFileSync(filePath, JSON.stringify(jsonFileContent, null, 2), 'utf-8');
  }

  // Update the key with the new content
  jsonFileContent[key] = content;

  // Write the updated JSON back to the file
  fs.writeFileSync(filePath, JSON.stringify(jsonFileContent, null, 2), 'utf-8');

  return { success: true };
});

