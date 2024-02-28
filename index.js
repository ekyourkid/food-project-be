const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = 3000;
const recipeRouter = require("./src/router/index");
const userRouter = require("./src/router/index");

const corsOption = {
    origin: "*",
    optionSuccessStatus: 200,
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.send("hello eky");
});

app.use(recipeRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(
        `The app listening on port ${port}, open in http://localhost:${port}`
    );
});
