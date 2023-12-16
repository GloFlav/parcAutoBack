var dbConn = require("../config/db.config");
var voiture = require('./voiture.model');

var Piecevoitures = function (piecevoiture) {
    this.numeroSeriePiece = piecevoiture.numeroSeriePiece;
    this.etat = piecevoiture.etat;
    this.kilometrageAjout = piecevoiture.kilometrageAjout;
    this.kilometrageEstime = piecevoiture.kilometrageEstime; 
    this.valeur = piecevoiture.valeur;
    this.immatricule = piecevoiture.immatricule;
    this.idPiece = piecevoiture.idPiece; 
    this.idFournisseur = piecevoiture.idFournisseur; 
};

Piecevoitures.addPiecevoiture = function (newPiecevoiture, result) {
    voiture.getByImmatricule(newPiecevoiture.immatricule, (err, resFon) => {
        if (resFon) {
            dbConn.query("insert into piecevoiture set ?", newPiecevoiture, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else  {
            result(null, { message: 'voiture inconnue' })
        } 
    });
};

Piecevoitures.getAllPiecevoiture = function (result) {
    dbConn.query("SELECT * from piecevoiture ORDER BY immatricule ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Piecevoitures.getByImmatricule = function (immatricule, result) {
    dbConn.query("SELECT * from piecevoiture where immatricule = ?", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Piecevoitures.getByEtat = function (etat, result) {
    dbConn.query("SELECT * from piecevoiture where etat = ?", etat, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Piecevoitures.updatePiecevoiture = function (newPiecevoiture, numeroSeriePiece, result) {
    dbConn.query(`update piecevoiture set ? where numeroSeriePiece = ${numeroSeriePiece}`, newPiecevoiture, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroSeriePiece: ${numeroSeriePiece}` });
        }
    });
};

Piecevoitures.deletePiecevoiture = function (newPiecevoiture, numeroSeriePiece, result) {
    dbConn.query(`delete piecevoiture where numeroSeriePiece = ${numeroSeriePiece}`, newPiecevoiture, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `suppresion avec succes numeroSeriePiece: ${numeroSeriePiece}` });
        }
    });
};


module.exports = Piecevoitures;