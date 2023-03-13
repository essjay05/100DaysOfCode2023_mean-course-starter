const express = require('express')
const Post = require('../models/post')
const multer = require('multer')

const router = express.Router()

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error('Invalid mime type')
    if (isValid) {
      error = null
    }
    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    cb(null, `${name}-${Date.now()}.${ext}` )
  }
})

// Create post endpoint
router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
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

// READ/get all posts endpoint
router.get('', (req, res, next) => {
  Post.find().then(documents => {
      console.log(documents)
      res.status(200).json({
        message: 'Posts feteched successfully!',
        posts: documents
      })
    })
    .catch(err => console.error(err))
})

// READ/get one post
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: `Post not found`})
    }
  })
})

// Update one post
router.put('/:id', (req, res, next) => {
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

// Delete one post
router.delete('/:id', (req, res, next) => {
  const postId = req.params.id
  Post.deleteOne({_id: postId}).then(result => {
    console.log(result)
    res.status(200).json({ message: `Post deleted from db successfully!`})
  })
  
})

module.exports = router;