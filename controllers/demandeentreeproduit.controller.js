"use strict";
const Demandeentreeproduits = require("../models/demandeentreeproduit.model");


module.exports.getAllDEP = (req, res) => { //get
    Demandeentreeproduits.getAllDEP((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMatricule = (req, res) => { //get
    Demandeentreeproduits.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addDEP = (req, res) => { //post
    const { dateDemande, motif, matricule } = req.body;
    const newDemandeentreeproduit = {
        dateDemande, motif, matricule
    }
    Demandeentreeproduits.addDegat(newDemandeentreeproduit, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateDEP = (req, res) => { //put
    const {  dateDemande, motif, matricule } = req.body;
    const newDemandeentreeproduit = {
        dateDemande, motif, matricule
    }
    Demandeentreeproduits.updateDEP(newDemandeentreeproduit, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.validerDEP = (req, res) => {  //put
    Demandeentreeproduits.validerDEP(req.params.id, (err, resp) => {
        res.send(resp)
    })
}