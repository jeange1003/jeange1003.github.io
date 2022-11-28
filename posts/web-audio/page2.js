import { Pagination } from '../../web-components/pagination.js'
import { define } from '../../web-components/define.js'
define(Pagination)

let audioContext
let audioBuffer
let analyserNode
const doFrequency = 261.6
const reFrequency = 293.6
const miFrequency = 329.6
const faFrequency = 349.2
const soFrequency = 392
const laFrequency = 440
const siFrequency = 493.8
const pitches = [doFrequency, reFrequency, miFrequency, faFrequency, soFrequency, laFrequency, siFrequency]
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

let raf
const waveDisplayCanvas = document.getElementById('waveDisplayCanvas')
const canvasContext = waveDisplayCanvas.getContext("2d");
const canvasHeight = waveDisplayCanvas.height
const canvasWidth = waveDisplayCanvas.width
const draw = () => {
  const bufferLength = analyserNode.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyserNode.getByteTimeDomainData(dataArray);
  raf = requestAnimationFrame(draw)
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
  canvasContext.beginPath()
  if (dataArray.length) {
    let value = dataArray[0] / 256
    const sliceWidth = canvasWidth / bufferLength
    let x = 0
    let y = value * canvasHeight
    canvasContext.moveTo(x, y)
    x += sliceWidth
    for (let i = 1; i < bufferLength; i++) {
      value = dataArray[i] / 256
      y = value * canvasHeight
      canvasContext.lineTo(x, y)
      x += sliceWidth
    }
  }
  canvasContext.stroke()
}

// 例子1
const playPitchDuration = (frequancy, duration) => {
  if (!audioContext) {
    audioContext = new AudioContext()
    analyserNode = new AnalyserNode(audioContext)
  }
  const waveLength = audioContext.sampleRate / frequancy
  const halfWaveLength = waveLength / 2
  const frameCount = audioContext.sampleRate * duration / 1000
  audioBuffer = new AudioBuffer({
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
  bufferSource.connect(analyserNode)
  bufferSource.start();

  draw()
  bufferSource.addEventListener('ended', () => {
    cancelAnimationFrame(raf)
  })
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

// 例子2
const playPitchDurationWithCustomWave = (frequancy, duration, waveFunction) => {
  if (!audioContext) {
    audioContext = new AudioContext()
    analyserNode = new AnalyserNode(audioContext)
  }
  const waveLength = audioContext.sampleRate / frequancy
  const halfWaveLength = waveLength / 2
  const frameCount = audioContext.sampleRate * duration / 1000
  audioBuffer = new AudioBuffer({
    numberOfChannels: 1,
    length: frameCount,
    sampleRate: audioContext.sampleRate
  })
  const channelData = audioBuffer.getChannelData(0)
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = waveFunction(i % waveLength, waveLength)
  }
  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer
  bufferSource.connect(audioContext.destination)
  bufferSource.connect(analyserNode)
  bufferSource.start();

  draw()
  bufferSource.addEventListener('ended', () => {
    cancelAnimationFrame(raf)
  })
}

const playDelay = (playFunction, delay) => {
  return new Promise((resolve) => {
    playFunction()
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const playSineWaveMelodyButton = document.getElementById('playSineWaveMelodyButton')

const bisquadWaveFunction = (index, waveLength) => {
  const halfWaveLength = waveLength / 2
  const isPositive = (index / halfWaveLength) % 2 < 1
  return isPositive ? 1 : -1
}

const sineWaveFunction = (index, waveLength) => {
  // const halfWaveLength = waveLength / 2
  // const isPositive = (index / halfWaveLength) % 2 < 1
  return Math.sin(index / waveLength * Math.PI * 2)
}

playSineWaveMelodyButton.addEventListener('click', async () => {
  for (let i = 0; i < twinkleTwinkleLittleStarWithDuration.length; i++) {
    const item = twinkleTwinkleLittleStarWithDuration[i]
    await playDelay(() => {
      playPitchDurationWithCustomWave(pitches[item.pitch],
        item.duration * 1000,
        sineWaveFunction
      )
    }, item.duration * 1000 + 100)
  }
})
