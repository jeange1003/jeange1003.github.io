window.addEventListener('DOMContentLoaded', () => {
  const dbOpenRequest = indexedDB.open('ecommerce', 1)
  dbOpenRequest.addEventListener('upgradeneeded', (e) => {
    const db = e.target.result
    const objectStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true })
    objectStore.createIndex('name', 'name', { unique: true })
    objectStore.createIndex('price', 'price', { unique: false })
    objectStore.createIndex('store', 'store', { unique: false })
  })

  document.getElementById('addDataButton').addEventListener('click', () => {
    const dbRequest = indexedDB.open('ecommerce', 1)
    dbRequest.addEventListener('success', (e) => {
      const db = e.target.result
      const transaction = db.transaction('products', 'readwrite')
      const objectStore = transaction.objectStore('products')
      const name = document.getElementById('productNameInput').value
      const price = Number(document.getElementById('productPriceInput').value)
      const stock = Number(document.getElementById('productStockInput').value)
      const request = objectStore.add({ name, price, stock })
      request.addEventListener('success', () => {
        console.log('add succeed')
      })
    })
  })

  document.getElementById('getSingleData').addEventListener('click', () => {
    const dbRequest = indexedDB.open('ecommerce', 1)
    dbRequest.addEventListener('success', (e1) => {
      const db = e1.target.result
      const transaction = db.transaction('products', 'readwrite')
      const objectStore = transaction.objectStore('products')
      const singleId = Number(document.getElementById('singleDataId').value)
      const request = objectStore.get(singleId)
      request.addEventListener('success', (e2) => {
        const data = e2.target.result
        console.log('data', data)
      })
    })
  })

  document.getElementById('getAllData').addEventListener('click', () => {
    const dbRequest = indexedDB.open('ecommerce', 1)
    dbRequest.addEventListener('success', (e1) => {
      const db = e1.target.result
      const transaction = db.transaction('products', 'readwrite')
      const objectStore = transaction.objectStore('products')
      const request = objectStore.getAll()
      request.addEventListener('success', (e2) => {
        const data = e2.target.result
        console.log('data', data)
      })
    })
  })

  document.getElementById('searchByCondition').addEventListener('click', () => {
    const lowestPrice = Number(document.getElementById('lowestPrice').value)
    const highestPrice = Number(document.getElementById('highestPrice').value)
    const dbRequest = indexedDB.open('ecommerce', 1)
    dbRequest.addEventListener('success', (e1) => {
      const db = e1.target.result
      const transaction = db.transaction('products', 'readwrite')
      const objectStore = transaction.objectStore('products')
      const priceIndex = objectStore.index('price')
      const range = IDBKeyRange.bound(lowestPrice, highestPrice, false, false)
      const request = priceIndex.getAll(range)
      request.addEventListener('success', (e2) => {
        const data = e2.target.result
        console.log('data', data)
      })
    })
  })
})
