"use strict";
const Itineraires = require("../models/itineraire.model");

module.exports.getAllItineraire = (req, res) => {
    Itineraires.getAllItineraire((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdItineraire = (req, res) => {
    Itineraires.getByIdItineraire(req.params.id, (err, resp) => {
        res.send(resp)
    })
};

module.exports.addItineraire = (req, res) => {
    const {idItineraire, depart, arrivee, distanceEstimee } = req.body;
    const newItineraire = {
       idItineraire, depart, arrivee, distanceEstimee
    }
    Itineraires.addItineraire(newItineraire, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateItineraire = (req, res) => {
    const {idItineraire, depart, arrivee, distanceEstimee } = req.body;
    const newItineraire = {
       idItineraire, depart, arrivee, distanceEstimee
    }
    Itineraires.updateItineraire(newItineraire, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

// module.exports.deleteItineraire= (req, res) => {//put
//     Itineraires.deleteItineraire(req.params.id, (err, resp) => {
//         res.send(resp)
//     })
// }