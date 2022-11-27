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