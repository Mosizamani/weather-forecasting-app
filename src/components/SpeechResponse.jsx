import React, { useEffect } from 'react'

const SpeechResponse = ({ weatherData }) => {

  useEffect(() => {
    if (weatherData) {
      speakWeatherInfo(weatherData)
    }
  }, [weatherData])

  const speakWeatherInfo = (data) => {
    const { name, main, weather } = data
    const temp = Math.round(main.temp)
    const description = weather[0].description

    const speechText = `Hello!
                        The current weather in ${name} is ${temp} degrees with ${description}. 
                        Do you want more details? If so, please click on the button below.`

    // Create a new speech utterance instance
    const utterance = new SpeechSynthesisUtterance(speechText)

    const voices = window.speechSynthesis.getVoices()

    const femaleVoice = voices.find((voice) => voice.name.toLowerCase())

    if (femaleVoice) {
        utterance.voice = femaleVoice
      }

    // Optionally set voice parameters
    utterance.lang = 'en-US'
    utterance.pitch = 1 
    utterance.rate = 1

    // Speak the weather information
    window.speechSynthesis.speak(utterance)

  }

  return (
    <div>
      <p>Click to hear the weather forecast.</p>
      <button onClick={() => speakWeatherInfo(weatherData)}>🎤 Speak Weather</button>
    </div>
  )
}

export default SpeechResponse
