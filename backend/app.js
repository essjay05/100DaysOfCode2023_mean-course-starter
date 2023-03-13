const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const postRoutes = require('./routes/posts')


const app = express()

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PW}@cluster0.h2hnhc2.mongodb.net/node-angular?retryWrites=true&w=majority`)
  .then(() => {
    console.log(`Connected to MongoDB!`)
  })
  .catch((err) => {
    console.log(`Connection to database failed :(`)
    console.error(err)
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
})

app.use('/api/posts', postRoutes)


module.exports = app