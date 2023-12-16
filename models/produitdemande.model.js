var dbConn = require("../config/db.config");
var employe = require('./employe.model');
var memorandum = require("./memorandum.model");
var produit = require("./produit.model");


var Produitdemandes = function (produitdemande) {
    this.idProduitDemande = produitdemande.idProduitDemande;
    this.codeImmatricule = produitdemande.codeImmatricule;
    this.numeroMemorandum = produitdemande.numeroMemorandum;
    this.quantiteDemande = produitdemande.quantiteDemande;
};


Produitdemandes.addProduitdemande = function (newProduitdemande, result) {
    produit.getByCodeImmatricule(newProduitdemande.codeImmatricule, (err, resPr) => {
        memorandum.getByNumeroMemorandum(newProduitdemande.numeroMemorandum, (err, resMe) => {
            if (resPr && resMe) {
                dbConn.query("insert into produitdemande set ?", newProduitdemande, function (err, res) {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                    }
                });
            } else if (resPr && !resMe) {
                result(null, { message: 'Memorandum inconnu' })

            } else if (!resPr && resMe) {
                result(null, { message: 'Produit inconnu' })
            }
        });
    });
};

Produitdemandes.getByNumeroMemorandum = function (numeroMemorandum, result) {
    dbConn.query("SELECT * from produitdemande where numeroMemorandum = ?", numeroMemorandum, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Produitdemandes.getQuantiteActuelle = function (codeImmatricule, result) {
    dbConn.query("SELECT quantiteActuelle from produit where codeImmatricule = ?", codeImmatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Produitdemandes.updateProduitdemande = function (newProduitdemande, idProduitDemande, result) {
    dbConn.query(`update produitdemande set ? where idProduitDemande = ${idProduitDemande}`, newProduitdemande, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes idProduitDemande: ${idProduitDemande}` });
        }
    });
};


Produitdemandes.deleteProduitdemande = function (idProduitDemande, result) {
    dbConn.query(`delete from produitdemande  where idProduitDemande = ${idProduitDemande}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, {message: `Suppression succes id : ${id}`});
        }
    });
}; 

module.exports = Produitdemandes;