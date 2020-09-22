const mongoose = require('mongoose');
// const validator = require('validator');


const task = mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim:true
    },
    status:{
        type: Boolean,
        required: false,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'    
    }
})

module.exports = task