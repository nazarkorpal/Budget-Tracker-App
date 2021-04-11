const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    year: {
        type: "Number"
    },
    month:{
        type: "Number"
    },
    day:{
        type: "Number"
    },
    costs: {type: Object}
})


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
        type: String,
        required: true,
    },
    notes: [{type: notesSchema}]
})
const User = mongoose.model("User", userSchema)
module.exports = User