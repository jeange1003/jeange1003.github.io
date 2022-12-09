import { Pagination } from '../../web-components/pagination.js'
import { define } from '../../web-components/define.js'
define(Pagination)

let audioCtx
let oscillator
const stopButton = document.getElementById('stopButton')

// demo1
const playButton = document.getElementById('playButton')
playButton.addEventListener('click', () => {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  if (oscillator) {
    oscillator.stop()
  }
  // 创建振荡器
  oscillator = audioCtx.createOscillator();
  // 设置波形
  oscillator.type = 'sine';
  // 设置频率
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
})


// demo2
const playCustomButton = document.getElementById('playCustomButton')
const demo2Frequency = document.getElementById('demo2Frequency')
const demo2WaveType = document.getElementsByName('demo2WaveType')
const demo2Detune = document.getElementById('demo2Detune')
const frequencyDisplay = document.getElementById('frequencyDisplay')
playCustomButton.addEventListener('click', () => {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  if (oscillator) {
    oscillator.stop()
  }
  oscillator = audioCtx.createOscillator();
  const frequency = demo2Frequency.value
  const waveType = Array.from(demo2WaveType).find(e => e.checked).value
  const detune = demo2Detune.value
  oscillator.type = waveType;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  oscillator.detune.setValueAtTime(detune, audioCtx.currentTime)
  oscillator.connect(audioCtx.destination);
  oscillator.start();
})
demo2Frequency.addEventListener('input', (e) => {
  const value = e.target.value
  oscillator.frequency.setValueAtTime(value, audioCtx.currentTime)
  frequencyDisplay.innerText = value
})
Array.from(demo2WaveType).forEach(e => e.addEventListener('change', (e) => {
  const value = e.target.value
  oscillator.type = value
}))
demo2Detune.addEventListener('input', (e) => {
  const value = e.target.value
  oscillator.detune.setValueAtTime(value, audioCtx.currentTime)
})

stopButton.addEventListener('click', () => {
  oscillator.stop()
})