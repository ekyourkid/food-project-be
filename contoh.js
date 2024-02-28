const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

let users = [
    {
        id: 1,
        name: "norman",
    },
    {
        id: 2,
        name: "jackie",
    },
    {
        id: 3,
        name: "michael",
    },
];

app.get("/", (req, res) => {
    return res.send("cobain express");
});

// Create
app.post("/users", (req, res) => {
    let { name } = req.body;
    if (!name || name === "") {
        return res.json({ code: 404, message: "Input Name Invalid" });
    }
    console.log(name);
    let nexId = users.map((item) => item.id).sort((a, b) => b - a)[0] + 1;
    let user = { id: nexId, name };
    users = [...users, user];
    return res.json({ code: 201, message: `Success Create New User ${name}` });
});

// Read
app.get("/users", (req, res) => {
    return res.json(users);
});

// Read detail
app.get("/users/:id", (req, res) => {
    let { id } = req.params;
    let user;
    users.forEach((item) => {
        if (item.id == id) {
            user = item;
        }
    });
    if (!user) {
        return res.json({ code: 404, message: "User not found" });
    }
    return res.json(user);
});

// Update
app.put("/users/:id", (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
    let user;
    users.forEach((item) => {
        if (item.id == id) {
            user = item;
        }
    });
    if (!user) {
        return res.json({ code: 404, message: "User Not Found!" });
    }
    if (!name || name == "") {
        return res.json({ code: 404, message: "User Name invalid!" });
    }
    let newUser = {
        id: parseInt(id),
        name,
    };
    let data = users.filter((item) => item.id != id);
    data = [...data, newUser];
    users = [...data];
    return res.json({
        code: 200,
        message: `Success update user ${id} : ${name}`,
    });
});

// Delete
app.delete("/users/:id", (req, res) => {
    let { id } = req.params;

    // check users
    let user;
    users.forEach((item) => {
        if (item.id == id) {
            user = item;
        }
    });
    if (!user) {
        return res.json({ code: 404, message: "User Not Found" });
    }
    let data = users.filter((item) => item.id != id);
    users = [...data];
    return res.json({
        code: 200,
        message: `Success Delete User with id : ${id}`,
    });
});

app.listen(port, () => {
    console.log(
        `The app listening on port ${port}, open in http://localhost:${port}`
    );
});
