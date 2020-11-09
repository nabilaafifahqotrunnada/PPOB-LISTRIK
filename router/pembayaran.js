const express = require("express")
const app = express()
const moment = require("moment")
const tarif = require("../models/index").tarif
const tagihan = require("../models/index").tagihan
const pembayaran = require("../models/index").pembayaran
app.use(express.urlencoded({ extended: true }))
const verifytoken = require("./verifytokenpelanggan")
app.use(verifytoken)

const multer = require("multer")
const path = require("path")
const fs = require("fs")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./bukti")
    },
    filename: (req, file, cb) => {
        cb(null, "bukti-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

app.get("/", async (req, res) => {
    pembayaran.findAll({
        include: ["tagihan", "admin"]
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})


app.post("/", upload.single("bukti"), async (req, res) => {
    let id_tarif = {
        id_tarif: req.body.id_tarif
    }
    let id_tagihan = {
        id_tagihan: req.body.id_tagihan
    }
    tagihan.findOne({ where: id_tagihan })
        .then(result => {
            let jumlah_meter = result.jumlah_meter
            tarif.findOne({ where: id_tarif })
                .then(result => {
                    let tarifkwh = result.tarifperkwh
                    let total = jumlah_meter * tarifkwh
                    let data = {
                        id_tagihan: id_tagihan.id_tagihan,
                        tanggal_pembayaran: moment().format('YYYY-MM-DD'),
                        bulan_bayar: req.body.bulan_bayar,
                        biaya_admin: req.body.biaya_admin,
                        total_bayar: total,
                        status: 0,
                        bukti: req.file.filename,
                        id_admin: req.body.id_admin
                    }
                    pembayaran.create(data)
                        .then(result => {
                            let status = result.status
                            status = 1
                            let data2 = {
                                status: status
                            }
                            tagihan.update(data2, { where: id_tagihan })
                        })
                        .then(result => {
                            res.json({
                                message: "data added"
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: error.message
                            })
                        })
                })
                .catch(error => {
                    res.json({
                        message: error.message
                    })
                })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", upload.single("bukti"), async (req, res) => {
    let id_tarif = {
        id_tarif: req.body.id_tarif
    }
    let id_tagihan = {
        id_tagihan: req.body.id_tagihan
    }
    let param = {
        id_pembayaran: req.body.id_pembayaran
    }
    if (req.file) {
        let oldbukti = await pembayaran.findOne({ where: param })
        let oldb = oldbukti.bukti
        let pathFile = path.join(__dirname, "../bukti", oldb)
        fs.unlink(pathFile, error => console.log(error))

    }
    tarif.findOne({ where: id_tarif })
        .then(result => {
            let tarifkwh = result.tarifperkwh
            tagihan.findOne({ where: id_tagihan })
                .then(result => {
                    let jumlah_meter = result.jumlah_meter
                    let total = jumlah_meter * tarifkwh
                    let data = {
                        id_tagihan: id_tagihan.id_tagihan,
                        tanggal_pembayaran: moment().format('YYYY-MM-DD'),
                        bulan_bayar: req.body.bulan_bayar,
                        biaya_admin: req.body.biaya_admin,
                        total_bayar: total,
                        status: 0,
                        bukti: req.file.filename,
                        id_admin: req.body.id_admin
                    }

                    pembayaran.update(data, { where: param })
                        .then(result => {
                            let status = result.status
                            status = 1
                            let data2 = {
                                status: status
                            }
                            tagihan.update(data2, { where: id_tagihan })
                        })
                        .then(result => {
                            res.json({
                                message: "data changed"
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: error.message
                            })
                        })
                })
                .catch(error => {
                    res.json({
                        message: error.message
                    })
                })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", async (req, res) => {
    let param = {
        id_pembayaran: req.params.id
    }
    let id_tagihan = {
        id_tagihan: req.body.id_tagihan
    }
    let oldbukti = await pembayaran.findOne({ where: param })
    let oldb = oldbukti.bukti
    let pathFile = path.join(__dirname, "../bukti", oldb)
    fs.unlink(pathFile, error => console.log(error))
    pembayaran.destroy({ where: param })
        .then(result => {
            res.json({
                message: "data deleted"
            })
        })
        .then(result => {
            let status = result.status
            status = 0
            let data2 = {
                status: status
            }
            tagihan.update(data2, { where: id_tagihan })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app