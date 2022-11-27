import { Pagination } from '../../web-components/pagination.js'
import { define } from '../../web-components/define.js'
define(Pagination)

let audioContext


const playNoiseButton = document.getElementById('playNoiseButton')
playNoiseButton.addEventListener('click', () => {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  const frameCount = audioContext.sampleRate * 2
  const audioBuffer = new AudioBuffer({
    numberOfChannels: 1,
    length: frameCount,
    sampleRate: audioContext.sampleRate
  })
  const channelData = audioBuffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = (Math.random() - 0.5) * 2
  }
  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer
  bufferSource.connect(audioContext.destination)
  bufferSource.start();
})

const doFrequency = 261.6
const reFrequency = 293.6
const miFrequency = 329.6
const faFrequency = 349.2
const soFrequency = 392
const laFrequency = 440
const siFrequency = 493.8


const playDoButton = document.getElementById('playDoButton')
const playReButton = document.getElementById('playReButton')
const playMiButton = document.getElementById('playMiButton')
const playFaButton = document.getElementById('playFaButton')
const playSoButton = document.getElementById('playSoButton')
const playLaButton = document.getElementById('playLaButton')
const playSiButton = document.getElementById('playSiButton')

const playTone = (frequancy) => {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  const waveLength = audioContext.sampleRate / frequancy
  const halfWaveLength = waveLength / 2
  const frameCount = audioContext.sampleRate * 0.3
  const audioBuffer = new AudioBuffer({
    numberOfChannels: 1,
    length: frameCount,
    sampleRate: audioContext.sampleRate
  })
  const channelData = audioBuffer.getChannelData(0)
  for (let i = 0; i < frameCount; i++) {
    const isPositive = (i / halfWaveLength) % 2 < 1
    channelData[i] = isPositive ? 1 : -1
  }
  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer
  bufferSource.connect(audioContext.destination)
  bufferSource.start();
}

playDoButton.addEventListener('click', () => {
  playTone(doFrequency)
})
playReButton.addEventListener('click', () => {
  playTone(reFrequency)
})
playMiButton.addEventListener('click', () => {
  playTone(miFrequency)
})
playFaButton.addEventListener('click', () => {
  playTone(faFrequency)
})
playSoButton.addEventListener('click', () => {
  playTone(soFrequency)
})
playLaButton.addEventListener('click', () => {
  playTone(laFrequency)
})
playSiButton.addEventListener('click', () => {
  playTone(siFrequency)
})

const pitches = [doFrequency, reFrequency, miFrequency, faFrequency, soFrequency, laFrequency, siFrequency]
const twinkleTwinkleLittleStar = [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1, 5, 5, 4, 4, 3, 3, 2, 5, 5, 4, 4, 3, 3, 2, 1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1]
const playMelodyButton = document.getElementById('playMelodyButton')
const playDelay = (frequancy, delay) => {
  return new Promise((resolve) => {
    playTone(frequancy)
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
playMelodyButton.addEventListener('click', async () => {
  for (let i = 0; i < twinkleTwinkleLittleStar.length; i++) {
    await playDelay(pitches[twinkleTwinkleLittleStar[i]], 500)
  }
})
const quaterNote = 1 / 4
const halfNote = 1 / 2
const twinkleTwinkleLittleStarWithDuration = [{
  pitch: 1,
  duration: quaterNote
},
{
  pitch: 1,
  duration: quaterNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 6,
  duration: quaterNote
},
{
  pitch: 6,
  duration: quaterNote
},
{
  pitch: 5,
  duration: halfNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 2,
  duration: quaterNote
},
{
  pitch: 2,
  duration: quaterNote
},
{
  pitch: 1,
  duration: halfNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 2,
  duration: halfNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 2,
  duration: halfNote
},
{
  pitch: 1,
  duration: quaterNote
},
{
  pitch: 1,
  duration: quaterNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 5,
  duration: quaterNote
},
{
  pitch: 6,
  duration: quaterNote
},
{
  pitch: 6,
  duration: quaterNote
},
{
  pitch: 5,
  duration: halfNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 4,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 3,
  duration: quaterNote
},
{
  pitch: 2,
  duration: quaterNote
},
{
  pitch: 2,
  duration: quaterNote
},
{
  pitch: 1,
  duration: halfNote
}
]


const playPitchDuration = (frequancy, duration) => {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  const waveLength = audioContext.sampleRate / frequancy
  const halfWaveLength = waveLength / 2
  const frameCount = audioContext.sampleRate * duration / 1000
  const audioBuffer = new AudioBuffer({
    numberOfChannels: 1,
    length: frameCount,
    sampleRate: audioContext.sampleRate
  })
  const channelData = audioBuffer.getChannelData(0)
  for (let i = 0; i < frameCount; i++) {
    const isPositive = (i / halfWaveLength) % 2 < 1
    channelData[i] = isPositive ? 1 : -1
  }
  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer
  bufferSource.connect(audioContext.destination)
  bufferSource.start();
}

const playWithRhythmButton = document.getElementById('playWithRhythmButton')
const playDurationDelay = (frequancy, duration) => {
  return new Promise((resolve) => {
    playPitchDuration(frequancy, duration)
    setTimeout(() => {
      resolve()
    }, duration + 100)
  })
}
playWithRhythmButton.addEventListener('click', async () => {
  for (let i = 0; i < twinkleTwinkleLittleStarWithDuration.length; i++) {
    const item = twinkleTwinkleLittleStarWithDuration[i]
    await playDurationDelay(pitches[item.pitch], item.duration * 1000)
  }
})