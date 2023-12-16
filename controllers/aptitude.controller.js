"use strict";
const Aptitudes = require("../models/aptitude.model");


module.exports.getAllAptitude = (req, res) => { //get
    Aptitudes.getAllAptitude((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMatricule = (req, res) => { //get
    Aptitudes.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdAptitude = (req, res) => { //get
    Aptitudes.getByIdAptitude(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addAptitude = (req, res) => { //post
    const { categorie, matricule } = req.body;
    const newAptitude = {
        categorie, matricule
    }
    Aptitudes.addAptitude(newAptitude, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateAptitude = (req, res) => { //put
    const { idAptitude, categorie, matricule } = req.body;
    const newAptitude = {
        idAptitude, categorie, matricule
    }
    Aptitudes.updateAptitude(newAptitude, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteAptitude = (req, res) => {  //delete
    Aptitudes.deleteAptitude(req.params.id, (err, resp) => {
        res.send(resp)
    })
}