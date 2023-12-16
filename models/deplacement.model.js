var dbConn = require("../config/db.config");
var employe = require('./employe.model');

var Deplacements = function (deplacement) {
    this.numeroDeplacement = deplacement.newDeplacement;
    this.immatricule = deplacement.immatricule;
    this.dateHeureDepart = deplacement.dateHeureDepart;
    this.dateHeureArrivee = deplacement.dateHeureArrivee;
    this.nombrePassagers = deplacement.dureeUtilisation;
    this.jaugeDepart = deplacement.jaugeDepart;
    this.jaugeArrivee = deplacement.jaugeArrivee;
    this.idItineraire = deplacement.idItineraire;
    this.numeroDemandeVoiture = deplacement.numeroDemandeVoiture;
};


Deplacements.addDeplacement = function (newDeplacement, result) {
    dbConn.query("insert into deplacement set ?", newDeplacement, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
    dbConn.query(`update voiture set status = 'en service' where immatricule = ?`, newDeplacement.immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification du status du vehicule` });
        }
    });
}; 

Deplacements.getByImmatricule = function (Immatricule, result) {
    dbConn.query("SELECT * from deplacement where immatricule = ?", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Deplacements.getByDay = function ( result) {
    dbConn.query("SELECT * from deplacement where DAY(CURRENT_DATE) BETWEEN dateHeureDepart AND dateHeureArrivee ?",  function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Deplacements.getAllDeplacement = function (Immatricule, result) {
    dbConn.query("SELECT * from deplacement ", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Deplacements.updateDeplacement = function (newDeplacement, numeroDeplacement, result) {
    dbConn.query(`update deplacement set ? where numeroDeplacement = ${numeroDeplacement}`, newDeplacement, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroDeplacement: ${numeroDeplacement}` });
        }
    });
};

module.exports = Deplacements;