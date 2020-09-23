const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp= require('sharp')
// For resourse creation we are going to use post
// Here testing is done through postman
router.post("/users", async (req, res) => {
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
    const token = await user.generateAuthToken()
    res.status(201).send({user,token});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login',async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user,token})
  } catch (error) {
    res.status(400).send()
  }
});

// route for logout
router.post('/users/logout', auth,async (req,res) => {
  try {
    req.user.tokens= req.user.tokens.filter((token) =>{
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send();
  }
})

router.post('/users/logoutAll', auth,async (req,res) => {
  try {
    req.user.tokens= []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send();
  }
})

// fetching all the documents
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
});

//fetching document by ID and the route is going to be dynamic and the parameters are known as route parameters
// Id will be fetched by route handler
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     console.log(user);
//     if (!user) {
//       return res.status(404).send(user);
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({ error: " Invalid updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    //will not use . notation because we want set a dynamic index)
    // object will be updated from body
    // returns new user as a post to the existing user that was found before the update
    // Conditions for update
    // 1. The update went well and
    // 2. the update went poorly
    // 3. There is no user to update with that id
    res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/users/me", auth,async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});
const upload = multer({
  //dest:`avatar`,
  limits:{
    fileSize:1000000,
  },fileFilter(req,file,cb){
    if(!(file.originalname.match(/\.(png|jpg|jpeg)$/))){
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined,true)
  }
})

router.post("/users/me/avatar", auth, upload.single('avatar'), async (req, res)=>{
  const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
  req.user.avatar = buffer
  //req.user.avatar = req.file.buffer
  await req.user.save()
  res.send()
},(error, req,res,next)=>{
  res.status(400).send({Error: error.message});
})
/**problem
 * the route handler does not get access the file data that is uploaded that is
 * because multer runs first saving file to avatar directory
 */

router.delete('/users/me/avatar',auth, async(req,res) => {
  req.user.avatar = undefined;
  await req.user.save()
  res.send()
})

router.get('/users/:id/avatar',async(req, res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user || !user.avatar){
      throw new Error()
    }

    res.set('Content-Type','image/png')
    res.send(user.avatar)
  } catch (error) {
    res.status(404).send()
  }
})
module.exports = router;
