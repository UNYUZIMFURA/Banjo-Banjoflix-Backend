const express = require('express')

const router = express.Router()

const {
    handle_Homepage,
    handleSignup_1,
    handlePlan,
    start_Membership
} = require('../controllers/controllers')

router
    .route('/rw')
    .post(handle_Homepage)

router
    .route('/signup/password')
    .post(handleSignup_1)


router
    .route('/signup/planform')
    .post(handlePlan)

router 
    .route('/signup/registration')

router
    .route('/signup/regform')
    .post(start_Membership)
