var dbConn = require("../config/db.config");
var fournisseur = require('./fournisseur.model');

var Produits = function (produit) {
    this.codeImmatricule = produit.codeImmatricule;
    this.nomProduit = produit.nomProduit;
    this.unite = produit.unite;
    this.quantiteCumulee = produit.quantiteCumulee;
    this.quantiteActuelle = produit.quantiteActuelle;
    this.quantiteSeuille = produit.quantiteSeuille;
    this.quantiteMauvaisEtat = produit.quantiteMauvaisEtat;
};

Produits.addProduit = function (newProduit, result) {
    dbConn.query("insert into produit set ? ", newProduit, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }       
    });
};

Produits.getAllProduit = function (result) {
    dbConn.query("SELECT * from produit where nomProduit != 'produit effacé'", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Produits.getByCodeImmatricule = function (codeImmatricule, result) {
    dbConn.query("SELECT * from produit where codeImmatricule = ?", codeImmatricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Produits.searchProduit = function (valeur, result) {
    dbConn.query(
        ` select * from produit where nomProduit LIKE '%${valeur}%' order by codeImmatricule desc`,
        valeur,
        (err, res) => {
          if (err) {
            result({ err, message: "erreur !", success: false }, null);
          } else {
            if (res.length !== 0) {
              result(null, { res, message: "trouvable !", success: true });
            } else {
              result(null, { res, message: "Introuvable !", success: false });
            }
          }
        }
      );
};

Produits.deleteProduit = function (codeImmatricule, result) {
    dbConn.query(`update produit set nomProduit = 'produit effacé' where codeImmatricule = ${codeImmatricule}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `produit portant l codeImmatricule : ${codeImmatricule} a été bien Supprimé ` });
        }
    });
};

Produits.updateProduit = function (newProduit, codeImmatricule, result) {
    dbConn.query(`update produit set ? where codeImmatricule = ${codeImmatricule}`, newProduit, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes codeImmatricule: ${codeImmatricule}` });
        }
    });
};

Produits.updateEtatProduit = function (quantiteMauvaisEtat, codeImmatricule, result) {
    dbConn.query(`update produit set quantiteMauvaisEtat = quantiteMauvaisEtat + ? where codeImmatricule = ${codeImmatricule}`, quantiteMauvaisEtat, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes codeImmatricule: ${codeImmatricule}` });
        }
    });
};

module.exports = Produits;