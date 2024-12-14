interface ElectronAPI {
  readDiaryFile: (currDate: number) => Promise<string>;
  writeDiaryFile: (currDate: number, content: string) => Promise<string>;
  readAllDiaryFiles: () => Promise<Array<{ fileName: string; content: string }>>;
}

interface Window {
  electron: ElectronAPI;
}