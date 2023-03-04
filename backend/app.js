const express = require('express')

const app = express()

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