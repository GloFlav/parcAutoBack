"use strict";
const Deplacements = require("../models/deplacement.model");


module.exports.getAllDeplacement = (req, res) => { //get
    Deplacements.getAllDeplacement((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Deplacements.getByImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByDay = (req, res) => { //get
    Deplacements.getByDay(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addDeplacement = (req, res) => { //post
    const { numeroDeplacement, immatricule, dateHeureDepart, dateHeureArivee, nombrePassagers, jaugeDepart, jaugeArrivee, idItineraire, numeroDemandeVoiture } = req.body;
    const newDeplacement = {
        numeroDeplacement, immatricule, dateHeureDepart, dateHeureArivee, nombrePassagers, jaugeDepart, jaugeArrivee, idItineraire, numeroDemandeVoiture
    }
    Deplacements.addDeplacement(newDeplacement, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateDeplacement = (req, res) => { //put
    const { numeroDeplacement, immatricule, dateHeureDepart, dateHeureArivee, nombrePassagers, jaugeDepart, jaugeArrivee, idItineraire, numeroDemandeVoiture } = req.body;
    const newDeplacement = {
        numeroDeplacement, immatricule, dateHeureDepart, dateHeureArivee, nombrePassagers, jaugeDepart, jaugeArrivee, idItineraire, numeroDemandeVoiture
    }
    Deplacements.updateAptitude(newDeplacement, req.params.id, (err, resp) => {
        res.send(resp)
    })
}