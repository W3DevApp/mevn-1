const mongoose = require("mongoose")

const { Schema } = mongoose

const Note = new Schema({
    title: String,
    content: String
})

module.exports = mongoose.model("Notes", Note)