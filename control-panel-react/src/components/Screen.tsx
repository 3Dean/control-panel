import React, { useEffect, useRef } from 'react';
import { initAnimation } from '../animation.js';

interface ScreenProps {
  amount: string;
}

const Screen: React.FC<ScreenProps> = ({ amount }) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      initAnimation(animationContainer.current);
    }
  }, []);

  return (
    <div className="screen">
      <div id="animation-container" ref={animationContainer}></div>
      <div className="amount">{amount}</div>
    </div>
  );
};

export default Screen;
