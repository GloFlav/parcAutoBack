"use strict";
const Marques = require("../models/marque.model");

module.exports.getAllMarque = (req, res) => {
    Marques.getAllMarque((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdMarque = (req, res) => {
    Marques.getByIdMarque(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addMarque = (req, res) => {
    const {idMarque, nomMarque, logoMarque } = req.body;
    const newMarque = {
       idMarque, nomMarque, logoMarque
    }
    Marques.addMarque(newMarque, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateMarque = (req, res) => {
    const {idMarque, nomMarque, logoMarque } = req.body;
    const newMarque = {
       idMarque, nomMarque, logoMarque
    }
    Marques.updateMarque(newMarque, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteMarque = (req, res) => {//put
    Marques.deleteMarque(req.params.id, (err, resp) => {
        res.send(resp)
    })
}