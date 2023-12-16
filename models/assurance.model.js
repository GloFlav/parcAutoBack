var dbConn = require("../config/db.config");
var voiture = require('./voiture.model');

var Assurances = function (assurance) {
    this.numeroAssurance = assurance.numeroAssurance;
    this.dateContrat = assurance.dateContrat;
    this.dateFinContrat = assurance.dateFinContrat;
    this.montantC = assurance.montantC;
    this.agence = assurance.agence;  
    this.immatricule = assurance.immatricule;
};

Assurances.addAssurance = function (newAssurance, result) {
    voiture.getByImmatricule(newAssurance.immatricule, (err, resFon) => {
        if (resFon) {
            dbConn.query("insert into assurance set ?", newAssurance, function (err, res) {
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

Assurances.getAllAssurance = function (result) {
    dbConn.query("SELECT * from assurance ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Assurances.getByImmatricule = function (immatricule, result) {
    dbConn.query("SELECT * from assurance where immatricule = ?", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Assurances.getActuelleAssurance = function (immatricule, result) {
    dbConn.query("SELECT * from assurance where immatricule = ? AND CURRENT_DATE BETWEEN dateContrat AND dateFinContrat", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Assurances.updateAssurance = function (newAssurance, numeroAssurance, result) {
    dbConn.query(`update assurance set ? where numeroAssurance = ${numeroAssurance}`, newAssurance, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroAssurance: ${numeroAssurance}` });
        }
    });
};


module.exports = Assurances;