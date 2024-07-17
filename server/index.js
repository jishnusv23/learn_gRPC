import express from "express";
import path from "path";
import client from "./client.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  client.getUsers({}, (err, data) => {
    if (!err) {
      console.log(data);
      res.send(data);
    } else {
      console.error(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  });
});

app.post("/add", (req, res) => {
  let newUSer = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };

  client.addUser(newUSer, (err, data) => {
    if (!err) {
      console.log(data);
      res.json({ success: true, message: "Successfully added " });
    } else {
      res.status(500).json({ success: false, message: "something wrong" });
    }
  });
});

app.put("/update", (req, res) => {
  console.log(req.body);
  const updateUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  client.UpdateName(updateUser, (err, data) => {
    if (!err) {
      console.log(data);
      res.json({ success: true, message: "Successfully updated" });
    } else {
      console.error(err);
      res
        .status(500)
        .json({ success: false, err: "something wrong", error: err });
    }
  });
});

app.listen(5555, () => {
  console.log(`Server is started on port 5555`);
});
