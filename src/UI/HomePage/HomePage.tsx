import { useState, useRef, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './HomePage.css';
import Testing from '../RightBox/Testing/Testing'
import DisplayDiaries from '../RightBox/DisplayDiaries/DisplayDiaries';
import Navigation from '../Navigation/Navigation';
import DiaryEntry from '../DiaryEntry/DiaryEntry';
import Setting from '../RightBox/Setting/Setting';
import Calendar from '../RightBox/Calendar/Calendar';
import DiaryView from '../RightBox/DiaryView/DiaryView';



/////////// NAVIGATION BAR /////////////////

const HomePage: React.FC = () => {
  const [isResizing, setIsResizing] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   window.electron.getAppPath().then((appPath: string) => {
  //     console.log(appPath);
  //     setBasename(appPath);
  //     // console.log(location.pathname);  // Check current path
  //   });

  // }, []);


  useEffect(() => {
    interface MouseMoveEvent extends MouseEvent {
      clientX: number;
    }

    const handleMouseMove = (e: MouseMoveEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        const resizerWidth = resizerRef.current ? resizerRef.current.offsetWidth : 0;
        const percentage = newWidth / window.innerWidth * 100;
        if (newWidth >= 60 && newWidth <= window.innerWidth - 60) {
          if (navRef.current) {
            navRef.current.style.width = `calc(${percentage}% - ${resizerWidth}px)`;
          }
          if (rightBoxRef.current) {
            rightBoxRef.current.style.width = `${100 - percentage}%`;
          }
          if (resizerRef.current) {
            resizerRef.current.style.left = `calc(${percentage}% - ${resizerRef.current.offsetWidth}px)`;

            // Maybe make the resizerRef 'change colour?'
            resizerRef.current.classList.add('bright');
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('unselectable');

      // Remove Color if not resizing
      if (resizerRef.current) {
        resizerRef.current.classList.remove('bright');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => {
    setIsResizing(true);
    document.body.classList.add('unselectable');
  };

  return (
    <HashRouter>
      <div id={'worldBox'} style={{ width: '100%', height: 'auto' }}>
        <div id="NavigationBox" ref={navRef}>
          <Navigation />
        </div>
        <div id="Resizer" ref={resizerRef} onMouseDown={handleMouseDown} />
        <div id="RightBox" ref={rightBoxRef}>
          <Routes>
            <Route path="/" element={<DiaryEntry />} />
            <Route path="/Testing" element={<Testing />} />
            <Route path="/DiaryView" element={<DiaryView />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/AllDiaries" element={<DisplayDiaries />} />
            <Route path="/Settings" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default HomePage;