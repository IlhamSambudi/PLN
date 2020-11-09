const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))
const tarif = require("../models/index").tarif

//GET
app.get("/", (req,res)=> {
    tarif.findAll()
    .then(result=> {
        res.json(result)
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//TAMBAH 
app.post("/", async(req,res)=> {
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
    tarif.create(data)
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }

    let param = {
        id_tarif: req.body.id_tarif
    }

    tarif.update(data, {where:param})
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

app.delete("/:id_tarif", async(req,res)=> {
    let param = {
        id_tarif: req.params.id_tarif
    }

    tarif.destroy({where:param})
    .then(result=> {
        res.json({
            message: "Data deleted!"
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

module.exports = app