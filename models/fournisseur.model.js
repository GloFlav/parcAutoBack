var dbConn = require("../config/db.config");

var Fournisseurs = function (fournisseur) {
    this.idFournisseur = fournisseur.idFournisseur;
    this.nomMagasin = fournisseur.nomMagasin;
    this.raisonFidelisation = fournisseur.raisonFidelisation;
    this.coordonneesMagasin = fournisseur.coordonneesMagasin;
};

//obtenir liste tous les fournisseurs
Fournisseurs.getAllFournisseur = function (result) {
    dbConn.query("SELECT * from fournisseur where nomMagasin != 'magasin indisponible'", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//ajouter une nouvelle fournisseur
Fournisseurs.addFournisseur = function (newFournisseur, result) {
    dbConn.query("insert into fournisseur set ?", newFournisseur, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};

//obtenir fournisseur par son identifiant
Fournisseurs.getByidFournisseur = function (idFournisseur, result) {
    dbConn.query("select * from fournisseur where idFournisseur = ?", idFournisseur, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Fournisseurs.searchFournisseur = function (values, result) {
    var req = "select * from fournisseur where idFournisseur = %?% or nomMagasin = %?% or raisonFidelisation = %?%";
    dbConn.query(req, values, function (err, res){
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Fournisseurs.updateFournisseur = function (newFournisseur, idFournisseur, result) {
    dbConn.query(`update fournisseur set ? where idFournisseur = ${idFournisseur}`, newFournisseur, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Fournisseurs.deleteFournisseur = function (idFournisseur, result) {
    dbConn.query(`update fournisseur set nomMagasin = 'magasin indisponible' where idFournisseur = ${idFournisseur}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Fournisseur portant l identifiant : ${Fournisseur} a été bien Supprimée ` });
        }
    });
};

module.exports = Fournisseurs;