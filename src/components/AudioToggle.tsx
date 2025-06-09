// components/AudioToggle.tsx
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.muted = muted;
      audio.volume = muted ? 0 : 1;
    }
  }, [muted]);

  return (
    <button
      onClick={() => setMuted(prev => !prev)}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 100,
        background: 'transparent',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        color: 'white',
        cursor: 'pointer',
      }}
    >
      {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};



