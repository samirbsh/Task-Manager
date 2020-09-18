// starting point for the website
const express = require("express");
require("./db/mongoose"); // On call mongoose will connect automatically

const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3001;

// data is parsed from json to an object
app.use(express.json());

// For resourse creation we are going to use post
// Here testing is done through postman
app.post("/users", async (req, res) => {
  // console.log(req.body)                   // The data comes here
  const user = new User(req.body); //Passing the object to be saved
  // user.save().then(() =>{
  //     res.status(201).send(user)
  // }).catch((e) =>{
  //     res.status(400).send(e)
  //     //res.send(e)
  // })
  //promise comes from user.save
  try {
    await user.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});
// fetching all the documents
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

//fetching document by ID and the route is going to be dynamic and the parameters are known as route parameters
// Id will be fetched by route handler
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({ error: " Invalid updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); // object will be updated from body
    // returns new user as a post to the existing user that was found before the update
    // Conditions for update
    // 1. The update went well and
    // 2. the update went poorly
    // 3. There is no user to update with that id
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.delete('/users/:id',async (req, res)=>{
    
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }

})

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      // ********************
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({ error: " Invalid updates!" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); // object will be updated from body
    // returns new user as a post to the existing user that was found before the update
    // Conditions for update
    // 1. The update went well and
    // 2. the update went poorly
    // 3. There is no user to update with that id
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.delete('/tasks/:id',async (req, res)=>{
    
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }

})

app.get("*", (req, res) => {
  res.send("<h1>404!</h1>");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
