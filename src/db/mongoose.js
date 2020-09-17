const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});




// Creating or Defigning the model

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
// const task = mongoose.model('task',{
//     description:{
//         type: String,
//         required: true,
//         trim:true
//     },
//     status:{
//         type: Boolean,
//         required: false,
//         default: false
//     }
// })
// const me = new task({
//     description:'  Studying         ',
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })