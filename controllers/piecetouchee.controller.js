"use strict";
const Piecetouchees = require("../models/piecetouchee.model");


module.exports.getAllPT = (req, res) => { //get
    Piecetouchees.getAllPiece((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Piecetouchees.getByidPiece(req.params.id, (err, resp) => {
        res.send(resp)
    })
}


module.exports.getByNumeroSeriePiece = (req, res) => { //get
    Piecetouchees.getByNumeroSeriePiece(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addPT = (req, res) => { //post
    const { idPiece, nomPiece } = req.body;
    const newPiecetouchee = {
        idPiece, nomPiece
    }
    Piecetouchees.addPT(newPiecetouchee, (err, resp) => {
        res.send(resp)
    })
}
