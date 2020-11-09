const express = require("express")
const app = express()
const md5 = require("md5")
const pelanggan = require("../models/index").pelanggan
app.use(express.urlencoded({extended:true}))

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

module.exports = app