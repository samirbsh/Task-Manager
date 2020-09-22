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

const multer = require('multer')
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
const upload = multer({ 
  dest:'images'
})
// const upload = multer({ storage: storage })

app.post('/upload', upload.single('upload'),(req, res,next) =>{
  res.send()
})

// without middleware: new request -> run route handler
//with middleware: new request -> do something -> run route handler