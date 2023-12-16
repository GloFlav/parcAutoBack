"use strict";
const Degats = require("../models/degat.model");


module.exports.getAllDegat = (req, res) => { //get
    Degats.getAllDegat((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByCodeDegat = (req, res) => { //get
    Degats.getByCodeDegat(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addDegat = (req, res) => { //post
    const { typeDegat, description, consequence } = req.body;
    const newDegat = {
        typeDegat, description, consequence
    }
    Degats.addDegat(newDegat, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateDegat = (req, res) => { //put
    const { typeDegat, description, consequence } = req.body;
    const newDegat = {
        typeDegat, description, consequence
    }
    Degats.updateDegat(newDegat, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteDegat = (req, res) => {  //delete
    Degats.deleteDegat(req.params.id, (err, resp) => {
        res.send(resp)
    })
}