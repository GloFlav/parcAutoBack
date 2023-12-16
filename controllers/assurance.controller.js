"use strict";
const Assurances = require("../models/assurance.model");


module.exports.getAllAssurance = (req, res) => { //get
    Assurances.getAllAptitude((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByImmatricule = (req, res) => { //get
    Assurances.getByImmatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getActuelleAssurance = (req, res) => { //get
    Assurances.getActuelleAssurance(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addAssurance = (req, res) => { //post
    const { numeroAssurance, dateContrat, dateFinContrat, montantC, agence, immatricule } = req.body;
    const newAssurance = {
        numeroAssurance, dateContrat, dateFinContrat, montantC, agence, immatricule 
    }
    Assurances.addAssurance(newAssurance, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateAssurance = (req, res) => { //put
    const { numeroAssurance, dateContrat, dateFinContrat, montantC, agence, immatricule } = req.body;
    const newAssurance = {
        numeroAssurance, dateContrat, dateFinContrat, montantC, agence, immatricule 
    }
    Assurances.updateAssurance(newAssurance, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
