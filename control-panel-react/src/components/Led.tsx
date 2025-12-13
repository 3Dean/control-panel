import React from 'react';

interface LedProps {
  active: boolean;
}

const Led: React.FC<LedProps> = ({ active }) => {
  const lightSrc = active ? 'images/light_on.png' : 'images/light_off.png';
  return (
    <div className={`led ${active ? 'active' : ''}`}>
      <img src={lightSrc} alt="LED Indicator" />
    </div>
  );
};

export default Led;
