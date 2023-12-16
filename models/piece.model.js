var dbConn = require("../config/db.config");

var Pieces = function (piece) {
    this.idPiece = piece.idPiece;
    this.nomPiece = piece.nomPiece;
};

//obtenir liste tout piece
Pieces.getAllPiece = function (result) {
    dbConn.query("SELECT * from piece WHERE nomPiece != 'piece supprimé' ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//ajouter une nouvelle piece
Pieces.addPiece = function (newPiece, result) {
    dbConn.query("insert into piece set ?", newPiece, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};

//obtenir piece par son identifiant
Pieces.getByIdPiece = function (idPiece, result) {
    dbConn.query("select * from piece where idPiece = ?", idPiece, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
//never use it
Pieces.deletePiece = function (idPiece, result) {
    dbConn.query(`update piece set nomPiece = 'piece supprimé' where idPiece = ${idPiece}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `piece portant l identifiant : ${idPiece} a été bien Supprimée ` });
        }
    });
};

Pieces.updatePiece = function (newPiece, idPiece, result) {
    dbConn.query(`update piece set ? where idPiece = ${idPiece}`, newPiece, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `piece portant l identifiant : ${idPiece} a été bien MODIFIÉE ` });
        }
    });
};

module.exports = Pieces;