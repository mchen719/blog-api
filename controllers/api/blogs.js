const Blog = require('../../models/blog')


// router.get('/', userCtrl.auth, blogsCtrl.indexBlogs)

const indexBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.locals.data.blogs = blogs
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.post('/', userCtrl.auth, blogsCtrl.createBlog)

const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.get('/:id', userCtrl.auth, blogsCtrl.showBlog)

const showBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.put('/:id', userCtrl.auth, blogsCtrl.updateBlog)

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.delete('/:id', userCtrl.auth, blogsCtrl.deleteBlog)

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        res.locals.data.blog = blog 
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    indexBlogs,
    createBlog, 
    showBlog, 
    updateBlog, 
    deleteBlog
}