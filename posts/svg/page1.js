function outputHtml({ domId, loggerId }) {
  const dom = document.getElementById(domId)
  const logger = document.getElementById(loggerId)
  logger.innerText = decreaseIndent(dom.outerHTML)
}

function decreaseIndent(text) {
  const regex = new RegExp('\n( *)[^ ]')
  const match = regex.exec(text)
  const intendLength = match[1].length
  const replaceReg = new RegExp(`\n {${intendLength - 2}}`, 'g')
  return text.replace(replaceReg, '\n')
}

function initDemo3Scale() {
  const config = [
    {
      id: 'demo3ScaleX',
      attribute: 'x',
      displayElementId: 'demo3ValueX'
    },
    {
      id: 'demo3ScaleY',
      attribute: 'y',
      displayElementId: 'demo3ValueY'
    },
    {
      id: 'demo3ScaleWidth',
      attribute: 'width',
      displayElementId: 'demo3ValueWidth'
    },
    {
      id: 'demo3ScaleHeight',
      attribute: 'height',
      displayElementId: 'demo3ValueHeight'
    }
  ]

  const viewBoxValue = {
    x: 0,
    y: 0,
    width: 150,
    height: 150
  }
  config.forEach((c) => {
    const input = document.getElementById(c.id)
    input.addEventListener('input', (e) => {
      const { value } = e.target
      viewBoxValue[c.attribute] = value
      updateDemo3ViewBox(viewBoxValue)
      displayDemo3Value(value, c.displayElementId)
    })
  })
}

function updateDemo3ViewBox(viewBoxValue) {
  const svgEl = document.getElementById('demo3')
  const { x, y, width, height } = viewBoxValue
  svgEl.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)
}

function displayDemo3Value(value, elementId) {
  const el = document.getElementById(elementId)
  el.innerText = value
}

function openPreserveAspectRatioSetting() {
  const el = document.getElementById('preserveAspectRatioSettingContainer')
  el.style.display = 'block'
}

function initPreserveAspectRatioSetting() {
  const radioEls = document.querySelectorAll('#preserveAspectRatioSettingContainer input[type=radio]')
  const preserveAspectRatioValue = {
    x: 'xMid',
    y: 'YMid',
    meetSlice: 'meet'
  }
  radioEls.forEach(el => {
    el.addEventListener('change', (e) => {
      const { name } = e.target
      switch (name) {
        case 'preserveAspectRatioX':
          preserveAspectRatioValue.x = e.target.value
          break;
        case 'preserveAspectRatioY':
          preserveAspectRatioValue.y = e.target.value
          break;
        case 'preserveAspectRatioMeetSlice':
          preserveAspectRatioValue.meetSlice = e.target.value
          break;
        default:
          break;
      }
      updateDemo3PreserveAspectRatio(preserveAspectRatioValue)
    })
  })
}

function updateDemo3PreserveAspectRatio(preserveAspectRatioValue) {
  const demoEl = document.getElementById('demo3')
  demoEl.setAttribute('preserveAspectRatio',
    `${preserveAspectRatioValue.x}${preserveAspectRatioValue.y} ${preserveAspectRatioValue.meetSlice}`
  )
}