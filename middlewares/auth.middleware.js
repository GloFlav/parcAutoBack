const employeModel = require("../models/employe.model");
const jwt = require("jsonwebtoken");

module.exports.checkEmploye = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("middleware verification token : ", token);
  
  if (token) {
    jwt.verify(token, `08Flavien99Airolg256`, async (err, decodedToken) => {
      if(err){
        console.log(err)
        const donnee = {
          message: "Une erreur s'est produite ",
          success: false
        }
        return reponseApi(donnee, 500, res);
      }
      console.log(decodedToken);
      if (decodedToken) {
        const dtok = decodedToken.mail[0];
        employeModel.getByMail(dtok.mail, (err, resultat) => {
          if (resultat[0].idFonction == "1") {
            next();
          } else {
            const donnee = {
              message: `${resultat[0].nom} un utilisateur ${resultat[0].idFonction} !` + matricule,
              success: false,
            };
            reponseApi(donnee, 403, res);
          }
        });
      } else {
        const donnee = {
          message: `Non autorié, impossible de traiter le token !`,
          success: false,
        };
        reponseApi(donnee, 401, res);
        next();
      }
    });
  } else {
    const donnee = {
      message: `Non autorisé, token invalide!`,
      success: false,
    }
    reponseApi(donnee, 401, res);
  }
};

const reponseApi = (donnee, status, res) => {
    res.status(status).send({...donnee});
}
