const express = require("express")
const app = express()
const penggunaan = require("../models/index").penggunaan
app.use(express.urlencoded({extended:true}))
const verifytoken = require("./verifytoken")
app.use(verifytoken)
app.get("/", async(req,res) => {
    penggunaan.findAll({
        include : ["pelanggan"]
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
        id_pelanggan : req.body.id_pelanggan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        meter_awal : req.body.meter_awal,
        meter_akhir : req.body.meter_akhir
    }
    penggunaan.create(data)
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
        id_penggunaan : req.body.id_penggunaan
    }
    let data = {
        id_pelanggan : req.body.id_pelanggan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        meter_awal : req.body.meter_awal,
        meter_akhir : req.body.meter_akhir
    }
    penggunaan.update(data , {where:param})
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
        id_penggunaan : req.params.id
    }
    penggunaan.destroy({where:param})
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