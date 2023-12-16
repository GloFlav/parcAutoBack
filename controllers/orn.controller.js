"use strict";
const Orns = require("../models/orn.model");


module.exports.getAllOrn = (req, res) => { //get
    Orns.getAllOrn((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByCodePostal = (req, res) => { //get
    Orns.getByCodePostal(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

// module.exports.getChauffeurOrn = (req, res) => { //get
//     Orns.getChauffeurOrn(req.params.id, (err, resp) => {
//         res.send(resp)
//     })
// }

module.exports.addOrn = (req, res) => { //post
    const { codePostal, nomRegion, coordonnees } = req.body;
    const newOrn = {
        codePostal, nomRegion, coordonnees
    }
    Orns.addOrn(newOrn, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateOrn = (req, res) => { //put
    const { codePostal, nomRegion, coordonnees } = req.body;
    const newOrn = {
        codePostal, nomRegion, coordonnees
    }
    Orns.updateOrn(newOrn, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteOrn = (req, res) => {  //put
    Orns.deleteOrn(req.params.id, (err, resp) => {
        res.send(resp)
    })
}