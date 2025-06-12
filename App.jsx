import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import VoiceRecorder from './VoiceRecorder';

function App() {
  const [code, setCode] = useState('// Your code will appear here...');
  const [language, setLanguage] = useState('javascript');

  const handleVoice = async (text) => {
    const prompt = `Convert the following instruction into ${language} code:\n"${text}"\nReturn only code.`;
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setCode(data.output);
  };

  return (
    <div>
      <h1>Voice to Code Assistant</h1>
      <VoiceRecorder onTranscript={handleVoice} />
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <Editor height="400px" defaultLanguage={language} value={code} />
    </div>
  );
}

export default App;
