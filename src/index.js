// starting point for the website
const express = require('express');
require('./db/mongoose')    // On call mongoose will connect automatically

const User = require('./models/user')
const Task = require('./models/task')

const app = express();
 const port = process.env.PORT || 3001;

// data is parsed from json to an object
app.use(express.json());

// For resourse creation we are going to use post
// Here testing is done through postman
app.post('/users',(req,res) => {
    // console.log(req.body)                   // The data comes here
    const user = new User(req.body)             //Passing the object to be saved
    user.save().then(() =>{
        res.send(user)
    }).catch((e) =>{
        res.status(400).send(e)
        //res.send(e)
    })
})

app.post('/tasks', (req, res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

app.get('*', (req, res) =>{
    res.send('<h1>404!</h1>')
})

 app.listen(port, () => {
     console.log('Server is listening on port '+port);
 })

