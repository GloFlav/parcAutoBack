const router = require("express").Router();

/**les constantes */
const middlewareAuth = require('../middlewares/auth.middleware')
const aptitudeController = require("../controllers/aptitude.controller");
const employeController = require("../controllers/employe.controller");
const fonctionController = require("../controllers/fonction.controller");
const ornController = require("../controllers/orn.controller");
const uniteController = require("../controllers/unite.controller");

/**middleware connection */
router.post("/login", employeController.loginEmploye);
router.get("/userConnected", employeController.getInfoUserConnected);

/**router on aptitude */
router.get("/aptitudes", aptitudeController.getAllAptitude);
router.get("/aptitudes/:id", aptitudeController.getByMatricule);
router.get("/aptitude/:id", aptitudeController.getByIdAptitude);
router.post("/aptitude", aptitudeController.addAptitude);
router.put("/aptitude/:id", aptitudeController.updateAptitude);
router.delete("/aptitude/:id", aptitudeController.deleteAptitude);

/**router on employe */
router.get("/employes", middlewareAuth.checkEmploye, employeController.getAllEmploye);
router.get("/chauffeurs", employeController.getChauffeur);
router.get("/employe/:id", employeController.getByMatricule);
router.get("/employesfonction/:id", employeController.getByIdFonction);
router.get("/fonctionemploye/:id", employeController.getFonction);
router.get("/rangemploye/:id", employeController.getRangFonction);
router.get("/uniteemploye/:id", employeController.getUnite);
router.get("/employesunite/:id", employeController.getEmployeUnite);
router.post("/employe", employeController.addEmploye);
router.put("/employe/:id", employeController.updateEmploye);
router.put("/delemploye/:id", employeController.deleteEmploye);
// router.post("/search", employeController.search);

/**router on fonction */
router.get("/fonctions", fonctionController.getAllFonction);
router.get("/fonction/:id", fonctionController.getByIdFonction);
router.get("/fonctionsUnite/:id", fonctionController.getByIdUnite);
router.post("/fonction", fonctionController.addFonction);
router.put("/fonction/:id", fonctionController.updateFonction);
router.put("/fonction/:id", fonctionController.deleteFonction);

/**router on orn */
router.get("/orns", ornController.getAllOrn);
router.get("/orn/:id", ornController.getByCodePostal);
// router.get("/chauffeursorn/:id", ornController.getChauffeurOrn);
router.post("/orn", ornController.addOrn);
router.put("/orn/:id", ornController.updateOrn);
router.put("/orn/:id", ornController.deleteOrn);

/**router on unite */
router.get("/unites", /*middlewareAuth.checkEmploye,*/ uniteController.getAllUnite);
router.get("/unite/:id", uniteController.getByIdUnite);
router.post("/unite", uniteController.addUnite);
router.put("/fonction/:id", uniteController.updateUnite);
router.put("/fonction/:id", uniteController.deleteUnite);
// router.post("/search", aptitudeController.search)
module.exports = router;