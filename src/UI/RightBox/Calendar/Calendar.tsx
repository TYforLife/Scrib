import './Calendar.css'
import { useState, useEffect } from 'react'

const Calendar = () => {
  const [month, setMonth] = useState(10); // Example: November (0-based index)
  const [year, setYear] = useState(2023); // Example: Year 2023
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [emptyDays, setEmptyDays] = useState(0);
  const [diaryDays, setDiaryDays] = useState<number[]>([]);


  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDate();

  useEffect(() => {
    setMonth(new Date().getMonth());
    setYear(new Date().getFullYear());
  }, [])

  useEffect(() => {
    const daysWithDiaryEntry = async () => {
      const diaryEntries = await window.electron.readAllJsonDiaryFiles();
      const validDiaryEntries = diaryEntries.filter(entry => isDiaryEntryInCurrentMonth(entry.fileName));
      return validDiaryEntries.map(entry => getDayFromFileName(entry.fileName));
    };

    daysWithDiaryEntry().then(setDiaryDays);

    const getDaysInMonth = (month: number, year: number) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getEmptyDays = (month: number, year: number) => {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      return firstDayOfMonth;
    };

    setDaysInMonth(getDaysInMonth(month, year));
    setEmptyDays(getEmptyDays(month, year));

  }, [month, year]);

  const makeDayTitle = () => {
    return dayNames.map((day, index) => (
      <div className={'dayTitle'} key={index}>
        {day}
      </div>
    ));
  };

  const makeDays = () => {
    const emptyDayElements = Array.from({ length: emptyDays }, (_, i) => (
      <div className={'calendarDayUnit emptyDay'} key={`empty-${i}`}></div>
    ));
    const dayElements = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const isComplete = diaryDays.includes(day);
      const isToday = month === new Date().getMonth() && day === today && year === new Date().getFullYear()

      return (
        <div className={'calendarDayUnit'} key={i}>
          <div
            id={'calendarDayUnitDisplay'}
            className={`${isToday ? 'isToday' : ''} ${isComplete && !isToday ? 'isComplete' : ''}`}
          >
            {day}
          </div>
        </div>
      );
    });

    return [...emptyDayElements, ...dayElements];
  };

  const isDiaryEntryInCurrentMonth = (fileName: string) => {
    const date = new Date(fileName);
    return date.getMonth() === month && date.getFullYear() === year;
  };

  const getDayFromFileName = (fileName: string) => {
    const date = new Date(fileName);
    return date.getDate();
  };

  return (
    <div id={'calendarWorld'}>
      <h1>Calendar</h1>
      <div id={'calendarBox'}>
        <h3>{`${monthNames[month]}`}</h3>
        <h5>{`${year}`}</h5>
        <div id={'calendarDaysTitle'}>{makeDayTitle()}</div>
        <div id={'calendarDaysBox'}>
          {makeDays()}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
        <button onClick={() => {
          const date = new Date(year, month, 1);
          date.setMonth(date.getMonth() - 1);
          setMonth(date.getMonth());
          setYear(date.getFullYear());
        }}>
          Prev Month
        </button>
        <button onClick={() => {
          const date = new Date(year, month, 1);
          date.setMonth(date.getMonth() + 1);
          setMonth(date.getMonth());
          setYear(date.getFullYear());
        }}>
          Next Month
        </button>
      </div>
    </div>
  );
};
export default Calendar