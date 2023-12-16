var dbConn = require("../config/db.config");
var employe = require('./employe.model');

var Piecetouchees = function (piecetouchee) {
    this.idPT = piecetouchee.idPT;
    this.numeroSeriePiece = piecetouchee.numeroSeriePiece;
    this.idDE = piecetouchee.idDE;
    this.codeDegat = piecetouchee.codeDegat;
    this.immatricule = piecetouchee.immatricule;
};


Piecetouchees.addPE = function (newPiecetouchee, result) {
    dbConn.query("insert into piecetouchee set ?", newPiecetouchee, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
    dbConn.query(`update piecevoiture set etat = 'hors service' where numeroSeriePiece = ?`, newPiecetouchee.numeroSeriePiece, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification de l etat du piece du vehicule` });
        }
    });
    dbConn.query(`update voiture set status = 'hors service' where immatricule = ?`, newPiecetouchee.immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification du status du vehicule` });
        }
    });
}; 

Piecetouchees.getByImmatricule = function (immatricule, result) {
    dbConn.query("SELECT * from piecetouchee where immatricule = ?", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Piecetouchees.getByNumeroSeriePiece = function (numeroSeriePiece, result) {
    dbConn.query("SELECT * from piecetouchee where numeroSeriePiece = ?", numeroSeriePiece, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Piecetouchees.getAllPT = function (immatricule, result) {
    dbConn.query("SELECT * from piecetouchee ", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Piecetouchees;