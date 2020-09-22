const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task= require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must a postive Number");
      }
    },
  },
  tokens:[{
      token:{
          type: String,
          required:true,
      }
  }],
  avatar:{
    type:Buffer
  }

},
{
  timestamps:true
});

// virtual property -> Relationship b/w two entities

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON= function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}


userSchema.methods.generateAuthToken = async function () {
  //methods model are accessible on the instances
  const user = this;
  const token = jwt.sign({_id: user._id.toString()},'mynewcourseisthis');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  //statics methods are accessible on models
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login!!");
  }
  return user;
};

//hashing password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next(); // if not provided the page will keep on loading
});
//When we create a mongoose model,we pass in object as the second argument to the model.
// Mongoose converts it into schema object
// for hashing purpose we need to make schema first

userSchema.pre('remove', async function(next){
  const user = this;
  await Task.deleteMany({owner:user._id})
  next();
})
const User = mongoose.model("User", userSchema);

module.exports = User;

//pm statement:
/**Restriction on email:
 * if a person is logged in with a specific registered email so the other person should not resgister with same email
 */
