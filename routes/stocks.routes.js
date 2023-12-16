const router = require("express").Router();

/**les constantes */
const bdeController = require("../controllers/bonentreeproduit.controller");
const bdsController = require("../controllers/bonsortieproduit.controller");
const depController = require("../controllers/demandeentreeproduit.controller");
const fournisseurController = require("../controllers/fournisseur.controller");
const memoController = require("../controllers/memorandum.controller");
const produitController = require("../controllers/produit.controller");
const pdController = require("../controllers/produitdemande.controller");
const psController = require("../controllers/produitsollicite.controller");

/**router on bde */
router.get("/bdes", bdeController.getAllBDE);
router.get("/bdeemploye/:id", bdeController.getByMatricule);
router.get("/bdefournisseur/:id", bdeController.getByIdFournisseur);
router.get("/bdeDep/:id", bdeController.getByDEP);
router.post("/bde", bdeController.addBDE);
router.put("/bde/:id", bdeController.updateBDE);

/**router on bds */
router.get("/bdss", bdsController.getAllBDS);
router.get("/bdsmemo/:id", bdsController.getByMemorandum);
router.post("/bds", bdsController.addBDS);
router.put("/bds/:id", bdsController.updateBDS);

/**router on demande entree produit */
router.get("/deps", depController.getAllDEP);
router.get("/dep/:id", depController.getByMatricule);
router.post("/dep", depController.addDEP);
router.put("/dep/:id", depController.updateDEP);
router.put("/validerdep/:id", depController.validerDEP);

/**router on fournisseur */
router.get("/fournisseurs", fournisseurController.getAllFournisseur);
router.get("/fournisseur/:id", fournisseurController.getByIdFournisseur);
router.post("/fournisseur", fournisseurController.addFournisseur);
router.put("/fournisseur/:id", fournisseurController.updateFournisseur);
router.put("/fournisseur/:id", fournisseurController.deleteFournisseur);

/**router on memorandum */
router.get("/memos", memoController.getAllMemorandum);
router.get("/sommememos", memoController.getSommeMemo);
router.get("/currentmemos", memoController.getMemorandumMonth);
router.get("/memounite/:id", memoController.getByUnite);
router.get("/memoemploye/:id", memoController.getByMatricule);
router.post("/memo", memoController.addMemorandum);
router.put("/memo/:id", memoController.updateMemorandum);
router.put("/validerchef/:id", memoController.validerChefMemorandum);
router.put("/validerlog/:id", memoController.validerLogMemorandum);

/**router on produit */
router.get("/produits", produitController.getAllProduit);
router.get("/produit/:id", produitController.getByCodeImmatricule);
router.post("/produit", produitController.addProduit);
router.put("/produit/:id", produitController.updateProduit);
router.put("/etatproduit/:id", produitController.updateEtatProduit);
router.put("/produit", produitController.deleteProduit);
router.get("/recherche/:valeur", produitController.searchProduit)

/**router on produit demandé */
router.get("/produitdemandes/:id", pdController.getByNumeroMemorandum);
router.post("/produitdemande", pdController.addProduitdemande);
router.put("/produitdemande/:id", pdController.updateProduitdemande);

/**router on produit sollicité par le bds */
router.get("/produitsollicites", psController.getAllProduitdemande);
router.get("/produitsollicite/:id", psController.getByNumeroDemandeentreeproduit);
router.post("/produitsollicite", psController.addProduitsollicite);
router.put("/produitsollicite/:id", psController.updateProduitsollicite);
// router.post("/search", aptitudeController.search)
module.exports = router;