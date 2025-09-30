const express = require("express")
const route = require("./routes/route")
const app = express()
const port = 5001
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())
app.use("/", route)

const connection_to_Db = () => {
  mongoose.connect(process.env.MONGO_URI).then(console.log("Db connected"))
}

app.listen(port, () => {
  connection_to_Db()
  console.log("server is running at port " + port)
})
