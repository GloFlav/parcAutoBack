var dbConn = require("../config/db.config");
var voiture = require('./voiture.model');

var Vignettes = function (vignette) {
    this.numeroVignette = vignette.numeroVignette;
    this.dateVignette = vignette.dateVignette;
    this.dateFinVignette = vignette.dateFinVignette;
    this.montantV = vignette.montantV;  
    this.immatricule = vignette.immatricule;
};

Vignettes.addVignette = function (newVignette, result) {
    voiture.getByImmatricule(newVignette.immatricule, (err, resFon) => {
        if (resFon) {
            dbConn.query("insert into vignette set ?", newVignette, function (err, res) {
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

Vignettes.getAllVignette = function (result) {
    dbConn.query("SELECT * from vignette ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Vignettes.getByImmatricule = function (immatricule, result) {
    dbConn.query("SELECT * from vignette where immatricule = ?", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Vignettes.getActuelleVignette = function (immatricule, result) {
    dbConn.query("SELECT * from vignette where immatricule = ? AND CURRENT_DATE BETWEEN dateVignette AND dateFinVignette", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Vignettes.updateVignette = function (newVignette, numeroVignette, result) {
    dbConn.query(`update assurance set ? where numeroVignette = ${numeroVignette}`, newVignette, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroVignette: ${numeroVignette}` });
        }
    });
};


module.exports = Vignettes;