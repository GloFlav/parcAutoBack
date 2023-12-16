"use strict";
const Bonentreeproduits = require("../models/bonentreeproduit.model");



module.exports.addBDE = (req, res) => { //post
    const { dateEntree, quantiteEntree, prixUnitaire, matricule, idProduitSollicite, idFournisseur } = req.body;
    const newBonentreeproduit = {
        dateEntree, quantiteEntree, prixUnitaire, matricule, idProduitSollicite, idFournisseur
    }
    Bonentreeproduits.addBDE(newBonentreeproduit, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getAllBDE = (req, res) => { //get
    Bonentreeproduits.getAllBDE((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMatricule = (req, res) => { //get
    Bonentreeproduits.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdFournisseur = (req, res) => { //get
    Bonentreeproduits.getByIdFournisseur(req.params.id, (err, resp) => {
        res.send(resp)
    })
}


module.exports.getByDEP = (req, res) => { //get
    Bonentreeproduits.getByDEP(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateBDE = (req, res) => { //put
    const { dateEntree, quantiteEntree, prixUnitaire, matricule, idProduitSollicite, idFournisseur } = req.body;
    const newBonentreeproduit = {
        dateEntree, quantiteEntree, prixUnitaire, matricule, idProduitSollicite, idFournisseur
    }
    Bonentreeproduits.updateBDE(newBonentreeproduit, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
