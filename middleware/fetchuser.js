const jwt = require('jsonwebtoken')

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token')              //token got from header
    if(!token){
        return res.status(401).send({error: 'enter valid auth token'})
    }
    try {
        const data = jwt.verify(token, 'secretkey')
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).send({error: 'enter valid auth token'})
    }

}

module.exports = fetchuser