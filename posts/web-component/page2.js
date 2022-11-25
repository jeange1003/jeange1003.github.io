class HelloWorld extends HTMLElement {
  constructor() {
    super();
    const newP = document.createElement('p')
    newP.innerText = 'hello world'
    this.appendChild(newP)
  }
}

customElements.define("hello-world", HelloWorld);

class LifecyleCallbackTest extends HTMLElement {
  static get observedAttributes() { return ['color']; }

  constructor() {
    super()
  }
  connectedCallback() {
    const text = 'connectedCallback\r\n'
    console.log(text)
    this.innerText += text
  }
  disconnectedCallback() {
    const text = 'disconnectedCallback\r\n'
    console.log(text)
    this.innerText += text
  }
  adoptedCallback() {
    const text = 'adoptedCallback\r\n'
    console.log(text)
    this.innerText += text
  }
  attributeChangedCallback(name, oldValue, newValue) {
    const text = `attributeChangedCallback, name: ${name}, oldValue: ${oldValue}, newValue: ${newValue}\r\n`
    console.log(text)
    this.innerText += text
    this.style.color = newValue
  }
}

customElements.define("lifecyle-callback-test", LifecyleCallbackTest);

const demo2Add = document.getElementById('demo2Add')
const demo2Remove = document.getElementById('demo2Remove')
const demo2Update = document.getElementById('demo2Update')
const lifecyleCallbackTestElement = document.getElementById('lifecyleCallbackTestElement')
const demo2 = document.getElementById('demo2')

demo2Add.addEventListener('click', () => {
  demo2.appendChild(lifecyleCallbackTestElement)
})
demo2Remove.addEventListener('click', () => {
  demo2.removeChild(lifecyleCallbackTestElement)
})
demo2Update.addEventListener('click', () => {
  lifecyleCallbackTestElement.setAttribute('color', Math.random() > 0.5 ? 'red' : 'blue')
})