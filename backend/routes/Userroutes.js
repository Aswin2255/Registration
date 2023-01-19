const { register } = require('../registercontroller/Usercontroller')

const router = require('express').Router()
router.post('/register',register)
module.exports = router