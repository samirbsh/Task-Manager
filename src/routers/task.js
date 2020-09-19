const express = require("express");
const router = new express.Router()
const Task = require("../models/task");


router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    try {
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  router.get("/tasks", async (req, res) => {
    try {
      const task = await Task.find({});
      res.send(task);
    } catch (error) {
      res.status(400).send();
    }
  });
  
  router.get("/tasks/:id", async (req, res) => {
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
  
  router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "status"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(404).send({ error: " Invalid updates!" });
    }
    try {
      // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      //   new: true,
      //   runValidators: true,
      // });

      const task = await Task.findById(req.params.id)
     updates.forEach((update)=>(task[update] = req.body[update]))
     await task.save()
      
      // object will be updated from body
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
  
  router.delete('/tasks/:id',async (req, res)=>{ 
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
  
module.exports = router