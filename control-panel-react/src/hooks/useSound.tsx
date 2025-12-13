import { useCallback } from 'react';

const useSound = (src: string, volume = 0.5) => {
  const play = useCallback(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(error => console.error("Audio play failed:", error));
  }, [src, volume]);

  return play;
};

export default useSound;
