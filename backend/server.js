require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")

connectDB()
const app = express()
app.use(express.json({ extended: true }))
app.use("/api/auth", require("./routes/userAuthRoutes"))
app.use("/api/note", require("./routes/notesRoutes"))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})