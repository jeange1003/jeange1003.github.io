const drawPath = (parameters) => {
  const pathElement = document.getElementById('demo7Path')
  const grayPathElement = document.getElementById('demo7GrayPath')
  const { fromX, fromY, rx, ry, rotation, isLargeArc, sweep, toX, toY } = parameters
  pathElement.setAttribute('d', `M ${fromX} ${fromY} A ${rx} ${ry} ${rotation} ${isLargeArc} ${sweep} ${toX} ${toY}`)
  grayPathElement.setAttribute('d', `M ${fromX} ${fromY} A ${rx} ${ry} ${rotation} ${isLargeArc ? 0 : 1} ${sweep ? 0 : 1} ${toX} ${toY}`)
}

const drawPoints = (fromX, fromY, toX, toY) => {
  const fromPointElement = document.getElementById('demo7FromPoint')
  const toPointElement = document.getElementById('demo7ToPoint')
  fromPointElement.setAttribute('cx', fromX)
  fromPointElement.setAttribute('cy', fromY)
  toPointElement.setAttribute('cx', toX)
  toPointElement.setAttribute('cy', toY)
}

const inPoint = (x1, y1, x2, y2, r) => {
  return (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) < Math.pow(r, 2)
}

document.addEventListener('DOMContentLoaded', () => {
  // [rxEl, ryEl, rotationEl, isLargeArcEl, sweepEl, xEl, yEl]
  const inputElements = ['demo7Rx', 'demo7Ry', 'demo7Rotation', 'demo7IsLargeArc', 'demo7Sweep'].map(id => document.getElementById(id))

  const parameters = {
    fromX: 10,
    fromY: 50,
    rx: 20,
    ry: 30,
    rotation: 0,
    isLargeArc: 0,
    sweep: 0,
    toX: 80,
    toY: 50
  }
  drawPath(parameters)

  inputElements.forEach(el => {
    el.addEventListener('input', (event) => {
      const { target } = event
      if (target.type === 'range') {
        parameters[target.name] = Number(target.value)
      } else if (target.type === 'checkbox') {
        parameters[target.name] = target.checked ? 1 : 0
      }
      drawPath(parameters)
    })
  })

  const svgEl = document.getElementById('demo7')
  let draggingFromPoint = false
  let draggingToPoint = false
  const mouseMoveHandler = (e) => {
    const { offsetX: x, offsetY: y } = e
    if (draggingFromPoint) {
      parameters.fromX = x
      parameters.fromY = y
    } else if (draggingToPoint) {
      parameters.toX = x
      parameters.toY = y
    }
    drawPath(parameters)
    drawPoints(parameters.fromX, parameters.fromY, parameters.toX, parameters.toY)
  }

  const checkDragging = (e) => {
    const { offsetX: x, offsetY: y } = e
    draggingFromPoint = inPoint(x, y, parameters.fromX, parameters.fromY, 3)
    if (draggingFromPoint) {
      draggingToPoint = false
    } else {
      draggingToPoint = inPoint(x, y, parameters.toX, parameters.toY, 3)
    }
  }

  svgEl.addEventListener('mousedown', (e) => {
    checkDragging(e)
    svgEl.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', () => {
      svgEl.removeEventListener('mousemove', mouseMoveHandler)
    })
  })
  svgEl.addEventListener('touchstart', e => {
    console.log('touchstart',e)
    checkDragging(e)
    svgEl.addEventListener('touchmove', mouseMoveHandler)
    document.addEventListener('touchend', () => {
      svgEl.removeEventListener('touchmove', mouseMoveHandler)
    })
  })


})