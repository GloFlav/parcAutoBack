"use strict";
const Modeles = require("../models/modele.model");

module.exports.getAllModele = (req, res) => {
    Modeles.getAllModele((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdModele = (req, res) => {
    Modeles.getByIdModele(req.params.id, (err, resp) => {
        res.send(resp)
    })
}


module.exports.getByIdMarque = (req, res) => {
    Modeles.getByIdMarque(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addModele = (req, res) => {//post
    const {idModele, nomModele, carburant, nombrePlaces, idMarque } = req.body;
    const newModele = {
       idModele, nomModele, carburant, nombrePlaces, idMarque
    }
    Modeles.addMarque(newModele, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateModele = (req, res) => {//put
    const {idModele, nomModele, carburant, nombrePlaces, idMarque } = req.body;
    const newModele = {
       idModele, nomModele, carburant, nombrePlaces, idMarque
    }
    Modeles.updateModele(newModele, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteModele = (req, res) => {//put
    Modeles.deleteModele(req.params.id, (err, resp) => {
        res.send(resp)
    })
}