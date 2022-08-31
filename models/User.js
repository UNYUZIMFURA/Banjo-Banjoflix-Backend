const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Add an email!'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email!'
            ]
        },

        password: {
            maxlength: [30, "Password can't exceed 30 characters"],
            type: String,
            required: [true, 'Add a password!']
        },
    }
)

UserSchema.methods.getToken = () => {
return jwt.sign({
    id: this._id
},
process.env.SECRET_KEY,
{
    expiresIn: process.env.JWT_EXPIRES
}
)
}

module.exports = mongoose.model('User', UserSchema)