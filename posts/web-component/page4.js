import { HtmlSource } from '../../web-components/html-source.js'
import { define } from '../../web-components/define.js'

define(HtmlSource)

const toggleSourceButton = document.getElementById('toggleSourceButton')
const htmlSource = document.getElementById('htmlSource')

toggleSourceButton.addEventListener('click', () => {
  const isTrue = htmlSource.getAttribute('render') === 'true'
  htmlSource.setAttribute('render', isTrue ? 'false' : 'true')
})