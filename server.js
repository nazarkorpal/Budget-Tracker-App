const express = require("express")
const connectDB = require("./backend/config/db")

connectDB()
const app = express()
app.use(express.static("public"))
app.use(express.json({ extended: true }))
app.use("/api/auth", require("./backend/routes/userAuthRoutes"))
app.use("/api/note", require("./backend/routes/notesRoutes"))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})