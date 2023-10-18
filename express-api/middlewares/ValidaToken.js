const jsonwebtoken = require("jsonwebtoken")

const ValidaToken = (req, res, next) => {
    try{
        const BearerToken = req.header("Authorization")

        const token = BearerToken.replace('Bearer ', '')

        const payload = jsonwebtoken.verify(token, process.env.APP_KEY)

        next()
    }catch(err){
        return res.status(401).send("Token invalido!")
    }
}

module.exports = ValidaToken