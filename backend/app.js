const express = require('express')
const bodyParser = require('body-parser')

const app = express()

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
  const post = req.body
  console.log('post to api/posts req.body.post is: ')
  console.log(post)
  res.status(201).json({
    message: `Post added successfully.`
  })
}) 

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdfqwer1',
      title: '1st server side post',
      content: 'This is coming from ther server!'
    },
    {
      id: 'poiqerj2a',
      title: '2nd server side post',
      content: 'This is coming from ther server...'
    }
  ]

  res.status(200).json({
    message: 'Posts feteched successfully!',
    posts: posts
  })
})

module.exports = app