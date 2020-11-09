const jwt = require("jsonwebtoken")

verifytoken = (req, res, next) => {
    let headers = req.headers.authorization
    let token = null

    if(headers != null){
        token = headers.split(" ")[1]
    }

    if(token == null){
        res.json({
            message: "prohibited"
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        let secretKey = "ilistrik"

        jwt.verify(token, secretKey, jwtHeader, err => {
            if(err){
                res.json({
                    message: "Wrong or expired Token"
                })
            }else{
                next()
            }
        })
    }
}

module.exports = verifytoken