const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')    //middleware to fetch user from token
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//get all notes for logged in user
router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        const user = await Note.find({user: req.user.id})
        res.send(user) 
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }
})

//create a note
router.post('/addnote', fetchuser,  [                                          
    body('title', 'Enter a valid title').isLength({min: 3}),             //2nd string is error msg
    body('description').isLength({min: 5})
 ], async(req, res)=>{
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    try {
        const {title, description, tag} = req.body
        const note = await Note.create({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNotes = await note.save()
        res.send(savedNotes)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }

})

//update a note by id
router.put('/updatenotes/:id', fetchuser, async(req, res)=>{
    try {
        const {title, description, tag} = req.body
        const newNote = {}
        if(title){newNote.title = title}             //if title esists then add it to newNote object
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //find the note to be updated
        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }
        //checking if login user and id of note have same user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})  //if new thing is found, it will be created
        res.send({note})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }

})

//delete a note by id
router.delete('/deletenotes/:id', fetchuser, async(req, res)=>{
    try {
        //find the note to be deleted
        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }
        //checking if login user and id of note have same user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.send({success: "note removed successfully", note})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some errror occured')
    }

})

module.exports = router