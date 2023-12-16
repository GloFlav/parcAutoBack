var dbConn = require("../config/db.config");

var Degats = function (degat) {
    this.codeDegat = degat.codeDegat;
    this.typeDegat = degat.typeDegat;
    this.description = degat.description;
    this.consequence = degat.consequence;
};

//obtenir liste tout degat
Degats.getAllDegat = function (result) {
    dbConn.query("SELECT * from degat WHERE typeDegat != 'degat invalide' ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//ajouter une nouvelle degat
Degats.addDegat = function (newDegat, result) {
    dbConn.query("insert into degat set ?", newDegat, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};

//obtenir degat par son identifiant
Degats.getByCodeDegat = function (codeDegat, result) {
    dbConn.query("select * from degat where codeDegat = ?", codeDegat, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Degats.updateDegat = function (newDegat, codeDegat, result) {
    dbConn.query(`update degat set ? where codeDegat = ${codeDegat}`, newDegat, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//never use it
Degats.deleteDegat = function (codeDegat, result) {
    dbConn.query(`update degat set degat = 'degat inexistant' where codeDegat = ${codeDegat}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Degat portant l identifiant : ${codeDegat} a été bien Supprimée ` });
        }
    });
};

module.exports = Degats;