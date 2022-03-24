const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb://your_mongodb_host/your_mongodb")
    .then(db => console.log("MongoDB is ready!"))
    .catch(err => console.error(err))

app.set("port", "your_backend_port")

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/notes", require("./routes/notes"))

app.use(express.static(__dirname + "/public"))

app.listen(app.get("port"), () => {
    console.log("Server using port:", app.get("port"))
})