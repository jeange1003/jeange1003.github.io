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

const resolution = 200

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

const delay = 0.1
let bufferSource

const playMelody = (melody, waveFunction) => {
  if (!audioContext) {
    audioContext = new AudioContext()
    analyserNode = new AnalyserNode(audioContext)
  }
  const durationInS = melody.reduce((prev, cur) => {
    prev += cur.duration + delay
    return prev
  }, 0)
  const frameCount = audioContext.sampleRate * durationInS
  audioBuffer = new AudioBuffer({
    numberOfChannels: 1,
    length: frameCount,
    sampleRate: audioContext.sampleRate
  })
  const channelData = audioBuffer.getChannelData(0)
  for (let noteIndex = 0, frameInMelodyIndex = 0; noteIndex < melody.length; noteIndex++) {
    // 构建单个音符的数据
    const note = melody[noteIndex]
    const noteFrameCount = audioContext.sampleRate * note.duration
    const frequency = pitches[note.pitch]
    const waveFrameCount = audioContext.sampleRate / frequency
    // 构建单个波形
    for (let frameInNoteIndex = 0; frameInNoteIndex < noteFrameCount; frameInNoteIndex++, frameInMelodyIndex++) {
      const frameInWaveIndex = frameInNoteIndex % waveFrameCount
      channelData[frameInMelodyIndex] = waveFunction(frameInWaveIndex, waveFrameCount) * noteFrameCount / (frameInNoteIndex + 1)
    }
    const delayFrameCount = audioContext.sampleRate * delay
    // delay
    for (let frameInDelayIndex = 0; frameInDelayIndex < delayFrameCount; frameInDelayIndex++, frameInMelodyIndex++) {
      channelData[frameInMelodyIndex] = 0
    }
  }
  bufferSource = audioContext.createBufferSource();

  bufferSource.buffer = audioBuffer
  bufferSource.connect(audioContext.destination)
  bufferSource.connect(analyserNode)
  bufferSource.start();
  draw()
  bufferSource.addEventListener('ended', () => {
    cancelAnimationFrame(raf)
  })
}

const sineWaveFunction = (index, waveLength) => {
  return Math.sin(index / waveLength * Math.PI * 2)
}

const playButton = document.getElementById('playButton')

playButton.addEventListener('click', async () => {
  playMelody(twinkleTwinkleLittleStarWithDuration, sineWaveFunction)
})

const waveEditorCanvas = document.getElementById('waveEditorCanvas')
const editContext = waveEditorCanvas.getContext('2d')
const points = new Array(resolution).fill(0)
const pointGap = waveEditorCanvas.width / points.length
const drawEditor = () => {
  editContext.clearRect(0, 0, waveEditorCanvas.width, waveEditorCanvas.height)
  editContext.beginPath()
  editContext.moveTo(0, (points[0] + 0.5) * waveEditorCanvas.height)
  for (let i = 1; i < points.length; i++) {
    editContext.lineTo(pointGap * i, (points[i] + 0.5) * waveEditorCanvas.height)
  }
  editContext.stroke()
}
drawEditor()
waveEditorCanvas.addEventListener('mousedown', (mouseDownEvent) => {
  const setPoint = (mouseEvent) => {
    const indexOfPoint = Math.floor(mouseEvent.offsetX / pointGap)
    points[indexOfPoint] = mouseEvent.offsetY / waveEditorCanvas.height - 0.5
  }
  setPoint(mouseDownEvent)

  const mouseMoveHandler = (mouseMoveEvent) => {
    setPoint(mouseMoveEvent)

    drawEditor()
  }
  const mouseUpHandler = () => {
    waveEditorCanvas.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }
  waveEditorCanvas.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
})

const customWaveFunction = (index, waveLength) => {
  const indexOfPoint = Math.floor(index / waveLength * resolution)
  return points[indexOfPoint]
}
const playCustomWave = document.getElementById('playCustomWave')
playCustomWave.addEventListener('click', () => {
  playMelody(twinkleTwinkleLittleStarWithDuration, customWaveFunction)
})

const stopPlaying = document.getElementById('stopPlaying')
stopPlaying.addEventListener('click', () => {
  bufferSource.stop()
})