const demo4Gradient = document.getElementById('demo4Gradient')
const drawDemo4 = () => {

}
Object.entries({
  demo4Cx: 'cx',
  demo4Cy: 'cy',
  demo4Fx: 'fx',
  demo4Fy: 'fy',
  demo4R: 'r'
}).forEach(([id, attr]) => {
  document.getElementById(id).addEventListener('input', e => {
    demo4Gradient.setAttribute(attr, e.target.value)
  })
})
