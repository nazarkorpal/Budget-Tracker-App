const express = require("express")
const connectDB = require("./config/db")
const path = require("path")

connectDB()
const app = express()
app.use(express.json({ extended: true }))
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "frontend", "public", "index.html"))
    }).else
}else {
    app.get("/",(req, res)=>{
        res.send("Api running")
    })
}

app.use("/api/auth", require("./routes/userAuthRoutes"))
app.use("/api/note", require("./routes/notesRoutes"))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})