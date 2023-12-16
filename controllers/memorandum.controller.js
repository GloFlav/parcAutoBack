"use strict";
const Memorandums = require("../models/memorandum.model");


module.exports.getAllMemorandum = (req, res) => { //get
    Memorandums.getAllMemorandum((err, resp) => {
        res.send(resp)
    })
}

module.exports.getMemorandumMonth = (req, res) => { //get
    Memorandums.getMemorandumMonth(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByUnite = (req, res) => { //get
    Memorandums.getByUnite(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMatricule = (req, res) => { //get
    Memorandums.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addMemorandum = (req, res) => { //post
    const {  objet, matricule, destinataires } = req.body;
    const newMemorandum = {
         objet, matricule, destinataires
    }
    Memorandums.addMemorandum(newMemorandum, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateMemorandum = (req, res) => { //put
    const { numeroMemorandum, dateEnvoie, dateReception, validationChef, validationLog, objet, matricule, destinataires } = req.body;
    const newMemorandum = {
        numeroMemorandum, dateEnvoie, dateReception, validationChef, validationLog, objet, matricule, destinataires
    }
    Memorandums.updateMemorandum(newMemorandum, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.validerChefMemorandum = (req, res) => {  //put
    Memorandums.validerChefMemorandum(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.validerLogMemorandum = (req, res) => {  //put
    Memorandums.validerLogMemorandum(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getSommeMemo = (req, res) => { //get
    Memorandums.getSommeMemo((err, resp) => {
        res.send(resp)
    })
}