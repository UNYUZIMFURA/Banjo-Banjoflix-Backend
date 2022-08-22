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
            type: String,
            required: [true, 'Add a password!']
        },

        plan: {
            type: String,
            required: [true, 'Select a plan!'],
        }
    }
)

module.exports = mongoose.model('user', UserSchema)