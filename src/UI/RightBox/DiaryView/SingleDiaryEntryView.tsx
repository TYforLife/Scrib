import './DiaryView.css'
import { useState, useEffect } from 'react'

const SingleDiaryEntryView = ({ diaryToShow }: { diaryToShow: { fileName: string; diaryEntry: DiaryEntry } | null }) => {
  const [diaryTitle, setDiaryTitle] = useState('Loading...')
  const [diaryDate, setDiaryDate] = useState(new Date().toDateString())
  const [diaryContent, setDiaryContent] = useState('Loading...')

  useEffect(() => {
    if (diaryToShow) {
      setDiaryTitle(diaryToShow.diaryEntry.title)
      const date = new Date(diaryToShow.diaryEntry.date)
      setDiaryDate(date.toDateString())
      setDiaryContent(diaryToShow.diaryEntry.content)
    }
  }, [diaryToShow])

  return (
    <div id='singleDiaryWorld'>
      <h1>{diaryTitle}</h1>
      <h3>{diaryDate}</h3>
      <p>{diaryContent}</p>
    </div>
  )
}

export default SingleDiaryEntryView