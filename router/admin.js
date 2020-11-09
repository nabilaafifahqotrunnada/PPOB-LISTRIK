const express = require("express")
const app = express()
const md5 = require("md5")
const admin = require("../models/index").admin
app.use(express.urlencoded({extended:true}))
const verifytoken = require("./verifytoken")
app.use(verifytoken)
app.get("/", async(req, res) => {
    admin.findAll({
        include : ["level"]
    })
    .then(result => {
        res.json({
            data : result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.post("/", async(req, res) => {
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_admin : req.body.nama_admin,
        id_level : req.body.id_level
    }
    admin.create(data)
    .then(result => {
        res.json({
            message : "data added"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.put("/", async(req, res) => {
    let param = {
        id_admin : req.body.id_admin
    }
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_admin : req.body.nama_admin,
        id_level : req.body.id_level
    }
    admin.update(data , {where:param})
    .then(result => {
        res.json({
            message : "data changed"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.delete("/:id", async(req, res) => {
    let param = {
        id_admin : req.params.id
    }
    admin.destroy({where:param})
    .then(result => {
        res.json({
            message : "data deleted"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})
module.exports = app