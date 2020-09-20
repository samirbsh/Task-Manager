// starting point for the website
const express = require("express");
const jwt = require('jsonwebtoken');
require("./db/mongoose"); // On call mongoose will connect automatically
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



const myFunctions = async () => {
  //Data that will be embedded in our token
  //second argument (secret) this is used to sign the token making sure that it is
  //not tampered or altered in any way
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkd2RldyIsImlhdCI6MTYwMDU4NDgyMH0.p8dmmSwS4IDXs3ZhCgJRbJuC_XLDwtVDvijcw75ka-Y
  //header(type of token and algorithm used to generate) + payload(body) + signature(for verification) 
  const token = jwt.sign({_id:'dwdew'},'newSecretkey',{expiresIn:'7 days'})
  const data = jwt.verify(token,'newSecretkey')
  console.log(data)
}

myFunctions()

// without middleware: new request -> run route handler
//with middleware: new request -> do something -> run route handler