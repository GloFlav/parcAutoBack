"use strict";
const Unites = require("../models/unite.model");


module.exports.getAllUnite = (req, res) => { //get
    Unites.getAllUnite((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByCodePostal = (req, res) => { //get
    Unites.getByCodePostal(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdUnite = (req, res) => { //get
    Unites.getByIdUnite(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addUnite = (req, res) => { //post
    const { idUnite, appelation, codePostal } = req.body;
    const newUnite = {
        idUnite, appelation, codePostal
    }
    Unites.addUnite(newUnite, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateUnite = (req, res) => { //put
    const { idUnite, appelation, codePostal } = req.body;
    const newUnite = {
        idUnite, appelation, codePostal
    }
    Unites.updateUnite(newUnite, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteUnite = (req, res) => {  //put
    Unites.deleteOrn(req.params.id, (err, resp) => {
        res.send(resp)
    })
}