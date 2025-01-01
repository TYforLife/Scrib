import { useState, useEffect, useRef } from 'react'
import './DiaryEntry.css'

const DiaryEntry: React.FC = () => {
  const [diaryEntryTitle, setDiaryEntryTitle] = useState('')
  const [diaryText, setDiaryText] = useState('')
  const textareaRef = useRef(null)
  const titleTextareaRef = useRef(null)

  const formatDate = (timestamp: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(timestamp).toLocaleDateString('en-GB', options)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryText(event.target.value)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryEntryTitle(event.target.value)
  }

  interface TextAreaRef {
    current: HTMLTextAreaElement | null;
  }

  const adjustHeightTextArea = (textareaReference: TextAreaRef) => {
    const textarea = textareaReference.current;
    const adjustHeight = () => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    };

    if (textarea) {
      textarea.addEventListener('input', adjustHeight);
      adjustHeight(); // Initialize the height

      return () => {
        textarea.removeEventListener('input', adjustHeight);
      };
    }
  };

  useEffect(() => {

    adjustHeightTextArea(titleTextareaRef)
    adjustHeightTextArea(textareaRef)
  }, [])

  const saveDiaryEntry = async () => {
    const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const diaryEntry = {
      title: diaryEntryTitle,
      date,
      content: diaryText,
    };

    console.log(diaryEntry) 

    const result = await window.electron.writeJsonDiaryFile(diaryEntry);
    if (result.success) {
      setDiaryEntryTitle('');
      setDiaryText('');
    } else {
      console.error('Failed to save diary entry:', result.error);
    }
  };

  return (
    <div id='todayDiary'>
      <textarea
        id='diaryEntryTitle'
        placeholder="Today's story"
        value={diaryEntryTitle}
        onChange={handleTitleChange}
        rows={1}
        ref={titleTextareaRef}
      />
      <div id='diaryEntryTitleDate'>{formatDate(new Date())}</div>
      <div id='diaryEntryWorld'>
        <div id='diaryLineDisplay'></div>
        <div id='diaryContents'>
          <textarea
            ref={textareaRef}
            value={diaryText}
            rows={1}
            placeholder='My story'
            onChange={handleTextChange}></textarea>
        </div>
      </div>
      <div id='submitDiary'>
        <button onClick={saveDiaryEntry}>
          Save
        </button>
      </div>
    </div>
  )
}

export default DiaryEntry