const jwt = require('jsonwebtoken')
const Models = require('../../models/index')


module.exports = async function(req, res, next){
    const token = req.header('auth-token'); 
    //res.send(token)
    if(!token) return res.status(400).send('dont have token')
   
    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const account = await Models.Account.findOne({ _id: verified._id,})
        if (!account) {
            throw new Error()
        }
        
        next();
    }catch(err){
        res.status(400).send('Not authorized to access this resource')
    }
}