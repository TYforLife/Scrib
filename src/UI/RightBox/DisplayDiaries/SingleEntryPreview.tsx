import './SingleEntryPreview.css'

interface SingleEntryPreviewProps {
  date: string;
  content: string;
}

const SingleEntryPreview = ({ date, content }: SingleEntryPreviewProps) => {
  const [day, month, dayNumber, year] = date.split('-');

  return (
    <div id={'singleDiaryEntry'}>
      <div id={'dateBox'}>
        {/* <span className="day">{day}</span> */}
        <span className="day">{day} {dayNumber}</span>
        <span className="monthYear">{month} {year}</span>
      </div>
      <div id={'contentPreview'} >{content}</div>
    </div>
  )
}

export default SingleEntryPreview