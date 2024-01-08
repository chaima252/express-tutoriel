const express = require('express')
const app = express()
const products = require('./data.js')

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})

app.get('/api/products', (req, res) => {
    res.json(products)
});


app.get('/api/products', (req, res) => {
    const partial_products = products.map(product => {
        return { id: product.id, name: product.name }
    })
    res.json(partial_products)
});

app.get('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)
    res.json(product)
});

app.get('/api/query', (req, res) => {
    const name = req.query.name.toLowerCase()
    const products_result = products.filter(product => product.name.toLowerCase().includes(name))

    if (products_result.length < 1) {
        return res.status(200).send('No products matched your search')
    }
    res.json(products_result)
})