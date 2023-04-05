const express = require('express')
const router = express.Router()
const {loginUser} = require('../controller/userController')

router.get('/test',(req,res)=>{res.send("Api is working fine")})

router.post('/login',loginUser)

module.exports = router