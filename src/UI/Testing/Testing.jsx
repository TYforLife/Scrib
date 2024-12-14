import { useEffect, useState, Suspense, lazy } from 'react'
import AllDiariesSkeleton from '../DiariesPage/AllDiariesSkeleton';
import DiaryPage from '../WrittingPage/DiaryPage';
import '../App.css'

const AllDiaries = lazy(() => import('../DiariesPage/AllDiaries'));

function Testing() {
  const [currDate, setCurrDate] = useState(Date.now())
  const [displayedDate, setDisplayedDate] = useState(null)

  useEffect(() => {
    setDisplayedDate(new Date(Date.now()))
  }, [])

  return (
    <div id={'TestingComponent'}>
      <h1>Testing Setting Texts</h1>
      <DiaryPage currDate={currDate} />
      <div>
        <p>
          {displayedDate ? displayedDate.toDateString() : 'None'}
        </p>
        <button onClick={() => {
          const date = new Date(currDate);
          date.setDate(date.getDate() + 1);
          setCurrDate(date.getTime());
          setDisplayedDate(date)
        }}>
          Add Day
        </button>
        <button onClick={() => {
          const date = new Date(currDate);
          date.setMonth(date.getMonth() + 1);
          setCurrDate(date.getTime());
          setDisplayedDate(date)
        }}>
          Add Month
        </button>
        <button onClick={() => {
          const date = new Date(currDate);
          date.setFullYear(date.getFullYear() + 1);
          setCurrDate(date.getTime());
          setDisplayedDate(date)
        }}>
          Add Year
        </button>
      </div>
      
      <Suspense fallback={<AllDiariesSkeleton />}>
        <AllDiaries />
      </Suspense>
    </div>
  )
}

export default Testing
