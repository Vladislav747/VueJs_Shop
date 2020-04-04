/**
 * Mocking client-server processing
 */
// const _products = [
//   {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
//   {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
//   {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
// ]
const _products = [
  {
    id: 14,
    title: 'Stripe Rag Rug',
    price: 29.99,
    category: 'decor',
    sale: true,
    img: 'bed.jpg',
    inventory: 20
  },
  {
    id: 15,
    title: 'Rosalie Velvet Bed',
    price: 1820.90,
    category: 'furniture',
    sale: false,
    img: 'bed.jpg',
    inventory: 20
  },
  {
    id: 16,
    title: 'Wire Loop Vanity',
    price: 159.00,
    category: 'furniture',
    sale: true,
    img: 'bed.jpg',
    inventory: 20
  }
]

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}