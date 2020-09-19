// starting point for the website
const express = require("express");
require("./db/mongoose"); // On call mongoose will connect automatically
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 3001;

// data is parsed from json to an object
app.use(express.json());

app.use(userRouter)
app.use(taskRouter)


app.get("*", (req, res) => {
  res.send("<h1>404!</h1>");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

const bcrypt = require('bcrypt');
const myFunctions = async () => {
  const password = 'Red12345'
  const hashedPassword = await bcrypt.hash(password, 8); // Second parameter is number of rounds
  const isMatch = await bcrypt.compare(password,hashedPassword)
}

myFunctions()