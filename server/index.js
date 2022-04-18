import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
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

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  list: Array,
});

userSchema.plugin(encrypt, {
  encryptionKey: process.env.SECRET,
  signingKey: process.env.SECRET2,
  encryptedFields: ["password"],
});

const User = new mongoose.model("User", userSchema);

//Routes

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password, list } = req.body;
  User.findOne({ email: email }, (err, foundUser) => {
    if (foundUser) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        list,
        password,
      });
      console.log("regsitration user", user);
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

app.post("/additem", (req, res) => {
  const { user, item } = req.body;
  // console.log("user reached at backend", user);
  // console.log("item reached at backend", item);
  User.findOne({ email: user.email }, (err, foundUser) => {
    if (foundUser) {
      const { name, email, password, list } = foundUser;
      // console.log("Found user", foundUser);
      User.updateOne(
        { email: email },
        {
          list: [
            ...list,
            {
              email: `${item["email"]}`,
              website: `${item["website"]}`,
              password: `${item["password"]}`,
            },
          ],
        },
        () => {
          User.findOne({ email: user.email }, (err, foundUser) => {
            if (foundUser) res.send(foundUser);
            else {
              console.log("error while sending response back on add card");
            }
          });
          console.log("found user after update", foundUser);
        }
      );
    } else {
      console.log("error during add item", err);
    }
  });
});

app.post("/saveitem", async (req, res) => {
  const { user, editItem } = req.body;
  const { email, list } = user;
  // console.log("User reached at saveitem", user);
  // console.log("editItem reached at saveitem", editItem);
  const newlist = user.list.slice(0);
  const idx = list.length - editItem.index - 1;
  // console.log("new list at index", newlist[idx]);
  newlist[idx] = {
    email: editItem.email,
    password: editItem.password,
    website: editItem.website,
  };
  // console.log("final user list", newlist); //yha tk shi h code.
  // User.replaceOne(
  //   { email: email },
  //   {
  //     "list":[...newlist]
  //   },
  //   {upsert:true}
  // );
  const newUser = await User.findOne({ email: email });
  newUser.list = newlist;
  await newUser.save();
  // console.log("final user", newUser);
  res.send(newUser);
});



// --------------------------------------------------------------------------------------------------------------------

app.listen(9002, () => {
  console.log("Server started at porst 9002");
});
