const express = require("express");
const router = express.Router();
const Asistencia = require("../models/Asistencia");

router.get('/buscardni/:dni',async (req,res)=>{
    const dni = req.params.dni;
    try {
        const alumnoDB = await Asistencia.find({dni:{$eq:dni}})
        console.log(alumnoDB);
        res.status(200).send(alumnoDB)
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;

