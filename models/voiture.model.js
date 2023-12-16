var dbConn = require("../config/db.config");
var voiture = require('./voiture.model');
var modele = require('./modele.model');

var Voitures = function (voiture) {
    this.immatricule = voiture.immatricule;
    this.status = voiture.status;
    this.couleur = voiture.couleur;
    this.matricule = voiture.matricule;
    this.photoVoiture = voiture.photoVoiture;  
    this.kilometrage = voiture.kilometrage;
    this.dateAquisition = voiture.dateAquisition; 
    this.idModele = voiture.idModele; 
};

Voitures.addVoiture = function (newVoiture, result) {
    modele.getByIdModele(newVoiture.idModele, (err, resFon) => {
        if (resFon) {
            dbConn.query("insert into voiture set ?", newVoiture, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else  {
            result(null, { message: 'Modele inconnue' })
        } 
    });
};

Voitures.getAllVoiture = function (result) {
    dbConn.query("SELECT * from voiture WHERE status != 'supprimé' ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.getVoitureLibre = function (result) {
    dbConn.query("SELECT * from voiture WHERE status = 'Libre' ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from voiture where matricule = ? AND status != 'supprimé'", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.getByImmatricule = function (immatricule, result) {
    dbConn.query("SELECT * from voiture where immatricule = ? AND status != 'supprimé'", immatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.getByIdModele = function (idModele, result) {
    dbConn.query("SELECT * from voiture where idModele = ? AND status != 'supprimé'", idModele, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.getByIdMarque = function (idMarque, result) {
    dbConn.query("SELECT * from voiture JOIN modele ON voiture.idModele = modele.idModele WHERE modele.idMarque = ?", idModele, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.getByStatus = function (status, result) {
    dbConn.query("SELECT * from voiture where Status = ? ", status, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Voitures.deleteVoiture = function (immatricule, result) {
    dbConn.query(`update voiture set status = 'supprimé' where immatricule = ${immatricule}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Voiture portant l identifiant : ${immatricule} a été bien Supprimé ` });
        }
    });
};

Voitures.updateVoiture = function (newVoiture, immatricule, result) {
    dbConn.query(`update voiture set ? where immatricule = ${immatricule}`, newVoiture, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes immatricule: ${immatricule}` });
        }
    });
};


module.exports = Voitures;