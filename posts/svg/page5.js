const fillColorPicker = document.getElementById('fillColorPicker')
const rectForFill = document.getElementById('rectForFill')
fillColorPicker.addEventListener('change', (e) => {
  rectForFill.setAttribute('fill', e.target.value)
})

const strokeColorPicker = document.getElementById('strokeColorPicker')
const strokeWidth = document.getElementById('strokeWidth')
const linecaps = document.getElementsByName('linecap')
const linejoins = document.getElementsByName('linejoin')
const dasharrayFilled = document.getElementById('dasharray-filled')
const dasharrayUnfilled = document.getElementById('dasharray-unfilled')
const polyLine = document.getElementById('demo2Polyline')

strokeColorPicker.addEventListener('change', (e) => {
  polyLine.setAttribute('stroke', e.target.value)
})
strokeWidth.addEventListener('input', (e) => {
  polyLine.setAttribute('stroke-width', e.target.value)
})
linecaps.forEach(e => e.addEventListener('change', (e) => {
  polyLine.setAttribute('stroke-linecap', e.target.value)
}))
linejoins.forEach(e => e.addEventListener('change', (e) => {
  polyLine.setAttribute('stroke-linejoin', e.target.value)
}))
dasharrayFilled.addEventListener('input', e => {
  const oldValue = polyLine.getAttribute('stroke-dasharray')
  const oldUnfilled = oldValue.split(',')[1]
  polyLine.setAttribute('stroke-dasharray', `${e.target.value},${oldUnfilled}`)
})
dasharrayUnfilled.addEventListener('input', e => {
  const oldValue = polyLine.getAttribute('stroke-dasharray')
  const oldFilled = oldValue.split(',')[0]
  polyLine.setAttribute('stroke-dasharray', `${oldFilled},${e.target.value}`)
})

