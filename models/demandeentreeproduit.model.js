var dbConn = require("../config/db.config");
var employe = require('./employe.model');

var Demandeentreeproduits = function (demandeentreeproduit) {
    this.numeroDEP = demandeentreeproduit.numeroDEP;
    this.dateDemande = demandeentreeproduit.dateDemande;
    this.validationDEP = demandeentreeproduit.validationDEP;
    this.motif = demandeentreeproduit.motif;
    this.matricule = demandeentreeproduit.matricule;
};


Demandeentreeproduits.addDEP = function (newDemandeentreeproduit, result) {
    employe.getByMatricule(newDemandeentreeproduit.matricule, (err, resEm) => {
        if (resEm) {
            dbConn.query("insert into demandeentreeproduit set ?", newDemandeentreeproduit, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else{
            result(null, { message: 'Employé inconnu' });
        }
    });
}; 

Demandeentreeproduits.getAllDEP = function ( result) {
    dbConn.query("SELECT * from demandeentreeproduit ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Demandeentreeproduits.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from demandeentreeproduit where matricule = ?", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Demandeentreeproduits.updateDEP = function (newDemandeentreeproduit, numeroDEP, result) {
    dbConn.query(`update demandeentreeproduit set ? where numeroDEP = ${numeroDEP}`, newDemandeentreeproduit, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroDEP: ${numeroDEP}` });
        }
    });
};

Demandeentreeproduits.validerDEP = function ( numeroDEP, result) {
    dbConn.query(`update demandeentreeproduit set validationDEP = 'validé' where numeroDEP = ${numeroDEP}`,  function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroDEP: ${numeroDEP}` });
        }
    });
};

module.exports = Demandeentreeproduits;