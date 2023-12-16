var dbConn = require("../config/db.config");

var Orns = function (orn) {
    this.codePostal = orn.codePostal;
    this.nomRegion = orn.nomRegion;
    this.coordonnees = orn.coordonnees;
};

//obtenir liste tout orn
Orns.getAllOrn = function (result) {
    dbConn.query("SELECT * from orn WHERE  nomRegion != 'orn supprimé' ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//ajouter une nouvelle orn
Orns.addOrn = function (newOrn, result) {
    dbConn.query("insert into orn set ?", newOrn, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};

//obtenir orn par son identifiant
Orns.getByCodePostal = function (codePostal, result) {
    dbConn.query("select * from orn where codePostal = ?", codePostal, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Orns.getChauffeurOrn = function (codePostal, result) {
//     dbConn.query("select * from orn where blabla", codePostal, function (err, res) {
//         if (err) {
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     });
// };


Orns.searchOrn = function (values, result) {
    var req
    if (values.codePostal && values.nomRegion && values.coordonnees) {
        req = "select * from orn where codePostal = ? AND nomRegion = ? AND coordonnees = ?"
    } else {
        req = "select * from Orn where codePostal = ? or nomRegion = ? or coordonnees = ?"
    }
    dbConn.query(req, [values.codePostal, values.nomRegion, values.coordonnees], function (err, res){
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Orns.updateOrn = function (newOrn, codePostal, result) {
    dbConn.query(`update orn set ? where codePostal = ${codePostal}`, newOrn, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//never use it
Orns.deleteOrn = function (codePostal, result) {
    dbConn.query(`update orn set nomRegion = 'orn supprimé', coordonnees = NULL where codePostal = ${codePostal}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `ORN portant l identifiant : ${codePostal} a été bien Supprimée ` });
        }
    });
};

module.exports = Orns;