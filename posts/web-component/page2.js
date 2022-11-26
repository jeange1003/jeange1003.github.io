class EncapsulatedComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const div = document.createElement('div')
    div.id = 'rect'
    this.shadow.appendChild(div)
    const style = document.createElement('style')
    style.textContent = `
      #rect {
        background-color: red;
        width: 100px;
        height: 100px;
      }
    `
    this.shadow.appendChild(style)
  }
}

customElements.define('encapsulated-component', EncapsulatedComponent)