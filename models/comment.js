const { model, Schema } = require('mongoose')

const commentSchema = new Schema ({
    title: { required: true, type: String },
    message: { required: true, type: String },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema)

module.exports = Comment