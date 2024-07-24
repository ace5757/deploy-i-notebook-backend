const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/i-notebook'

const connectToMongo =()=>{
    mongoose.connect(uri).then(()=>console.log("connected to mongo succesfully"))
}

module.exports = connectToMongo