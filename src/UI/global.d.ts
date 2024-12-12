interface ElectronAPI {
  readDiaryFile: (fileName: string) => Promise<string>;
  writeDiaryFile: (fileName: string, content: string) => Promise<void>;
}

interface Window {
  electron: ElectronAPI;
}