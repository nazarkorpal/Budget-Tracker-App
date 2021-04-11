const express = require("express")
const router = express.Router()
const  User = require("../models/User")
const auth = require("../middleware/middleware.auth")



// /api/note/load
router.get("/load",auth,
    async (req, res) => {
        try {
            const data = req.query
            const user = await User.findOne({_id: data.id})
            return res.status(200).json(user.notes)
        }catch (error) {
            console.error(error)
        }
    })

// /api/note/load
router.delete("/delete",auth,
    async (req, res) => {
        try {
            const data = req.body.source
           await User.findOneAndUpdate(
               {_id: data.id},
               {$pull: {notes: {_id: data.noteID}}},
               {}
               )




            res.status(200).json({message: "Notes successfully deleted"})
        }catch (error) {
            console.error(error)
        }
    })

router.patch("/patch",
    async (req, res) => {
        try {
            const data = req.body.data
            await User.findOneAndUpdate(
                {_id: data.id, "notes._id": data.noteID},
                {$set: {"notes.$.costs": data.costs}},
                (err, data)=>{
                    if(err){
                        return res.send(err)
                    }
                    else{
                        return res.send(data.notes)
                    }
                }
            )

        }catch (error) {
            console.error(error)
        }
    })

router.post("/create/entry", auth,
    async (req, res) => {
        try {
            const data = req.body
            if(!data.costs.amount || !data.costs.category){
                return res.status(400).json({message: "Something went wrong"})
            }
            User.findOneAndUpdate({_id: data.id}, { $push: {
                    notes: {
                        year: data.year,
                        month: data.month,
                        day: data.day,
                        costs: {
                            amount: data.costs.amount,
                            category: data.costs.category
                        }
                    }
                }
            } , (err, result) => {
                if (err) {
                    return res.send(err);
                } else {
                    return  res.send(result);
                }
            })
        }catch (error) {
            console.error(error)
        }
    })

module.exports = router