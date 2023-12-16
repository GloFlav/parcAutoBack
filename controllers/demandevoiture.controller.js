"use strict";
const Demandevoitures = require("../models/demandevoiture.model");


module.exports.getAllDV = (req, res) => { //get
    Demandevoitures.getAllDV((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMatricule = (req, res) => { //get
    Demandevoitures.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addDV = (req, res) => { //post
    const { categorie, matricule } = req.body;
    const newDemandevoitures = {
        categorie, matricule
    }
    Demandevoitures.addDV(newDemandevoitures, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateDV = (req, res) => { //put
    const { numeroDemandeVoiture, matricule, raison, detailRaison, dateHeureUtilisation, dureeUtilisation, validationDemande } = req.body;
    const newDemandevoitures = {
        numeroDemandeVoiture, matricule, raison, detailRaison, dateHeureUtilisation, dureeUtilisation, validationDemande
    }
    Demandevoitures.updateDV(newDemandevoitures, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.validerDV = (req, res) => { //put
    const { validationDV } = req.body;
    const newDemandevoitures = {
        validationDV
    }
    Demandevoitures.validerDV(newDemandevoitures, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
