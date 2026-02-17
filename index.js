const express = require("express");
const app = express();

app.use(express.json());

let users = [
    {
        att: 95,
        uid: 1,
        total_sub: 14,
        name: "Anisha",
        bonus: 20
    },
    {
        att: 78,
        uid: 1,
        total_sub: 14,
        name: "Hetavi",
        bonus: 17
    },
    {
        att: 89,
        uid: 3,
        total_sub: 14,
        name: "Prashant",
        bonus: 19
    },

    {
        att: 85,
        uid: 4,
        total_sub: 14,
        name: "Priya",
        bonus: 16
    },
    {
        att: 84,
        uid: 5,
        total_sub: 14,
        name: "Anshu",
        bonus: 18
    },
    {
        att: 90,
        uid: 6,
        total_sub: 14,
        name: "Hanuman",
        bonus: 12
    }
];

app.get("/", (req, res) => {
    // console.log("accepted request");
    res.send("Express server is running");
});

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
});

// app.use(express.json());

app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        att: req.body.att,
        total_sub: req.body.total_sub
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});

app.put("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        uid: userId,
        name: req.body.name,
        att: req.body.att,
        total_sub: req.body.total_sub,
        bonus: req.body.bonus
    };

    res.status(200).json({
        message: "User replaced successfully",
        user: users[index]
    });
});


app.patch("/users/:uid", (req, res) => {
    console.log("req")
    const userId = Number(req.params.uid);
    const user = users.find(u => u.uid === userId);

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

app.delete("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.status(204).end();
});

app.listen(3000, () => {
    console.log("Server started on local 3000");
});