const express = require("express")
const app = express()
const md5 = require("md5")
const pelanggan = require("../models/index").pelanggan
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)
app.get("/", async(req, res) => {
    pelanggan.findAll({
        include : ["tarif"]
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
         nomor_kwh : req.body.nomor_kwh,
         nama_pelanggan : req.body.nama_pelanggan,
         alamat : req.body.alamat,
         id_tarif : req.body.id_tarif
     }
     pelanggan.create(data)
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
        id_pelanggan : req.body.id_pelanggan
    }
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nomor_kwh : req.body.nomor_kwh,
        nama_pelanggan : req.body.nama_pelanggan,
        alamat : req.body.alamat,
        id_tarif : req.body.id_tarif
    }
    pelanggan.update(data, {where:param})
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
        id_pelanggan : req.params.id
    }
    pelanggan.destroy({where:param})
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