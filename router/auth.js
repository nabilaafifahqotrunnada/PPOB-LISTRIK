const express = require("express")
const app = express()
const jwt = require("jsonwebtoken") 
const md5 = require("md5")

const admin = require("../models/index").admin
const pelanggan = require("../models/index").pelanggan
app.use(express.urlencoded({extended: true}))

app.post("/login", async (req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await admin.findOne({where: param})
    if(result === null){
        res.json({
            message: "Wrong Username or Password"
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "2h"
        }

        let payload = {data: result}
        let secretKey = "ilistrik"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
}) 

app.post("/loginpelanggan", async (req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await pelanggan.findOne({where: param})
    if(result === null){
        res.json({
            message: "Wrong Username or Password"
        })
    }else{

        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "2h"
        }

        let payload = {data: result}
        let secretKey = "pelanggan"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
}) 
module.exports = app