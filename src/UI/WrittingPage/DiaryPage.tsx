interface DiaryPageProps {
  currDate?: number;
}

import { useState } from 'react'

const DiaryPage: React.FC<DiaryPageProps> = ({ currDate }) => {
  const [fileText, setFileText] = useState("Write here to send")
  const [readFileText, setReadFileText] = useState("click read to read")

  currDate = currDate ? currDate : Date.now()

  return (
    <>
      <div>
        <button onClick={async () => {
          try {
            const fileContent = await window.electron.readDiaryFile(currDate)
            setReadFileText(fileContent)
          } catch (error) {
            console.error('Error:', error)
            setReadFileText('Error reading file...')
          }
        }}>
          Read Diary File
        </button>
        <button onClick={async () => {
          await window.electron.writeDiaryFile(currDate, fileText)
          setFileText('')
        }}>
          Write Diary File
        </button>
      </div>
      <div>
        <h4>
          Write Text Below
        </h4>
        <textarea
          onChange={(e) => setFileText(e.target.value)}
          value={fileText}
        >
        </textarea >
        <h4>
          Read File Texts
        </h4>
        <textarea
          value={readFileText}
          readOnly
        >
        </textarea >
      </div>
    </>
  );
}

export default DiaryPage