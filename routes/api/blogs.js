const express = require('express')
const router = express.Router()
const blogsCtrl = require('../../controllers/api/blogs')
const userCtrl = require('../../controllers/api/user')

router.get('/', userCtrl.auth, blogsCtrl.indexBlogs)

router.post('/', userCtrl.auth, blogsCtrl.createBlog)

router.get('/:id', userCtrl.auth, blogsCtrl.showBlog)

router.put('/:id', userCtrl.auth, blogsCtrl.updateBlog)

router.delete('/:id', userCtrl.auth, blogsCtrl.deleteBlog)

module.exports = router 