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
const upload = multer({ 
  dest:'images',
  limits:{
    fileSize:1000000,
  },
  fileFilter(req,file,cb){
    if(!(file.originalname.match(/\.(doc|docx)$/))){
      return cb(new Error('Please upload a Word Document'))
    }
    cb(undefined,true)
    // cb(new Error('File must be a pdf'))
    // cb(undefined,true)
    // cb(undefined,false)
  }
})
app.post('/upload', upload.single('upload'),(req, res,next) =>{
  res.send()
})

// without middleware: new request -> run route handler
//with middleware: new request -> do something -> run route handler

//Filtering file type
// req -> the request being made
//file->  information about filebeing uploaded
// cb -> tells multer when we are done filtering the file
// regex101