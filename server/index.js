const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()

const router = require('./routes/storeRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')

app.use(cors(
    {
        origin: ["https://full-stack-e-commerce-h367.vercel.app"],
        methods: ["POST", "GET", "DELETE"],
        credentials: true
    }
))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/store', router)
app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => console.log('hello world')))
    .catch((err) => console.log(err))
