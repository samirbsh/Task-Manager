const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid');
        }}
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain "password"' )
            }

        }
    },  
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must a postive Number')                   
            }
        }
    }
}); 
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()                  // if not provided the page will keep on loading
})

//When we create a mongoose model,we pass in object as the second argument to the model.
// Mongoose converts it into schema object
// for hashing purpose we need to make schema first
const User = mongoose.model('User',userSchema)

module.exports = User