var dbConn = require("../config/db.config");
var unite = require('./unite.model');
var employe = require('./employe.model');

var Fonctions = function (fonction) {
    this.idFonction = fonction.idFonction;
    this.roles = fonction.roles;
    this.rang = fonction.rang;
    this.idUnite = fonction.idUnite;
};

Fonctions.addFonction = function (newFonction, result) {
    unite.getByIdUnite(newFonction.idUnite, (err, resOrn) => {
        if (resOrn) {
            dbConn.query("insert into fonction set ?", newFonction, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else  {
            result(null, { message: 'Unité inconnue' })
        } 
    });
};

Fonctions.getAllFonction = function (result) {
    dbConn.query("SELECT * from fonction where idUnite != 0 ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Fonctions.getByIdUnite = function (idUnite, result) {
    dbConn.query("SELECT * from fonction where idUnite = ?", idUnite, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Fonctions.getByIdFonction = function (idFonction, result) {
    dbConn.query("SELECT * from fonction where idFonction = ?", idFonction, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res + ` FONCTION BIEN CONNUE`);

        }
    });
};

Fonctions.deleteFonction = function (idFonction, result) {
    dbConn.query(`update fonction set idUnite = 0 where idFonction = ${idFonction}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Fonction portant l identifiant : ${idFonction} a été bien Supprimée ` });
        }
    });
};

Fonctions.updateFonction = function (newFonction, idFonction, result) {
    unite.getByIdUnite(newFonction.idUnite, (err, resUn) => {
        if (resUn) {
            dbConn.query(`update fonction set ? where idFonction = ${idFonction}`, newFonction, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `modification avec succes idFonction: ${idFonction}` });
                }
            });
        } else {
            result(null, { message: 'unité inconnue' });
        } 
    });
};



module.exports = Fonctions;