import React, { useRef } from 'react';
import Led from './Led';
import useSound from '../hooks/useSound';

interface ToggleSwitchProps {
  mode: 'bull' | 'bear';
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, onToggle }) => {
  const handleSrc = mode === 'bull' ? 'images/handle_up.png' : 'images/handle_down.png';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const playSwitchSound = useSound('/audio/switch.mp3');

  const handleClick = () => {
    playSwitchSound();
    onToggle();
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  return (
    <div className="middle-controls">
      <div className="mode-tag mode-tag--bull">BULL</div>
      <button
        ref={buttonRef}
        className="toggle"
        onClick={handleClick}
        aria-label="Bull/Bear switch"
        aria-pressed={mode === 'bear'}
      >
        <img src={handleSrc} alt="Bull/Bear switch" />
      </button>
      <div className="bear-container">
        <div className="mode-tag mode-tag--bear">BEAR</div>
        <Led active={mode === 'bear'} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
