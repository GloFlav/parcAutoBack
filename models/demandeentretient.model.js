var dbConn = require("../config/db.config");
var employe = require('./employe.model');

var Demandeentretients = function (demandeentretient) {
    this.idDE = demandeentretient.idDE;
    this.dateDeclaration = demandeentretient.dateDeclaration;
    this.dateConstatation = demandeentretient.dateConstatation;
    this.codeDegat = demandeentretient.codeDegat;
    this.immatricule = demandeentretient.immatricule;
};


Demandeentretients.addDE = function (newDemandeentretient, result) {
    dbConn.query("insert into demandeentretient set ?", newDemandeentretient, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
}; 

Demandeentretients.getAllDE = function ( result) {
    dbConn.query("SELECT * from demandeentretient", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Demandeentretients.getByImmatricule = function (immatricule, result) {
    dbConn.query("SELECT * from demandeentretient where immatricule = ?", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Demandeentretients.updateDE = function (newDemandeentretient, idDE, result) {
    dbConn.query(`update demandeentretient set ? where idDE = ${idDE}`, newDemandeentretient, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes idDE: ${idDE}` });
        }
    });
};

module.exports = Demandeentretients;