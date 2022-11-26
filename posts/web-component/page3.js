class WithSlot extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('template1')
    this.shadow.appendChild(template.content)
  }
}

customElements.define('with-slot', WithSlot)