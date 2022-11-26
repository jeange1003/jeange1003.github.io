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
