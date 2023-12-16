var dbConn = require("../config/db.config");
var employe = require('./employe.model');
var produitdemande = require('./produitdemande.model');

var Bonsortieproduits = function (bonsortieproduit) {
    this.idBDS = bonsortieproduit.numeroDEP;
    this.dateSortie = bonsortieproduit.dateSortie;
    this.quantiteSortie = bonsortieproduit.quantiteSortie;
    this.matricule = bonsortieproduit.matricule;
    this.idProduitDemande = bonsortieproduit.idProduitDemande;
};


Bonsortieproduits.addBDS = function (newBonsortieproduit, result) {
    const sqlGet = "select quantiteActuelle from produit JOIN produitDemande ON produit.codeImmatricule=produitdemande.codeImmatricule where idProduitDemande = ?";
    dbConn.query(sqlGet, newBonsortieproduit.idProduitDemande, function (err, res){
        const quantiteSortie = newBonsortieproduit.quantiteSortie;
        const quantiteActuelle = res.quantiteActuelle;
        if(quantiteActuelle >= quantiteSortie){
            dbConn.query("insert into bonsortieproduit set ?", newBonsortieproduit, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
            dbConn.query("UPDATE produit SET quantiteActuelle = quantiteActuelle-? "
            +" WHERE codeImmatricule=(SELECT codeImmatricule produitdemande WHERE idProduitDemande = ?) ", 
            newBonsortieproduit.quantiteSortie, newBonsortieproduit.idProduitDemande, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        }else{
            console.log("la quantite de bondesortie depasse celle du stock actuelle");
        }
    });
}; 


/********TEST */



// Bonsortieproduits.addBDS = function (newBonsortieproduit, result) {
//     employe.getByMatricule(newBonsortieproduit.matricule, (err, resEm) => {
//         produitdemande.getByIdProduitDemande(newBonsortieproduit.idProduitDemande, (err, resPD) => {
//             if (resEm && resPD) {
//                 dbConn.query("select distinct quantiteActuelle from produit WHERE codeImmatricule="
//                 + "(SELECT codeImmatricule produitdemande WHERE idProduitDemande = ?) ", newBonsortieproduit.idProduitDemande, function (err,resQtt){
//                     if (err) {
//                         result(err, null);
//                     } else {
                       
//                     }
//                 });

//                 dbConn.query("insert into bonsortieproduit set ?", newBonsortieproduit, function (err, res1) {
//                     if (err) {
//                         result(err, null);
//                     } else {
//                         result(null, { message: `Ajout avec succes id: ${res1.insertId}` });
//                     }
//                 });
//                 dbConn.query("UPDATE produit SET quantiteActuelle = quantiteActuelle-? "
//                 +" WHERE codeImmatricule=(SELECT codeImmatricule produitdemande WHERE idProduitDemande = ?) ", 
//                 newBonsortieproduit.quantiteSortie, newBonsortieproduit.idProduitDemande, function (err, res) {
//                     if (err) {
//                         result(err, null);
//                     } else {
//                         result(null, { message: `Ajout avec succes id: ${res.insertId}` });
//                     }
//                 });
//             } else if (resEm && !resPD) {
//                 result(null, { message: 'employe inconnu' })

//             } else if (!resEm && resPD) {
//                 result(null, { message: 'produit inconnu' })
//             }
//         });
//     });
// }; 
/********FIN TEST */

Bonsortieproduits.getByMemorandum = function (numeroMemorandum, result) {
    dbConn.query("SELECT * from bonsortieproduit where numeroMemorandum = ?", numeroMemorandum, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Bonsortieproduits.getAllBDS = function (numeroMemorandum, result) {
    dbConn.query("SELECT * from bonsortieproduit ", numeroMemorandum, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/** INNACHEVÉ */
Bonsortieeproduits.updateBDS = function (newBonsortieproduit, idBDS, result) {
    // dbConn.query("UPDATE produit SET quantiteCumulee=quantiteCumulee-"
    //             +", quantiteActuelle = quantiteActuelle+? "
    //             +" WHERE codeImmatricule=(SELECT codeImmatricule produitsollicite WHERE idProduitSollicite = ?) ", 
    //                     newBonentreeproduit.quantiteEntree, newBonentreeproduit.quantiteEntree, newBonentreeproduit.idProduitSollicite, function (err, res) {
    //                 if (err) {
    //                     result(err, null);
    //                 } else {
    //                     result(null, { message: `Ajout avec succes id: ${res.insertId}` });
    //                 }
    //             });
    dbConn.query(`update bonsortieproduit set ? where idBDS = ${idBDS}`, newBonsortieproduit, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes idBDS: ${idBDS}` });
        }
    });
};

module.exports = Bonsortieproduits;