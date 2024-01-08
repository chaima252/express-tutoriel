const express = require('express')
const app = express()


app.listen(5000, () => {
    console.log('server is listening on port 5000')
})

const logger  = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    next()
    // res.send('Custom About page')

}

// app.use(logger) //  middleware 
app.use('/api', logger)


app.get('/about', (req, res) => {
    console.log(req.user)

    return res.send('About Page')
})

const auth = (req, res, next) => {
    const user = req.query.user;
    if (user === 'admin') {
        req.user = ({name: "admin", id:1})
        next()
    }else {
        res.status(401).send('unauthorized');
    }

}

app.use(auth)
app.use([logger, auth])

