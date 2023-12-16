var dbConn = require("../config/db.config");
var fonction = require('./fonction.model');
var unite = require('./unite.model');
var orn = require('./orn.model');
const Fonctions = require("./fonction.model");

var Employes = function (employe) {
    this.matricule = employe.matricule;
    this.nom = employe.nom;
    this.prenoms = employe.prenoms;
    this.photoIdentite = employe.photoIdentite;
    this.mail = employe.mail;
    this.motDePasse = employe.motDePasse;
    this.idFonction = employe.idFonction;
    this.etatCompte = employe.etatCompte;
};

Employes.loginEmploye = (values, result) => {
    let requete;
    if (values.mail && values.motDePasse) {
        requete = "SELECT * FROM employe JOIN fonction JOIN unite WHERE mail=? AND employe.idFonction != 0 AND employe.idFonction=fonction.idFonction  AND fonction.idUnite=unite.idUnite";
    }
    dbConn.query(requete, values.mail, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employes.getLastMatricule = (result) => {
    dbConn.query(
      "SELECT matrucule FROM employe ORDER BY matricule DESC LIMIT 1",
      (err, res) => {
        if (err) {
          return result(err, null);
        } else {
          let id = 0;
          if (res.length === 0) {
            id = 1;
          } else {
            const tmpID = Object.values(res);
            id = Object.values(tmpID[0]);
            id = id[0] + 1;
          }
          return result(null, id);
        }
      }
    );
  };

Employes.addEmploye = function (newEmploye, result) {
    
    fonction.getByIdFonction(newEmploye.idFonction, (err, resFon) => {
        if (resFon) {
            dbConn.query("insert into employe set ? ", newEmploye, function (err, res) {
                if (err) {
                    result(err + `verifier idFonction`, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else  {
            result(null, { message: 'Fonction inconnue' })
        } 
    });
};

Employes.getAllEmploye = function (result) {
    dbConn.query("SELECT * from employe WHERE idFonction != 0 ", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/** employé idFonction chauffeur where voiture.stauts = 'en service'  */
// Employes.getEmployeNonDispo = function (result) {
//     dbConn.query("SELECT * from employe WHERE idFonction != 0 ", function (err, res) {
//         if (err) {
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     });
// };

/** employé idFonction chauffeur where voiture.stauts ! = '' */
// Emplomatricule, nom

Employes.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from employe where matricule = ? AND idFonction !=0", 
    matricule,
    (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length !== 0) {
                result(null, res);
            } else {
                result(null, null);
            }
        }
    });
};

Employes.getByMail = function (mail, result) {
    dbConn.query("SELECT * from employe where mail = ? AND idFonction !=0", 
    mail,
    (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length !== 0) {
                result(null, res);
            } else {
                result(null, null);
            }
        }
    });
};

Employes.getChauffeur = function (result) {/*** solona io idFonction io mb ho idFonction chauffeur de asho n status voiture */
    dbConn.query("SELECT * from employe where  AND idFonction = 5", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employes.getByIdFonction = function (idFonction, result) {
    dbConn.query("SELECT * from employe where idFonction = ?", idFonction, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employes.searchEmploye = function (values, result) {
    var req = "select * from employe where matricule = %?% or nom = %?% or prenoms = %?% or mail = %?% or idFonction = %?%";
    dbConn.query(req, values, function (err, res){
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employes.deleteEmploye = function (matricule, result) {
    dbConn.query(`update employe set idFonction = "0"  where matricule = ${matricule}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `employé portant l identifiant : ${matricule} a été bien Supprimé ` });
        }
    });
};

Employes.updateEmploye = function (newEmploye, matricule, result) {
    fonction.getByIdFonction(newEmploye.idFonction, (err, resFon) => {
        if (resFon) {
            dbConn.query(`update employe set ? where matricule = ${matricule}`, newEmploye, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `modification avec succes matricule: ${matricule}` });
                }
        });
        } else {
            result(null, { message: 'fonction inconnue' })

        } 
    });
};

//get liste employé de la meme unité
Employes.getEmployeUnite = function (matricule, result){
    dbConn.query("SELECT * FROM employe "
            + "JOIN fonction ON fonction.idFonction = employe.idFonction "
            + "JOIN unite ON unite.idUnite = fonction.idUnite WHERE unite.idUnite = "
            + "( SELECT DISTINCT unite.idUnite FROM unite JOIN fonction ON fonction.idUnite = "
            + "unite.idUnite JOIN employe ON employe.idFonction = fonction.idFonction WHERE employe.matricule = ?)", matricule, 
            function (err, res ){
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employes.getUnite = function (matricule, result) {
    dbConn.query("SELECT DISINCT * FROM unite WHERE idUnite = (SELECT idUnite FROM fonction WHERE idFonction = (SELECT idFonction FROM employe WHERE matricule = ? )) ", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
        
    });
};

Employes.getFonction = function (matricule, result) {
    dbConn.query("SELECT * FROM fonction WHERE idFonction = (SELECT idFonction FROM employe WHERE matricule = ? ) ", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employes.getRangFonction = function (matricule, result) {
    dbConn.query("SELECT rang FROM fonction WHERE idFonction = (SELECT idFonction FROM employe WHERE matricule = ? ) ", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Employes;