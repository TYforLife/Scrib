import { useEffect, useState } from "react"

const AllDiaries: React.FC = () => {
  const [allDiaryEntires, setAllDiaryEntires] = useState<{ fileName: string; content: string; }[]>([])

  useEffect(() => {
    async function fetchData() {
      setAllDiaryEntires(await window.electron.readAllDiaryFiles())
    }
    fetchData();
  }, [])

  return (
    <div>
      <ul>
        {allDiaryEntires.map(entry => {
          return <li key={entry.fileName}>{entry.fileName} {entry.content}</li>
        })}
      </ul>
    </div>
  )
}

export default AllDiaries