import { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import Testing from '../Testing/Testing'



/////////// NAVIGATION BAR /////////////////

const HomePage: React.FC = () => {
  const [isResizing, setIsResizing] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  
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
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('unselectable');
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
    <div id={'worldBox'} style={{ width: '100%', height: 'auto' }}>
      <div id="NavigationBox" ref={navRef}>
        Left Box Content
      </div>
      <div
        id="Resizer"
        ref={resizerRef}
        onMouseDown={handleMouseDown}
      />
      <div id="RightBox" ref={rightBoxRef}>
        Right Box Content
        <Testing />
        <Testing />
      </div>
    </div>
  );
};

export default HomePage;