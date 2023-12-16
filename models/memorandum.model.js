var dbConn = require("../config/db.config");
var employe = require('./employe.model');

var Memorandums = function (memorandum) {
    this.numeroMemorandum = memorandum.numeroMemorandum;
    this.dateEnvoie = memorandum.dateEnvoie;
    this.dateReception = memorandum.dateReception;
    this.validationChef = memorandum.validationChef;
    this.validationLog = memorandum.validationLog;
    this.objet = memorandum.objet;
    this.matricule = memorandum.matricule;
    this.destinataires = memorandum.destinataires
};

// Memorandums.addMemorandum = function (newMemorandum, result) {
//     dbConn.query("insert into memorandum set ?", newMemorandum, function (err, res) {
//         if (err) {
//             result(err, null);
//         } else {
//             result(null, { message: `Ajout avec succes id: ${res.insertId}` });
//         }       
//     });
// };


Memorandums.addMemorandum = function (newMemorandum, result) {
    employe.getByMatricule(newMemorandum.matricule, (err, resEm) => {
        if (resEm) {
            dbConn.query("insert into memorandum set ?", newMemorandum, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                }
            });
        } else{
            result(null, { message: 'Employé inconnu' });
        }
    });
};


Memorandums.getMemorandumMonth = function (matricule, result) {
    dbConn.query("SELECT * from memorandum where MONTH(dateEnvoie)=MONTH(CURRENT_DATE) OR  MONTH(dateReception)=MONTH(CURRENT_DATE) ORDER BY numeroMemorandum DESC", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Memorandums.getByMatricule = function (matricule, result) {
    dbConn.query("SELECT * from memorandum where matricule = ?", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Memorandums.getByUnite = function (matricule, result) {
    dbConn.query("SELECT * from memorandum JOIN employe ON employe.matricule = "
            +"memorandum.matricule JOIN fonction ON fonction.idFonction = employe.idFonction "
            +"JOIN unite ON unite.idUnite = fonction.idUnite WHERE unite.idUnite = "
            +"( SELECT DISTINCT unite.idUnite FROM unite JOIN fonction ON fonction.idUnite = "
            +"unite.idUnite JOIN employe ON employe.idFonction = fonction.idFonction "
            +"WHERE employe.matricule = ?)", matricule, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Memorandums.updateMemorandum = function (newMemorandum, numeroMemorandum, result) {
    dbConn.query(`update memorandum set ? where numeroMemorandum = ${numeroMemorandum}`, newMemorandum, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroMemorandum: ${numeroMemorandum}` });
        }
    });
};


Memorandums.validerChefMemorandum = function ( numeroMemorandum, result) {
    dbConn.query(`update memorandum set validationChef = 'validé', dateReception = CURRENT_TIMESTAMP where numeroMemorandum = ${numeroMemorandum}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroMemorandum: ${numeroMemorandum}` });
        }
    });
};


Memorandums.validerLogMemorandum = function ( numeroMemorandum, result) {
    dbConn.query(`update memorandum set validationLog = 'validé' where numeroMemorandum = ${numeroMemorandum}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `modification avec succes numeroMemorandum: ${numeroMemorandum}` });
        }
    });
};

Memorandums.getSommeMemo = function (result) {
    dbConn.query("SELECT count (numeroMemorandum) as sommeMemo from memorandum where numeroMemorandum != '0' ",  function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Memorandums;