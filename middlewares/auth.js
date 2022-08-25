const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req,res) => {
    let token
     
    req.cookies.token ? token = req.cookies.token : null

    if (!token) {
        console.log('Token Required Route!')
        res.redirect('/login')
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decoded.id)
    } catch (err) {
        console.log(err)
        console.log('Not authorized to access this route!')
    }
}

