"use strict";
const Produitsollicites = require("../models/produitdemande.model");

module.exports.getAllProduitdemande = (req, res) => { //get
    Produitsollicites.getAllProduitdemande((err, resp) => {
        res.send(resp)
    })
}
module.exports.getByNumeroDemandeentreeproduit = (req, res) => { //get
    Produitsollicites.getByNumeroDemandeentreeproduit(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addProduitsollicite = (req, res) => { //post
    const { idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande } = req.body;
    const newProduitdemande = {
        idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande
    }
    Produitsollicites.addProduitsollicite(newProduitdemande, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateProduitsollicite = (req, res) => { //put
    const { idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande } = req.body;
    const newProduitdemande = {
        idProduitDemande, codeImmatricule, numeroMemorandum, quantiteDemande
    }
    Produitsollicites.updateAptitude(newProduitdemande, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
