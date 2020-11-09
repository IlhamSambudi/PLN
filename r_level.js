const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))
const level = require("../models/index").level

app.get("/", (req,res)=> {
    level.findAll()
    .then(result=> {
        res.json(result)
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})
// LEVEL
app.post("/", async(req,res)=> {
    let data = {
        nama_level: req.body.nama_level,
    }
    level.create(data)
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
        nama_level: req.body.nama_level,
    }

    let param = {
        id_level: req.body.id_level
    }

    level.update(data, {where:param})
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
app.delete("/:id_level", async(req,res)=> {
    let param = {
        id_level: req.params.id_level
    }

    level.destroy({where:param})
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