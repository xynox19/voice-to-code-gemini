import React, { useState } from 'react';

const VoiceRecorder = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);

  const handleStart = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = (err) => console.error(err);
    recognition.start();
    setListening(true);
  };

  return (
    <button onClick={handleStart}>
      🎤 Speak Instruction
    </button>
  );
};

export default VoiceRecorder;
