// console.log("server ")
// console.log("prashant is a dobaa")
//4 and 6th line is an import
const express = require("express");

const app = express();
//alt of mongodb
const users = [
  { id: 1, name: "Rishi", role: "student" },
  { id: 2, name: "Samir Sir", role: "mentor" },
  { id: 3, name: "Anisha", role: "student" },
  { id: 4, name: "Prashant", role: "student" }
];
app.get("/", (req, res) => {   //route
  res.send("Express server is running");
});

app.get("/second", (req, res) => {   
  res.send("Express server is running in second(2nd) route");
});
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});
//all routes should be written before app.listen
app.listen(3000, () => {
  console.log("Server started on port 3000");
});