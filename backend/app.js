const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const Post = require('./models/post')

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
    'GET, POST, PATCH, DELETE, OPTIONS')
  next()
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: `Post added successfully.`,
      postId: createdPost._id
    })
  })
  
}) 

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
      console.log(documents)
      res.status(200).json({
        message: 'Posts feteched successfully!',
        posts: documents
      })
    })
    .catch(err => console.error(err))
  
})

app.delete('/api/posts/:id', (req, res, next) => {
  const postId = req.params.id
  Post.deleteOne({_id: postId}).then(result => {
    console.log(result)
    res.status(200).json({ message: `Post deleted from db successfully!`})
  })
  
})

module.exports = app