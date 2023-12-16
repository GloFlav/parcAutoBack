"use strict";
const Bonsortieproduits = require("../models/bonentreeproduit.model");

//tsy mbola vita

module.exports.addBDS = (req, res) => { //post
    const { dateSortie, quantiteSortie, matricule, idProduitDemande } = req.body;
    const newBonentreeproduit = {
        dateSortie, quantiteSortie, matricule, idProduitDemande
    }
    Bonsortieproduits.addBDE(newBonentreeproduit, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getAllBDS = (req, res) => { //get
    Bonsortieproduits.getAllBDS((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMemorandum = (req, res) => { //get
    Bonsortieproduits.getByMemorandum((err, resp) => {
        res.send(resp)
    })
}

module.exports.updateBDS = (req, res) => { //put
    const { dateSortie, quantiteSortie, matricule, idProduitDemande } = req.body;
    const newBonentreeproduit = {
        dateSortie, quantiteSortie, matricule, idProduitDemande
    }
    Bonsortieproduits.updateBDS(newBonsortieproduit, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
