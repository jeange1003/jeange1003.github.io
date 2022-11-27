export class HtmlSource extends HTMLElement {
  static get observedAttributes() { return ['render']; }
  static get defaultTagName() { return 'gj-html-source' }

  constructor() {
    super()
    const render = this.getAttribute('render') === 'true'
    const slot = document.createElement('slot')
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(slot)
    const pre = document.createElement('pre')
    this.shadow.appendChild(pre)
    let html = ''
    this.childrenClone = [...this.children]
    for (let child of this.childrenClone) {
      html += child.outerHTML
      html += '\r\n'
      if (!render) {
        child.remove()
      }
    }
    html = this.decreaseIndent(html)
    pre.innerText = html
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'render') {
      if (oldValue !== 'true' && newValue === 'true') {
        for (let child of this.childrenClone) {
          this.appendChild(child)
        }
      }
      if (oldValue === 'true' && newValue !== 'true') {
        for (let child of this.childrenClone) {
          child.remove()
        }
      }
    }
  }

  outputHtml({ domId, loggerId }) {
    const dom = document.getElementById(domId)
    const logger = document.getElementById(loggerId)
    logger.innerText = decreaseIndent(dom.outerHTML)
  }

  decreaseIndent(text) {
    const regex = new RegExp('\n( *)[^ ]')
    const match = regex.exec(text)
    if (!match) {
      return text
    }
    const intendLength = match[1].length
    const replaceReg = new RegExp(`\n {${intendLength - 2}}`, 'g')
    return text.replace(replaceReg, '\n')
  }
}

export function define() {
  customElements.define('html-source', HtmlSource)
}
