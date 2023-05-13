const express = require("express");
const app = express();
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { auth } = require("./middleware/auth");
const { blogRouter } = require("./routes/blog.routes");

app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use(auth);
app.use("/", blogRouter);

app.listen(4040, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running on port 4040");
});
