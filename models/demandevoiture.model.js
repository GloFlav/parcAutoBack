var dbConn = require("../config/db.config");
var employe = require('./employe.model');

var Demandevoitures = function (demandevoiture) {
    this.numeroDemandeVoiture = demandevoiture.numeroDemandeVoiture;
    this.matricule = demandevoiture.matricule;
    this.raison = demandevoiture.raison;
    this.detailRaison = demandevoiture.detailRaison;
    this.dateHeureUtilisation = demandevoiture.dateHeureUtilisation;
    this.dureeUtilisation = demandevoiture.dureeUtilisation;
    this.validationDemande = demandevoiture.validationDemande;
};


Demandevoitures.addDV = function (newDemandevoiture, result) {
    dbConn.query("insert into demandevoiture set ?", newDemandevoiture, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
}; 

Demandevoitures.getAllDV = function ( result) {
    dbConn.query("SELECT * from demandevoiture ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Demandevoitures.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from demandevoiture where matricule = ?", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Demandevoitures.updateDV = function (newDemandevoiture, numeroDemandeVoiture, result) {
    dbConn.query(`update demandevoiture set ? where numeroDemandeVoiture = ${numeroDemandeVoiture}`, newDemandevoiture, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroDemandeVoiture: ${numeroDemandeVoiture}` });
        }
    });
};

Demandevoitures.validationDV = function (newDemandevoiture, numeroDemandeVoiture, result) {
    dbConn.query(`update demandevoiture set validation = 'validée' where numeroDemandeVoiture = ${numeroDemandeVoiture}`, newDemandevoiture, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroDemandeVoiture: ${numeroDemandeVoiture}` });
        }
    });
};

module.exports = Demandevoitures;