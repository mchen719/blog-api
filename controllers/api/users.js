require('dotenv').config()
const User = require(../../models/user)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        
        if(!user) throw new Error('Bad Credentials!')

        req.user = user 

        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.post('/', userCtrl.createUser)
const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)

        res.locals.data.user = user 
        res.locals.data.token = token

        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.post('/login', userCtrl.login)
const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne ({ email: req.body.email })
        if (!user) throw new Error ('user not found, email invaild')

        const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex').split('').reverse().join('')
        const match = await bcrypt.compare(password, user.password)
        
        if(!match) throw new Error('Password Not Vaild')

        res.locals.data.user = user
        res.locals.data.token = createJWT(user)

        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// router.put('/:id', userCtrl.auth, userCtrl.updateUser)
const updateUser = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        //potential problem with update 
        res.locals.data.user = user 
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)
const deleteUser = async (req, res, next) => {
    try {
        await req.user.deleteOne()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const respondWithToken = (req, res) => {
    res.json(res.locals.data.token)
}

const respondwithUser = (req, res) => {
    res.json(res.locals.data.user)
}

module.exports = {
    auth, 
    createUser, 
    loginUser,
    updateUser,
    deleteUser,
    respondWithToken,
    respondwithUser
}

function createJWT(user) {
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '48h'})
}