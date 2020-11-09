const express = require("express")
const app = express()

let tarif = require("./router/tarif")
let pelanggan = require("./router/pelanggan")
let level = require("./router/level")
let admin = require("./router/admin")
let penggunaan = require("./router/penggunaan")
let tagihan = require("./router/tagihan")
let pembayaran = require("./router/pembayaran")
let auth = require("./router/auth")
let register = require("./router/register")

app.use("/tarif", tarif)
app.use("/pelanggan", pelanggan)
app.use("/level", level)
app.use("/admin", admin)
app.use("/penggunaan", penggunaan)
app.use("/tagihan", tagihan)
app.use("/pembayaran", pembayaran)
app.use("/auth", auth)
app.use("/register", register)

app.listen(2810, () => {
    console.log("mlaku ing port 2810");
})