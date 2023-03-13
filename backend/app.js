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
    'GET, POST, PUT, PATCH, DELETE, OPTIONS')
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

// get all
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

// get one post
app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: `Post not found`})
    }
  })
})

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result)
    res.status(200).json({ message: `Update post successful!`})
  })
})

app.delete('/api/posts/:id', (req, res, next) => {
  const postId = req.params.id
  Post.deleteOne({_id: postId}).then(result => {
    console.log(result)
    res.status(200).json({ message: `Post deleted from db successfully!`})
  })
  
})

module.exports = app