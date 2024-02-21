const { model, Schema } = require('mongoose')

const blogSchema = new Schema ({
    title: { required: true, type: String },
    body: { required: true, type: String },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    timestamps: true
})

const Blog = model('Blog', blogSchema)

module.exports = Blog