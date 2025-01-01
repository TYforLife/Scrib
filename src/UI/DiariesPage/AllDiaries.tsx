import { useEffect, useState } from "react"

const AllDiaries: React.FC = () => {
  const [allDiaryEntires, setAllDiaryEntires] = useState<{ fileName: string; content: string; }[]>([])
  const [allJsonDiaryEntires, setAllJsonDiaryEntires] = useState<{ fileName: string; diaryEntry: DiaryEntry; }[]>([])

  useEffect(() => {
    async function fetchData() {
      setAllDiaryEntires(await window.electron.readAllDiaryFiles())
      setAllJsonDiaryEntires(await window.electron.readAllJsonDiaryFiles())
    }
    fetchData();
  }, [])

  return (
    <div>
      <ul>
        {allJsonDiaryEntires.map(entry => {
          return <li key={entry.fileName}>
            <h3>{entry.diaryEntry.title}</h3>
            <p>{entry.diaryEntry.date}</p>
            <div>{entry.diaryEntry.content}</div>
          </li>
        })}
      </ul>
      <ul>
        {allDiaryEntires.map(entry => {
          return <li key={entry.fileName}>{entry.fileName} {entry.content}</li>
        })}
      </ul>
    </div>
  )
}

export default AllDiaries