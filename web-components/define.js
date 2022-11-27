export function define(classDefinition) {
  if (classDefinition.defaultTagName) {
    customElements.define(classDefinition.defaultTagName, classDefinition)
  }
}