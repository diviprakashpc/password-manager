import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import encrypt from "mongoose-encryption"
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/userLogin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

//Schema
const itemSchema = new mongoose.Schema({
  email:String,
  username:String,
  password:String,
})

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  data:itemSchema,
  password: String,
});

userSchema.plugin(encrypt, { encryptionKey: process.env.SECRET,signingKey: process.env.SECRET2 ,encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);
const Item = new mongoose.model("Item",itemSchema)
//Routes

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Succesfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, foundUser) => {
    if (foundUser) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Succesfully Regsitered" });
        }
      });
    }
  });
});

app.post("/addcard",(req,res)=>{
    
})


// --------------------------------------------------------------------------------------------------------------------

app.get("/manager",(req,res)=>{
  res.send("<h1>Manager</h1>")
})

app.listen(9002, () => {
  console.log("Server started at porst 9002");
});
