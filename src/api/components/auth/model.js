const mongoose = require("mongoose")

// define user schema
const UserSchema = new mongoose.schema({
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
const User = mongoose.model('user',UserSchema)
module.exports = User