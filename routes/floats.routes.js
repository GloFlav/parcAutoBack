const router = require("express").Router();

/**les constantes */
const assuranceController = require("../controllers/assurance.controller");
const degatController = require("../controllers/degat.controller");
const deController = require("../controllers/demandeentretient.controller");
const dvController = require("../controllers/demandevoiture.controller");
const deplacementController = require("../controllers/deplacement.controller");
const itineraireController = require("../controllers/itineraire.controller");
const marqueController = require("../controllers/marque.controller");
const modeleController = require("../controllers/modele.controller");
const pieceController = require("../controllers/piece.controller");
const ptController = require("../controllers/piecetouchee.controller");
const pvController = require("../controllers/piecevoiture.controller");
const vignetteController = require("../controllers/vignette.controller");
const voitureController = require("../controllers/voiture.controller");

/**router on assurance */
router.get("/assurances", assuranceController.getAllAssurance);
router.get("/assurance/:id", assuranceController.getActuelleAssurance);
router.get("/allassurance/:id", assuranceController.getByImmatricule);
router.post("/assurance", assuranceController.addAssurance);
router.put("/assurance/:id", assuranceController.updateAssurance);

/**router on degat */
router.get("/degats", degatController.getAllDegat);
router.get("/degat/:id", degatController.getByCodeDegat);
router.post("/degat", degatController.addDegat);
router.put("/degat/:id", degatController.updateDegat);
router.put("/deletedegat/:id", degatController.deleteDegat);

/**router on demande entretient */
router.get("/des", deController.getAllDE);
router.get("/de/:id", deController.getByImmatricule);
router.post("/de", deController.addDE);
router.put("/de/:id", deController.updateDE);

/**router on demande voiture */
router.get("/dvs", dvController.getAllDV);
router.get("/dv/:id", dvController.getByMatricule);
router.post("/dv", dvController.addDV);
router.put("/dv/:id", dvController.updateDV);
router.put("/validerdv/:id", dvController.validerDV);

/**router on deplacement  */
router.get("/deplacements", deplacementController.getAllDeplacement);
router.get("/deplacement/:id", deplacementController.getByImmatricule);
router.get("/deplacementday/", deplacementController.getByDay);
router.post("/deplacement", deplacementController.addDeplacement);
router.put("/deplacement/:id", deplacementController.updateDeplacement);

/**router on itineraire */
router.get("/itineraires", itineraireController.getAllItineraire);
router.get("/itineraire/:id", itineraireController.getByIdItineraire);
router.post("/itineraire", itineraireController.addItineraire);
router.put("/itineraire/:id", itineraireController.updateItineraire);

/**router on marque */
router.get("/marques", marqueController.getAllMarque);
router.get("/marque/:id", marqueController.getByIdMarque);
router.post("/marque", marqueController.addMarque);
router.put("/marque/:id", marqueController.updateMarque);
router.put("/deletemarque/:id", marqueController.deleteMarque);

/**router on modele */
router.get("/modeles", modeleController.getAllModele);
router.get("/modele/:id", modeleController.getByIdModele);
router.get("/modelemarque/:id", modeleController.getByIdMarque);
router.post("/modele", modeleController.addModele);
router.put("/modele/:id", modeleController.updateModele);
router.put("/deletemodele/:id", modeleController.deleteModele);

/**router on piece */
router.get("/pieces", pieceController.getAllPiece);
router.get("/piece/:id", pieceController.getByIdPiece);
router.post("/piece", pieceController.addPiece);
router.put("/piece/:id", pieceController.updatePiece);
router.put("/deletemodele/:id", pieceController.deletePiece);

/**router on piece touchee */
router.get("/pts", ptController.getAllPT);
router.get("/pts/:id", ptController.getByImmatricule);
router.get("/pt/:id", ptController.getByNumeroSeriePiece);
router.post("/pt", ptController.addPT);

/**router on piece voiture */
router.get("/pvs", pvController.getAllPiecevoiture);
router.get("/pvs/:id", pvController.getByImmatricule);
router.get("/pvetat/:id", pvController.getByEtat);
router.post("/pv", pvController.addPiecevoiture);
router.put("/pv/:id", pvController.updatePiecevoiture);
router.delete("/deletepv/:id", pvController.deletePiecevoiture);

/**router on piece touchee */
router.get("/pts", ptController.getAllPT);
router.get("/pts/:id", ptController.getByImmatricule);
router.get("/pt/:id", ptController.getByNumeroSeriePiece);
router.post("/pt", ptController.addPT);

/**router on vignette */
router.get("/vignettes", vignetteController.getAllVignette);
router.get("/vignette/:id", vignetteController.getActuelleVignette);
router.get("/vignettes/:id", vignetteController.getByImmatricule);
router.post("/vignette", vignetteController.addVignette);
router.put("/vignette/:id", vignetteController.updateVignette);

/**router on  voiture */
router.get("/voitures", voitureController.getAllVoiture);
router.get("/voiturelibres", voitureController.getVoitureLibre);
router.get("/voiture/:id", voitureController.getByImmatricule);
router.get("/voiturechauffeur/:id", voitureController.getByMatricule);
router.get("/voituresmodele/:id", voitureController.getByIdModele);
router.get("/voituresmarque/:id", voitureController.getByIdMarque);
router.get("/voituresstatus/:id", voitureController.getByStatus);
router.post("/voiture", voitureController.addVoiture);
router.put("/pv/:id", voitureController.updateVoiture);
router.delete("/deletevoiture/:id", voitureController.deleteVoiture);

module.exports = router;