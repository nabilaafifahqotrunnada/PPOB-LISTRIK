const express = require("express")
const app = express()
const level = require("../models/index").level
app.use(express.urlencoded({extended:true}))
const verifytoken = require("./verifytoken")
app.use(verifytoken)
app.get("/", async(req, res) => {
    level.findAll()
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

app.post("", async(req, res) => {
    let data = {
        nama_level : req.body.nama_level
    }
    level.create(data)
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
        id_level : req.body.id_level
    }
    let data = {
        nama_level : req.body.nama_level
    }
    level.update(data, {where:param})
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
        id_level : req.params.id
    }
    level.destroy({where:param})
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