interface DiaryEntry {
  title: string;
  content: string;
  date: string;
}

interface WriteResult {
  success: boolean;
  error?: string;
}

interface Setting {
  color?: string;
  fontSize?: number;
}

interface ElectronAPI {
  getAppPath: () => Promise<string>;
  readDiaryFile: (currDate: number) => Promise<string>;
  writeDiaryFile: (currDate: number, content: string) => Promise<string>;
  readAllDiaryFiles: () => Promise<Array<{ fileName: string; content: string }>>;
  readAllJsonDiaryFiles: () => Promise<Array<{ fileName: file, diaryEntry:DiaryEntry }>>;
  writeJsonDiaryFile: (diaryEntry: DiaryEntry) => Promise<WriteResult>;
  readJsonSetting: () => Promise<Setting>
  writeJsonSetting: (key: string, content: string) => Promise<{ success: boolean }>
}

interface Window {
  electron: ElectronAPI;
}