import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import "dotenv/config";
import session from "express-session";
import UserModel from "./database/User.mjs";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);



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

//----------------GET REQUESTS-------------------//

// -----------------Post REQUESTS_---------------------------

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }, (err, user) => {
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
  UserModel.findOne({ email: email }, (err, foundUser) => {
    if (foundUser) {
      res.send({ message: "User already registered" });
    } else {
      const user = new UserModel({
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
  console.log("hello")
  const { user, item } = req.body;
  // console.log("user reached at backend", user);
  // console.log("item reached at backend", item);
  UserModel.findOne({ email: user.email }, (err, foundUser) => {
    if (foundUser) {
      const { name, email, password, list } = foundUser;
      // console.log("Found user", foundUser);
      UserModel.updateOne(
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
          UserModel.findOne({ email: user.email }, (err, foundUser) => {
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
  console.log("reached server saveitem");
  const { user, editItem } = req.body;
  const { email, list } = user;
  console.log("user at save item", user);
  console.log("edit item at /saveitem", editItem);
  const newlist = user.list.slice(0);
  console.log(editItem.itemindex);
  const idx = list.length - editItem.itemindex - 1;

  newlist[idx] = {
    email: editItem.email,
    password: editItem.password,
    website: editItem.website,
  };
  console.log("currentlist", user.list);
  console.log("newlist", newlist);
  const newUser = await UserModel.findOne({ email: email });
  newUser.list = newlist;
  await newUser.save();
  console.log("final user", newUser);
  res.send(newUser);
});

app.post("/deleteItem", async (req, res) => {
  const { user, index } = req.body;

  const newUser = await UserModel.findOne({ email: user.email });
  console.log("index", index);
  const idx = newUser.list.length - 1 - index;
  console.log("idx", idx);
  const newList = newUser.list.slice(0).filter((key, i) => {
    return i != idx;
  });

  newUser.list = newList;
  await newUser.save();

  res.send({ message: "Deleted", newUser: newUser });
});

// --------------------------------------------------------------------------------------------------------------------

app.listen(9002, () => {
  console.log("Server started at port 9002");
});
