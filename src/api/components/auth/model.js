const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
// define user schema
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

const User = mongoose.model('user',UserSchema)
module.exports = User