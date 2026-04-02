import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 100, className = '', pauseTime = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && index < text.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
    } else if (isDeleting && index > 0) {
      // Deleting backward
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
        setIndex(index - 1);
      }, speed / 2);
    } else if (index === text.length && !isDeleting) {
      // Pause at the end before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && index === 0) {
      // Reset to start typing again
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [index, text, speed, isDeleting, pauseTime]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypeWriter;
