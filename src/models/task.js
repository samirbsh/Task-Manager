const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
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
},{
    timestamps:true
})

const task = mongoose.model('Task', taskSchema)

module.exports = task