var dbConn = require("../config/db.config");
var employe = require("./employe.model");
var fonction = require('./fonction.model');
var unite = require('./unite.model');
var orn = require('./orn.model');

var Aptitudes = function (aptitude) {
    this.idAptitude = aptitude.idAptitude;
    this.categorie = aptitude.categorie;
    this.matricule = aptitude.matricule;
};

Aptitudes.addAptitude = function (newAptitude, result) {
    employe.getByMatricule(newAptitude.matricule, (err, resEmp) => {
        if (resEmp) {
            dbConn.query("insert into aptitude set ?", newAptitude, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else  {
            result(null, { message: 'Employé inconnu' })
        } 
    });
};

Aptitudes.getAllAptitude = function (result) {
    dbConn.query("SELECT * from aptitude ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Aptitudes.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from aptitude where matricule = ?", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Aptitudes.getByIdAptitude = function (idAptitude, result) {
    dbConn.query("SELECT * from aptitude where idAptitude = ?", idAptitude, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Aptitudes.deleteAptitude = function (idAptitude, result) {
    dbConn.query(`delete from aptitude  where idAptitude = ${idAptitude}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Aptitude portant l identifiant : ${idAptitude} a été bien Supprimé ` });
        }
    });
};

Aptitudes.updateAptitude = function (newAptitude, idAptitude, result) {
    employe.getByMatricule(newAptitude.idAptitude, (err, resEmp) => {
        if (resEmp) {
            dbConn.query(`update aptitude set ? where idAptitude = ${idAptitude}`, newAptitude, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `modification avec succes matricule: ${idAptitude}` });
                }
        });
        } else {
            result(null, { message: 'employé inconnue' })

        } 
    });
};



module.exports = Aptitudes;