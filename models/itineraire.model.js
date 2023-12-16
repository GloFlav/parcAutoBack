var dbConn = require("../config/db.config");

var Itineraires = function (itineraire) {
    this.idItineraire = itineraire.codePostal;
    this.depart = itineraire.depart;
    this.arrivee = itineraire.arrivee;
    this.distanceEstime = itineraire.distanceEstime;
};

//obtenir liste tout itineraire
Itineraires.getAllItineraire = function (result) {
    dbConn.query("SELECT * from itineraire", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//ajouter une nouvelle orn
Itineraires.addItineraire = function (newItineraire, result) {
    dbConn.query("insert into itineraire set ?", newItineraire, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};

//obtenir orn par son identifiant
Itineraires.getByIdItineraire = function (idItineraire, result) {
    dbConn.query("select * from itineraire where idItineraire = ?", idItineraire, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Itineraires.updateItineraire = function (newItineraire, idItineraire, result) {
    dbConn.query(`update itineraire set ? where idItineraire = ${idItineraire}`, newItineraire, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = Itineraires;