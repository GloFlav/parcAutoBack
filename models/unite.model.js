var dbConn = require("../config/db.config");
var orn = require('./orn.model');

var Unites = function (unite) {
    this.idUnite = unite.idUnite;
    this.appelation = unite.appelation;
    this.codePostal = unite.codePostal;
};

Unites.addUnite = function (newUnite, result) {
    orn.getByCodePostal(newUnite.codePostal, (err, resOrn) => {
        if (resOrn) {
            dbConn.query("insert into unite set ?", newUnite, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else  {
            result(null, { message: 'ORN inconnue' })
        } 
    });
};

Unites.getAllUnite = function (result) {
    dbConn.query("SELECT * from unite where codePostal != 0", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Unites.getByIdUnite = function (idUnite, result) {
    dbConn.query("SELECT * from unite where idUnite = ?", idUnite, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Unites.getByCodePostal = function (codePostal, result) {
    dbConn.query("SELECT * from unite where codePostal = ?", codePostal, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Unites.deleteUnite = function (idUnite, result) {
    dbConn.query(`update unite set codePostal = 0 where idUnite = ${idUnite}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Unité portant l identifiant : ${idUnite} a été bien Supprimée ` });
        }
    });
};

Unites.updateUnite = function (newUnite, idUnite, result) {
    orn.getByCodePostal(newUnite.codePostal, (err, resOrn) => {
        if (resOrn) {
            dbConn.query(`update unite set ? where idUnite = ${idUnite}`, newUnite, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `modification avec succes idUnite: ${idUnite}` });
                }
        });
        } else {
            result(null, { message: 'orn inconnu' })

        } 
    });
};



module.exports = Unites;