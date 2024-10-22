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

    const speechText = `Hello! The current weather in ${name} is ${temp} degrees with ${description}.`

    // Create a new speech utterance instance
    const utterance = new SpeechSynthesisUtterance(speechText)

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
