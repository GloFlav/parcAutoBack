"use strict";
const Piecevoitures = require("../models/piecevoiture.model");


module.exports.getAllPiecevoiture = (req, res) => { //get
    Piecevoitures.getAllPiecevoiture((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Piecevoitures.getByImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByEtat = (req, res) => { //get
    Piecevoitures.getByEtat(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addPiecevoiture = (req, res) => { //post
    const { numeroSeriePiece, etat, kilometrageAjout, kilometrageEstime, valeur,  immatricule, idPiece, idFournisseur } = req.body;
    const newPiecevoiture = {
        numeroSeriePiece, etat, kilometrageAjout, kilometrageEstime, valeur,  immatricule, idPiece, idFournisseur
    }
    Piecevoitures.addPiecevoiture(newPiecevoiture, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updatePiecevoiture = (req, res) => { //put
    const { numeroSeriePiece, etat, kilometrageAjout, kilometrageEstime, valeur,  immatricule, idPiece, idFournisseur } = req.body;
    const newPiecevoiture = {
        numeroSeriePiece, etat, kilometrageAjout, kilometrageEstime, valeur,  immatricule, idPiece, idFournisseur
    }
    Piecevoitures.updatePiecevoiture(newPiecevoiture, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deletePiecevoiture = (req, res) => {  //delete
    Piecevoitures.deletePiecevoiture(req.params.id, (err, resp) => {
        res.send(resp)
    })
}