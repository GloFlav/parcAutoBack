"use strict";
const Produits = require("../models/produit.model");


module.exports.getAllProduit = (req, res) => { //get
    Produits.getAllProduit((err, resp) => {
        res.send(resp)
    })
}

module.exports.searchProduit = (req, res) => { //get
    Produits.searchProduit(req.params.valeur, (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    });
}

module.exports.getByCodeImmatricule = (req, res) => { //get
    Produits.getByCodeImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}


module.exports.addProduit = (req, res) => { //post
    const { codeImmatricule, nomProduit, unite, quantiteCumulee, quantiteActuelle, quantiteSeuille, quantieMauvaisEtat } = req.body;
    const newProduit = {
        codeImmatricule, nomProduit, unite, quantiteCumulee, quantiteActuelle, quantiteSeuille, quantieMauvaisEtat
    }
    Produits.addProduit(newProduit, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateProduit = (req, res) => { //put
    const { codeImmatricule, nomProduit, quantiteCumulee, quantiteActuelle, quantiteSeuille, quantieMauvaisEtat } = req.body;
    const newProduit = {
        codeImmatricule, nomProduit, quantiteCumulee, quantiteActuelle, quantiteSeuille, quantieMauvaisEtat
    }
    Produits.updateAptitude(newProduit, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateEtatProduit = (req, res) => { //put
    const { quantieMauvaisEtat } = req.body;
    const newProduit = {
        quantieMauvaisEtat
    }
    Produits.updateEtatProduit(newProduit, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteProduit = (req, res) => {  //delete
    Produits.deleteProduit(req.params.id, (err, resp) => {
        res.send(resp)
    })
}