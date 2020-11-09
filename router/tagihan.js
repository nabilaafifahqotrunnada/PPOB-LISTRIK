const express = require("express")
const app = express()
const tagihan = require("../models/index").tagihan
const penggunaan = require("../models/index").penggunaan
app.use(express.urlencoded({extended:true}))
const verifytoken = require("./verifytoken")
app.use(verifytoken)
app.get("/", async(req, res) => {
    tagihan.findAll({
        include : ["penggunaan"]
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
    let param = {
        id_penggunaan : req.body.id_penggunaan
    }
    penggunaan.findOne({where:param})
    .then(result => {
        let meter_awal = result.meter_awal
        let meter_akhir = result.meter_akhir
        let selisih = meter_akhir - meter_awal
        let data = {
            id_penggunaan : param.id_penggunaan,
            bulan : req.body.bulan,
            tahun : req.body.tahun,
            jumlah_meter : selisih,
            status : 0
        }
        tagihan.create(data)
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
    
    penggunaan.findOne({where:param})
    .then(result => {
        let meter_awal = result.meter_awal
        let meter_akhir = result.meter_akhir
        let selisih = meter_akhir - meter_awal
        let data = {
            id_penggunaan : param.id_penggunaan,
            bulan : req.body.bulan,
            tahun : req.body.tahun,
            jumlah_meter : selisih,
            status : 0
        }
        let param2 = {
            id_tagihan : req.body.id_tagihan
        }
        tagihan.update(data, {where:param2})
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
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.delete("/:id", async(req, res) => {
    let param = {
        id_tagihan : req.params.id
    }
    tagihan.destroy({where:param})
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