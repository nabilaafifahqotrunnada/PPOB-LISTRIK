const express = require("express")
const app = express()
const tarif = require("../models/index").tarif
app.use(express.urlencoded({extended:true}))
const verifytoken = require("./verifytoken")
app.use(verifytoken)
app.get("/", async(req, res) => {
    tarif.findAll()
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
        daya : req.body.daya,
        tarifperkwh : req.body.tarifperkwh
    }
    tarif.create(data)
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
        id_tarif : req.body.id_tarif
    }
    let data = {
        daya : req.body.daya,
        tarifperkwh : req.body.tarifperkwh
    }
    tarif.update(data, {where:param})
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
        id_tarif : req.params.id
    }
    tarif.destroy({where:param})
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