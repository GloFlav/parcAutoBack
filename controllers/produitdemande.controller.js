"use strict";
const Produitdemandes = require("../models/produitdemande.model");


module.exports.getByNumeroMemorandum = (req, res) => { //get
    Produitdemandes.getByNumeroMemorandum(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addProduitdemande = (req, res) => { //post
    const { idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande } = req.body;
    const newProduitdemande = {
        idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande
    }
    Produitdemandes.addProduitdemande(newProduitdemande, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateProduitdemande = (req, res) => { //put
    const { idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande } = req.body;
    const newProduitdemande = {
        idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande
    }
    Produitdemandes.updateProduitdemandes(newProduitdemande, req.params.id, (err, resp) => {
        res.send(resp)
    })
}