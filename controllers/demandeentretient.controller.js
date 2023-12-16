"use strict";
const Demandeentretients = require("../models/demandeentretient.model");


module.exports.getAllDE = (req, res) => { //get
    Demandeentretients.getAllDE((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Demandeentretients.getByImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addDE = (req, res) => { //post
    const { dateDeclaration, dateConstatation, codeDegat, immatricule } = req.body;
    const newDemandeentretient = {
        dateDeclaration, dateConstatation, codeDegat, immatricule 
    }
    Demandeentretients.addDegat(newDemandeentretient, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateDE = (req, res) => { //put
    const {   dateDeclaration, dateConstatation, codeDegat, immatricule  } = req.body;
    const newDemandeentretient = {
        dateDeclaration, dateConstatation, codeDegat, immatricule 
    }
    Demandeentretients.updateDE(newDemandeentretient, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
