export class Pagination extends HTMLElement {
  static get defaultTagName() { return 'gj-pagination' }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const div = document.createElement('div')
    div.className = 'paging'
    const prevLink = this.getAttribute('prev')
    const nextLink = this.getAttribute('next')
    if (prevLink) {
      const prevAnchor = document.createElement('a')
      prevAnchor.href = prevLink
      prevAnchor.innerText = '上一页'
      div.appendChild(prevAnchor)
    }
    if (nextLink) {
      const nextAnchor = document.createElement('a')
      nextAnchor.href = nextLink
      nextAnchor.innerText = '下一页'
      div.appendChild(nextAnchor)
    }
    const style = document.createElement('style')
    let justifiContent = 'space-between'
    if (prevLink && !nextLink) {
      justifiContent = 'flex-start'
    } else if (!prevLink && nextLink) {
      justifiContent = 'flex-end'
    }
    style.textContent = `
      .paging {
        display: flex;
        justify-content: ${justifiContent};
        margin: 8px 0;
      }
    `
    this.shadowRoot.appendChild(div)
    this.shadowRoot.appendChild(style)
  }
}
