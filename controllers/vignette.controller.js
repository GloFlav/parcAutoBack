"use strict";
const Vignettes = require("../models/vignette.model");


module.exports.getAllVignette = (req, res) => { //get
    Vignettes.getAllUnite((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Vignettes.getByImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getActuelleVignette = (req, res) => { //get
    Vignettes.getActuelleVignette(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addVignette = (req, res) => { //post
    const { idUnite, appelation, codePostal } = req.body;
    const newUnite = {
        idUnite, appelation, codePostal
    }
    Vignettes.addVignette(newUnite, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateVignette = (req, res) => { //put
    const { idUnite, appelation, codePostal } = req.body;
    const newUnite = {
        idUnite, appelation, codePostal
    }
    Vignettes.updateUnite(newUnite, req.params.id, (err, resp) => {
        res.send(resp)
    })
}