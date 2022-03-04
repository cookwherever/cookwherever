import React, {useEffect, useRef, useState} from 'react';

import {Button} from "@mui/material";


let recognition: { continuous: boolean; interimResults: boolean; onstart: () => void; onerror: (e: Event) => void; onend: (() => void) | null; onresult: (e: any) => void; stop: () => void; lang: any; start: () => void; } | undefined = undefined;

const SpeechInput = () => {
  const [final, setFinal] = useState('');
  const [interim, setInterim] = useState('');
  const [recording, setRecording] = useState(false);

  useEffect(() => {

    // @ts-ignore
    recognition = new webkitSpeechRecognition();
    if (recognition === undefined) {
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = () => {
    }
    recognition.onerror = (e: Event) => {
      console.error(e);
    }
    recognition.onend = () => {
    }

    recognition.onresult = (e: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      if (recognition === undefined) {
        return;
      }

      if (typeof(e.results) == 'undefined') {
        recognition.onend = null;
        recognition.stop();
        return;
      }
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
        } else {
          interimTranscript += e.results[i][0].transcript;
        }
      }
      setFinal(finalTranscript);
      setInterim(interimTranscript);
    }
  }, [])

  const startInput = () => {
    if (recognition === undefined) {
      return;
    }

    setRecording(true);
    recognition.lang = 'en-US';
    recognition.start();
  }

  const stopInput = () => {
    if (recognition === undefined) {
      return;
    }

    setRecording(false);
    recognition.onend = null;
    recognition.stop();
  }

  return (
    <div>
      <Button onClick={startInput}>dictate</Button>
      {
        recording && <Button onClick={stopInput}>stop</Button>
      }
      <p>{interim}</p>
      <p>{final}</p>
    </div>
  );
}

export default SpeechInput;
