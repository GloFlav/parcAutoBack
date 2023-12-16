"use strict";
const Voitures = require("../models/voiture.model");


module.exports.getAllVoiture = (req, res) => { //get
    Voitures.getAllVoiture((err, resp) => {
        res.send(resp)
    })
}

module.exports.getVoitureLibre = (req, res) => { //get
    Voitures.getVoitureLibre(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMatricule = (req, res) => { //get
    Voitures.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Voitures.getByImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}


module.exports.getByIdModele = (req, res) => { //get
    Voitures.getByIdModele(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdMarque = (req, res) => { //get
    Voitures.getByIdMarque(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByStatus = (req, res) => { //get
    Voitures.getByStatus(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addVoiture = (req, res) => { //post
    const { immatricule, status, couleur, matricule, photoVoiture, kilometrage, dateAquisition, idModele } = req.body;
    const newVoiture = {
        immatricule, status, couleur, matricule, photoVoiture, kilometrage, dateAquisition, idModele
    }
    Voitures.addVoiture(newVoiture, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateVoiture = (req, res) => { //put
    const { immatricule, status, couleur, matricule, photoVoiture, kilometrage, dateAquisition, idModele } = req.body;
    const newVoiture = {
        immatricule, status, couleur, matricule, photoVoiture, kilometrage, dateAquisition, idModele
    }
    Voitures.updateVoiture(newVoiture, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteVoiture = (req, res) => {  //put
    Voitures.deleteVoiture(req.params.id, (err, resp) => {
        res.send(resp)
    })
}