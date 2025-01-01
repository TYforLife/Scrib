import './DiaryView.css'
import SingleDiaryEntryView from './SingleDiaryEntryView'
import { useState, useEffect } from 'react'

const DiaryView = () => {
  // const [allJsonDiaryEntires, setAllJsonDiaryEntires] = useState<{ fileName: string; diaryEntry: DiaryEntry; }[]>([])
  const [diaryToShow, setDiaryToShow] = useState<{ fileName: string; diaryEntry: DiaryEntry } | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await window.electron.readAllJsonDiaryFiles()
        // setAllJsonDiaryEntires(data)
        setDiaryToShow(data[data.length - 1])

      } catch (error) {
        console.error('Error fetching data:', error) // Add this line to log any errors
      }
    }
    fetchData();
  }, [])
  return (
    <div id={'diaryViewWorld'}>
      <SingleDiaryEntryView diaryToShow={diaryToShow}/>
    </div>
  )
}

export default DiaryView