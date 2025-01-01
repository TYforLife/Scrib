import { useState, useEffect } from "react";
import SingleEntryPreview from "./SingleEntryPreview";

const DisplayDiaries = () => {
  const [allDiaryEntires, setAllDiaryEntires] = useState<{ fileName: string; content: string; }[]>([])
  const [allJsonDiaryEntires, setAllJsonDiaryEntires] = useState<{ fileName: string; diaryEntry: DiaryEntry; }[]>([])


  useEffect(() => {
    async function fetchData() {
      setAllDiaryEntires(await window.electron.readAllDiaryFiles())
      setAllJsonDiaryEntires(await window.electron.readAllJsonDiaryFiles())

    }
    fetchData();
  }, [])

  const displayAllDiariesStyle: React.CSSProperties = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  }

  return (
    <>
      <div id={'displayAllDiaires'} style={displayAllDiariesStyle}>
      <ul>
        {allJsonDiaryEntires.map(entry => {
          return <li key={entry.fileName}>
            <h3>{entry.diaryEntry.title ? entry.diaryEntry.title : "Today's Story"}</h3>
            <p>{entry.diaryEntry.date}</p>
            <div style={{ whiteSpace: 'pre-wrap' }}>{entry.diaryEntry.content}</div>
          </li>
        })}
      </ul>
        {allDiaryEntires.map(entry => {
          return <SingleEntryPreview key={entry.fileName} date={entry.fileName} content={entry.content} />
        })}
      </div>
    </>
  )
}


export default DisplayDiaries