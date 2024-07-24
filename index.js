const express = require('express')
var cors = require('cors')
const connectToMongo = require('./db')

connectToMongo()
const app = express()
app.use(cors())        //used to establish a secure connection bw frontend and expresss
const port = process.env.PORT || 3003
app.use(cors({
  origin: 'https://i-notebook-frontend-nine.vercel.app'
}));

app.use(express.json())
app.use('/v1/auth', require('./routes/auth'))
app.use('/v1/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`i-Notebook app listening on port ${port}`)
})