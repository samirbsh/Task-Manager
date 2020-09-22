const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,                //The spread syntax “spreads” the array into separate arguments.
    owner: req.user._id
  })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
// GET /tasks?status=false
// For pagination -> limit and skip
// GET /tasks/?limit=10&skip=0(limit is number of data to keep in pages and skip is the page which is to displayed)
// GET /tasks/sortBy=createdAt_asc
router.get("/tasks", auth, async (req, res) => {
  const match ={}
  const sort={}
  if(req.query.status){
    match.status = (req.query.status=== 'true')
  }
  if(req.query.sortBy){
    const parts = req.query.sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc'? -1:1
  }
  try {
    //const task = await Task.find({owner: req.user._id});
     await req.user.populate({
       path:'tasks',
       match,
       options:{
         limit:parseInt(req.query.limit),
         skip:parseInt(req.query.skip),
         sort
       }
     }).execPopulate() 
    res.send(req.user.tasks);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await  Task.findOne({_id,owner:req.user._id})
    if (!task) {
      // ********************
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
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
    const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
    // object will be updated from body
    // returns new user as a post to the existing user that was found before the update
    // Conditions for update
    // 1. The update went well and
    // 2. the update went poorly
    // 3. There is no user to update with that id
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/tasks/:id",auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
