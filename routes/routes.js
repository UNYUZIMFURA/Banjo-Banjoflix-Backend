const express = require('express')
const router = express.Router()
const {protect} = require('../middlewares/auth')

const {
    handle_Homepage,
    handleLogin,
    handleSignup,
} = require('../controllers/controllers')

router
    .route('/rw')
    .post(protect,handle_Homepage)

router
.route('/login')
.post(handleLogin)

router
    .route('/signup/password')
    .post(handleSignup)


module.exports = router