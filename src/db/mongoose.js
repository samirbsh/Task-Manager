const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
// Creating or Defigning the model

const User = mongoose.model('User',{
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
})
// making an instance of it
/*
const me = new User({
    name: '    Samir    ',  
    email:'          MYEMAIL@example.com          ',
    password:'sasad@3434'
})
// saving the model
me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log(error)
})
*/

//Setting Custom Validation
const task = mongoose.model('task',{
    description:{
        type: String,
        required: true,
        trim:true
    },
    status:{
        type: Boolean,
        required: false,
        default: false
    }
})
const me = new task({
    description:'  Studying         ',
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log(error)
})