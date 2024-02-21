const express = require('express')
const router = express.Router()
const userCtrl = require('../../controllers/api/users')

router.post('/', userCtrl.createUser)
router.post('/login', userCtrl.login)
router.put('/:id', userCtrl.auth, userCtrl.updateUser)
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)

module.exports = router