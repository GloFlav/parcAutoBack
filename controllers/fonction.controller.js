"use strict";
const Fonctions = require("../models/fonction.model");


module.exports.getAllFonction = (req, res) => { //get
    Fonctions.getAllFonction((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdUnite = (req, res) => { //get
    Fonctions.getByIdUnite(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdFonction = (req, res) => { //get
    Fonctions.getFonction(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addFonction = (req, res) => { //post
    const { idFonction, roles, rang, idUnite } = req.body;
    const newFonction = {
        idFonction, roles, rang, idUnite
    }
    Fonctions.addFonction(newFonction, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateFonction = (req, res) => { //put
    const { idFonction, roles, rang, idUnite } = req.body;
    const newFonction = {
        idFonction, roles, rang, idUnite
    }
    Fonctions.updateFonction(newFonction, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteFonction = (req, res) => {  //put
    Fonctions.deleteFonction(req.params.id, (err, resp) => {
        res.send(resp)
    })
}