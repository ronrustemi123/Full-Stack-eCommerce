require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const path = require('path')
const {fileURLToPath} = require('url')

const ___filename = path.resolve()


const app = express()

const router = require('./routes/storeRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/store', router)
app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)

app.use(express.static(path.join(___filename, '/client/dist')))

app.get('*',(req, res) => res.sendFile(path.join(___filename, '/client/dist/index.html')))

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => console.log('hello world')))
    .catch((err) => console.log(err))