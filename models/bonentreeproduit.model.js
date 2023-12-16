var dbConn = require("../config/db.config");
var employe = require('./employe.model');
var produitsollicite = require('./produitsollicite.model');

var Bonentreeproduits = function (bonentreeproduit) {
    this.idBDE = bonentreeproduit.numeroDEP;
    this.dateEntree = bonentreeproduit.dateEntree;
    this.quantiteEntree = bonentreeproduit.quantiteEntree;
    this.prixUnitaire = bonentreeproduit.prixUnitaire;
    this.matricule = bonentreeproduit.matricule;
    this.idProduitSollicite = bonentreeproduit.idProduitSollicite;
    this.idFournisseur = bonentreeproduit.idFournisseur;
};


Bonentreeproduits.addBDE = function (newBonentreeproduit, result) {
    employe.getByMatricule(newBonentreeproduit.matricule, (err, resEm) => {
        produitsollicite.getByIdProduitSollicite(newBonentreeproduit.idProduitSollicite, (err, resPS) => {
            if (resEm && resPS) {
                dbConn.query("insert into bonentreeproduit set ?", newBonentreeproduit, function (err, res) {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                    }
                });
                dbConn.query("UPDATE produit SET quantiteCumulee=quantiteCumulee+?, quantiteActuelle = quantiteActuelle+? "
                +" WHERE codeImmatricule=(SELECT codeImmatricule produitsollicite WHERE idProduitSollicite = ? )", 
                        newBonentreeproduit.quantiteEntree, newBonentreeproduit.quantiteEntree, newBonentreeproduit.idProduitSollicite, function (err, res) {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                    }
                });
            } else if (resEm && !resPS) {
                result(null, { message: 'employe inconnu' })

            } else if (!resEm && resPS) {
                result(null, { message: 'produit inconnu' })
            }
        });
    });
}; 

Bonentreeproduits.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from bonentreeproduit where matricule = ?", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}; 


Bonentreeproduits.getAllBDE = function ( result) {
    dbConn.query("SELECT * from bonentreeproduit ",  function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}; 


Bonentreeproduits.getByIdFournisseur = function (idFournisseur, result) {
    dbConn.query("SELECT * from bonentreeproduit where idFournisseur = ?", idFournisseur, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}; 


Bonentreeproduits.getByDEP = function (idProduitSollicite, result) {
    dbConn.query("SELECT * from bonentreeproduit where idProduitSollicite = ?", idProduitSollicite, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


/** INNACHEVÉ */
Bonentreeproduits.updateBDE = function (newBonentreeproduit, idBDE, result) {
    // dbConn.query("UPDATE produit SET quantiteCumulee=quantiteCumulee-"
    //             +"(SELECT quantiteEntree from bonentreeproduit WHERE idProduitSollicite = "
    //             +"(SELECT idProduitSollicite FROM produitsollicite WHERE codeImmatricule = ? )) + ?"
    //             +", quantiteActuelle = quantiteActuelle - "
    //             +"(SELECT quantiteActuelle from produit WHERE codeImmatricule = "
    //             +"(SELECT codeImmatricule produitsollicite WHERE idProduitSollicite = ? )) + ?"
    //             +"WHERE codeImmatricule=(SELECT codeImmatricule produitsollicite WHERE idProduitSollicite = ? )", 
    //                     newBonentreeproduit.idProduitSollicite, newBonentreeproduit.quantiteEntree, 
    //                     newBonentreeproduit.idProduitSollicite, newBonentreeproduit.quantiteEntree, 
    //                     newBonentreeproduit.idProduitSollicite, function (err, res) {
    //     if (err) {
    //         result(err, null);
    //     } else {
    //         result(null, { message: `Ajout avec succes id: ${res.insertId}` });
    //     }
    // });
    dbConn.query(`update bonentreeproduit set ? where idBDE = ${idBDE}`, newDemandeentreeproduit, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes idBDE: ${idBDE}` });
        }
    });
};

module.exports = Bonentreeproduits;