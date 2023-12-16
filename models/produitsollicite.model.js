var dbConn = require("../config/db.config");
var employe = require('./employe.model');
var demandeentreeproduit = require("./demandeentreeproduit.model");
var produit = require("./produit.model");


var Produitsollicites = function (produitsollicite) {
    this.idProduitSollicite = produitsollicite.idProduitSollicite;
    this.codeImmatricule = produitsollicite.codeImmatricule;
    this.numeroDEP = produitsollicite.numeroDEP;
    this.quantiteSollicitee = produitsollicite.quantiteSollicitee;
};


Produitsollicites.addProduitsollicite = function (newProduitsollicite, result) {
    produit.getByCodeImmatricule(newProduitsollicite.codeImmatricule, (err, resPr) => {
        demandeentreeproduit.getByNumeroDEP(newProduitsollicite.numeroDEP, (err, resDEP) => {
            if (resPr && resDEP) {
                dbConn.query("insert into produitsollicite set ?", newProduitsollicite, function (err, res) {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                    }
                });
            } else if (resPr && !resDEP) {
                result(null, { message: 'DEP inconnu' })

            } else if (!resPr && resDEP) {
                result(null, { message: 'Produit inconnu' })
            }
        });
    });
}; 


Produitsollicites.getByNumeroDemandeentreeproduit = function (numeroProduitSollicite, result) {
    dbConn.query("SELECT * from produitdemande where numeroProduitSollicite = ?", numeroProduitSollicite, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Produitsollicites.updateProduitsollicite = function (newProduitsollicite, idProduitSollicite, result) {
    dbConn.query(`update produitsollicite set ? where idProduitSollicite = ${idProduitSollicite}`, newProduitsollicite, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes idProduitSollicite: ${idProduitSollicite}` });
        }
    });
};


Produitsollicites.deleteProduitsollicite = function (idProduitSollicite, result) {
    dbConn.query(`delete from produitsollicite  where idProduitSollicite = ${idProduitSollicite}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, {message: `Suppression succes id : ${id}`});
        }
    });
}; 


module.exports = Produitsollicites;