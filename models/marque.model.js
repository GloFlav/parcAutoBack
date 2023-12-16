var dbConn = require("../config/db.config");

var Marques = function (marque) {
    this.idMarque = marque.idMarque;
    this.nomMarque = marque.nomMarque;
    this.logoMarque = marque.logoMarque;
};

//obtenir liste tout marque
Marques.getAllMarque = function (result) {
    dbConn.query("SELECT * from marque WHERE nomMarque != 'marque supprimé' ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//ajouter une nouvelle marque
Marques.addMarque = function (newMarque, result) {
    dbConn.query("insert into marque set ?", newMarque, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};

//obtenir marque par son identifiant
Marques.getByIdMarque = function (idMarque, result) {
    dbConn.query("select * from marque where idMarque = ?", idMarque, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Marques.updateMarque = function (newMarque, idMarque, result) {
    dbConn.query(`update marque set ? where idMarque = ${idMarque}`, newMarque, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//never use it
Marques.deleteMarque = function (idMarque, result) {
    dbConn.query(`update marque set nomMarque = 'marque supprimé', logoMarque = NULL where idMarque = ${idMarque}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Marque portant l identifiant : ${idMarque} a été bien Supprimée ` });
        }
    });
};

module.exports = Marques;