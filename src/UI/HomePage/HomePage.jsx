import { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import Testing from '../Testing/Testing'

//////// FUNCTIONS /////////////

function hasVerticalScrollbar() {
  return document.documentElement.scrollHeight > document.documentElement.clientHeight;
}


/////////// NAVIGATION BAR /////////////////

const NavigationBar = () => {
  const [isResizing, setIsResizing] = useState(false);
  const navRef = useRef(null);
  const rightBoxRef = useRef(null);
  const resizerRef = useRef(null);

  useEffect(() => {
    // Make height of resizerRef to full height;
    resizerRef.current.style.height = `${document.documentElement.scrollHeight}px`;
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = e.clientX;
        const percentage = newWidth / window.innerWidth * 100
        if (newWidth >= 60 && newWidth <= window.innerWidth - 60) {
          navRef.current.style.width = `${percentage}%`
          rightBoxRef.current.style.width = `${100 - percentage}%`
          resizerRef.current.style.left = `${percentage}%`;
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

export default NavigationBar;