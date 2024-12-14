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
    // Make height of resizerRef to full height;
    if (resizerRef.current) {
      resizerRef.current.style.height = `${document.documentElement.scrollHeight}px`;
    }
  }, [])

  useEffect(() => {
    interface MouseMoveEvent extends MouseEvent {
      clientX: number;
    }

    const handleMouseMove = (e: MouseMoveEvent) => {
      if (isResizing) {
      const newWidth = e.clientX;
      const percentage = newWidth / window.innerWidth * 100;
      if (newWidth >= 60 && newWidth <= window.innerWidth - 60) {
        if (navRef.current) {
        navRef.current.style.width = `${percentage}%`;
        }
        if (rightBoxRef.current) {
        rightBoxRef.current.style.width = `${100 - percentage}%`;
        }
        if (resizerRef.current) {
        resizerRef.current.style.left = `${percentage}%`;
        }
      }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div id={'worldBox'} style={{ width: '100%', height: 'auto' }}>
      <div id="NavigationBox" ref={navRef}>
        Left Box Content
      </div>
      <div
        id="Resizer"
        ref={resizerRef}
        onMouseDown={() => setIsResizing(true)}
      />
      <div id="RightBox" ref={rightBoxRef}>
        Right Box Content
        <Testing />
      </div>
    </div>
  );
};

export default HomePage;