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
        type: String
    },
    email:{
        type: String,
        required:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid');
        }}
    },
    age:{
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('Age must a postive Number')                   
            }
        }
    }
})
// making an instance of it
const me = new User({
    name: 'Samir',
    age:7
})
// saving the model
me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log(error)
})

//Setting Custom Validation
//const task = mongoose.model('task',{
//     description:{
//         type: String
//     },
//     status:{
//         type: Boolean
//     }
// })
// const me = new task({
//     description:'Cleaning the Car',
//     status: 'true'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })