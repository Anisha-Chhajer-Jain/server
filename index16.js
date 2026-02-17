
const express = require("express");
const app = express();
app.use(express.json());

const users = [
    { id: 1, name: "Arjun", role: "student", age: 18 },
    { id: 2, name: "Priyesha", role: "mentor", age: 20 },
    { id: 3, name: "Anisha", role: "student", age: 19 },
    { id: 4, name: "Prashant", role: "student", age: 19 },
    { id: 5, name: "Pritesh", role: "student", age: 20 },
    { id: 6, name: "Hanuman", role: "student", age: 18 }

];

app.get("/", (req, res) => {   //route
    res.send("Express server is running");
});

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

app.post("/users", (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: "Name and role required" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        role
    };

    users.push(newUser);
    res.status(201).json(newUser);
});


// app.put("/users/:userid", (req, res) => {
app.put("/users/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);

    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        id: userId,
        name: req.body.name,
        role: req.body.role,
        age: req.body.age //for post
    };

    //   res.json("user details updated successfully");
    //   res.status(301).json("user details updated successfully");

    res.status(200).json({
        message: "User replaced",
        // user: users[index]
    });
});

app.patch("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.role) user.role = req.body.role;

    res.status(200).json({
        message: "User updated",
        user
    });
});

app.delete("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });

    }
    users.splice(index, 1);

    res.status(200).send("deleted user details");
});

app.delete("/users/name/:name", (req, res) => {
  const userName = req.params.name.toLowerCase();

  const index = users.findIndex(
    u => u.name.toLowerCase() === userName
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(200).json({ message: "User deleted successfully" });
});



app.listen(3000, () => {
    console.log("Server started on port 3000");
});