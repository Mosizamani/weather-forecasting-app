
import React, { useState } from 'react'

const VoiceAssistant = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false)

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

//   const handleVoiceInput = () => {
  
  const handleVoiceInput = () => {
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. Please try using Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    const listeningDuration = 2000; // Set listening time to 5 seconds
    let listeningTimeout

    recognition.start()
    setIsListening(true)

    // Stop recognition after the set duration
    listeningTimeout = setTimeout(() => {
      recognition.stop();
      setIsListening(false);
      console.log('Listening timeout reached');
    }, listeningDuration);


    recognition.onresult = (event) => {
      const speechInput = event.results[0][0].transcript
      console.log('User said: ', speechInput)
      onSearch(speechInput)  // Automatically search when speech is recognized
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error: ', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }
  }
  
//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text)
//     speechSynthesis.speak(utterance)
//   }

  return (
    <div>
      <button 
        type="button" 
        onClick={handleVoiceInput} 
        disabled={isListening}
      >
        {isListening ? 'Listening...' : '🎤 Use Voice'}
      </button>
    </div>
  )
}

export default VoiceAssistant
