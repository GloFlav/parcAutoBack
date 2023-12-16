"use strict";
const Pieces = require("../models/piece.model");


module.exports.getAllPiece = (req, res) => { //get
    Pieces.getAllPiece((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdPiece = (req, res) => { //get
    Pieces.getByIdPiece(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addPiece = (req, res) => { //post
    const { idPiece, nomPiece } = req.body;
    const newPiece = {
        idPiece, nomPiece
    }
    Pieces.addOrn(newPiece, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updatePiece = (req, res) => { //put
    const { idPiece, nomPiece } = req.body;
    const newPiece = {
        idPiece, nomPiece
    }
    Pieces.updatePiece(newPiece, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deletePiece = (req, res) => {  //put
    Pieces.deletePiece(req.params.id, (err, resp) => {
        res.send(resp)
    })
}