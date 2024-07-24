const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,       //assosiate a forign key
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: 'gerneral'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Notes = mongoose.model('notes', NotesSchema)

module.exports = Notes