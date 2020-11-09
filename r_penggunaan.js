const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))
const penggunaan = require("../models/index").penggunaan

app.get("/", (req,res)=> {
    penggunaan.findAll({
        include: ["pelanggan"]
    })
    .then(result=> {
        res.json(result)
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//INSERT
app.post("/", async(req,res)=> {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir,
    }
    penggunaan.create(data)
    .then(result => {
        res.json({
            message: "Data inserted!",
            data: result
        })
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//UPDATE 
app.put("/", async(req,res)=> {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir,
    }
    let param = {
        id_penggunaan: req.body.id_penggunaan
    }
    penggunaan.update(data, {where:param})
    .then(result => {
        res.json({
            message: "Data updated!",
            data: result
        })
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//DELETE
app.delete("/:id_penggunaan", async(req,res)=> {
    let param = {
        id_penggunaan: req.params.id_pelanggan,
    }

    penggunaan.destroy({where:param})
    .then(result=> {
        res.json({
            message: "Datan deleted!"
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

module.exports = app