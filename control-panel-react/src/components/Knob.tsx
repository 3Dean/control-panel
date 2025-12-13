import React from 'react';
import useSound from '../hooks/useSound';

interface KnobProps {
  label: string;
  control: string;
  onClick: () => void;
}

const Knob: React.FC<KnobProps> = ({ label, control, onClick }) => {
  const playHoverSound = useSound('/audio/button_hover.mp3');
  const playClickSound = useSound('/audio/button.mp3');

  const handleClick = () => {
    playClickSound();
    onClick();
  };

  return (
    <div className="knob-container">
      <button
        className="knob"
        data-control={control}
        aria-label={label}
        onClick={handleClick}
        onMouseEnter={playHoverSound}
      ></button>
      <div className="knob-label">{label}</div>
    </div>
  );
};

export default Knob;
