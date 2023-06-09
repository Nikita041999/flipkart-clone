const express = require('express')
const router = express.Router();
const {signup,signin,requireSignIn,profile} = require('../controllers/auth')

router.post('/signup',signup)

router.post('/signin',signin)
router.post('/profile',requireSignIn,profile)

module.exports = router