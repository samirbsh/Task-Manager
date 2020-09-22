// starting point for the website
require("./db/mongoose"); // On call mongoose will connect automatically
const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 3001;

// data is parsed from json to an object
// app.use((req, res, next) => {
//   //next registers middleware
//   res.status(503).send('site is currently down. Check back soon!')
// })
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.get("*", (req, res) => {
  res.send("<h1>404!</h1>");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

const Task = require('./models/task')
const User = require('./models/user')
const main = async()=>{
  // const task = await Task.findById('5f68486b08334036e47890ea')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)
  try {
    //we will get all task created by that user
    const user = await User.findById('5f68d1736485294350355bd7')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
  } catch (error) {
    console.log(error)
  }
  
}

// main()


// without middleware: new request -> run route handler
//with middleware: new request -> do something -> run route handler