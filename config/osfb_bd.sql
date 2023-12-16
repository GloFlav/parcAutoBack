
/****** CREATION BASE DE DONNÉES ********/
/**** OSFB = Onn Stock Float Board ****/
create database osfb_db;

use osfb_db;

show tables;

/******************************************************/
/*****************==CREATION TABLE==*******************/

/**** CREATION TABLE ORN ==> SECTION REGIONALE DE L'ONN ****/

CREATE TABLE orn (
    codePostal INT(3) NOT NULL,
    nomRegion VARCHAR(24) NOT NULL,
    coordonnees VARCHAR(32) DEFAULT NULL,
    PRIMARY KEY (codePostal)
);

/**** CREATION TABLE unite ==> departement composant un ORN****/

CREATE TABLE unite (
    idUnite INT(3) NOT NULL AUTO_INCREMENT,
    appelation VARCHAR(32) NOT NULL,
    codePostal INT(3) NOT NULL,
    PRIMARY KEY (idUnite),
    FOREIGN KEY (codePostal) REFERENCES orn (codePostal)

);

/**** CREATION TABLE fonction ==> fonction attribué à chaque ****/

CREATE TABLE fonction (
    idFonction INT(4) NOT NULL AUTO_INCREMENT,
    roles VARCHAR(32) NOT NULL,
    rang INT(2) NOT NULL,
    idUnite INT(3) NOT NULL,
    PRIMARY KEY (idFonction),
    FOREIGN KEY (idUnite) REFERENCES unite (idUnite)

);

/**** CREATION TABLE employe ==> employé de l'ONN affecté a une fonction dans une unité ****/

CREATE TABLE employe (
    matricule VARCHAR(10) NOT NULL,
    nom VARCHAR(32) NOT NULL,
    prenoms VARCHAR(64) DEFAULT NULL,
    photoIdentite VARCHAR(255) DEFAULT NULL,
    mail VARCHAR(32) NOT NULL,
    motDePasse VARCHAR(32) NOT NULL,
    rang INT(2) NOT NULL,
    idFonction INT(4) NOT NULL,
    PRIMARY KEY (matricule),
    FOREIGN KEY (idFonction) REFERENCES fonction (idFonction)
);


/**** CREATION TABLE aptitude ==> appelation de chaque diplome ou attestation de chaque employé ****/

CREATE TABLE aptitude (
    idAptitude INT(4) NOT NULL AUTO_INCREMENT,
    categorie VARCHAR(32) NOT NULL,
    matricule VARCHAR(10) NOT NULL,
    PRIMARY KEY (idAptitude),
    FOREIGN KEY (matricule) REFERENCES employe (matricule)
);


/************************************************************************/
/**** CREATION TABLE fournisseur ==> fournisseur des materiaux de l'ONN pour leur traçabilité ****/

CREATE TABLE fournisseur (
    idFournisseur int(5) NOT NULL AUTO_INCREMENT,
    nomMagasin VARCHAR(32) NOT NULL,
    coordonneesMagasin VARCHAR(64) NOT NULL,
    raisonFIdelisation VARCHAR(128) NOT NULL,
    PRIMARY KEY (idFournisseur)
);


/************************************************************************/
/**** CREATION TABLE produit ==> produits au sein de l'onn ****/

CREATE TABLE produit (
    codeImmatricule VARCHAR(16) NOT NULL,
    nomProduit VARCHAR(32) NOT NULL,
    quantiteCumulee INT(10) NOT NULL,
    quantiteActuelle INT(10) NOT NULL,
    quantiteSeuille INT(10) NOT NULL,
    PRIMARY KEY (codeImmatricule)
);

/**** CREATION TABLE pieceProduit ==> une unité de produit  ****/

CREATE TABLE pieceProduit (
    numeroSerie VARCHAR(16) NOT NULL ,
    etatPiece VARCHAR(32) DEFAULT 'BON ETAT',
    codeImmatricule VARCHAR(16) NOT NULL,
    PRIMARY KEY (numeroSerie),
    FOREIGN KEY (codeImmatricule) REFERENCES produit (codeImmatricule)
);


/**** CREATION TABLE memorandum ==> demande de produit existant dans l'amoire de l'ONN****/

CREATE TABLE memorandum (
    numeroMemorandum INT(16) NOT NULL AUTO_INCREMENT,
    dateEnvoie DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateReception DATETIME DEFAULT NULL,
    validationChef VARCHAR(16) DEFAULT 'EN ATTENTE',
    validationLog VARCHAR(16) DEFAULT 'EN ATTENTE',
    objet VARCHAR(64) DEFAULT 'DEMANDE DE FOURNITURE QUELCONQUE',
    destinataires VARCHAR(32) DEFAULT 'POUR TOUTE L UNITE',
    matricule VARCHAR(10) NOT NULL,
    PRIMARY KEY (numeroMemorandum),
    FOREIGN KEY (matricule) REFERENCES employe (matricule)
);

/**** CREATION TABLE produitDemandé ==> produit demandé dans un memorandum ( table relation memorandum produit )****/
CREATE TABLE produitDemande (
    idProduitDemande INT(16) NOT NULL AUTO_INCREMENT,
    quantiteDemande INT(10) NOT NULL,
    codeImmatricule VARCHAR(16) NOT NULL ,
    numeroMemorandum INT(16) NOT NULL ,
    PRIMARY KEY (IdProduitDemande),
    FOREIGN KEY (codeImmatricule) REFERENCES produit (codeImmatricule),
    FOREIGN KEY (numeroMemorandum) REFERENCES memorandum (numeroMemorandum)
);

/**** CREATION TABLE demandeEntreeProduit ==> demande d'ajout de produit pour l'ONN****/

CREATE TABLE demandeEntreeProduit (
    numeroDEP INT(16) NOT NULL AUTO_INCREMENT,
    dateDemande DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    validationDEP VARCHAR(16) DEFAULT 'EN ATTENTE',
    motif VARCHAR(64) DEFAULT 'DEMANDE DE FOURNITURE QUELCONQUE',
    matricule VARCHAR(10) NOT NULL,
    PRIMARY KEY (numeroDEP),
    FOREIGN KEY (matricule) REFERENCES employe (matricule)
);


/**** CREATION TABLE demandeEntreeProduit ==> demande d'ajout de produit pour l'ONN****/

CREATE TABLE demandeEntreeProduit (
    numeroDEP INT(16) NOT NULL AUTO_INCREMENT,
    dateDemande DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    validationDEP VARCHAR(16) DEFAULT 'EN ATTENTE',
    motif VARCHAR(64) DEFAULT 'DEMANDE DE FOURNITURE QUELCONQUE',
    matricule VARCHAR(10) NOT NULL,
    PRIMARY KEY (numeroDEP),
    FOREIGN KEY (matricule) REFERENCES employe (matricule)
);


/**** CREATION TABLE produitSollicite ==> produit demandé dans un DEP ( table relation DEP produit )****/

CREATE TABLE produitSollicite (
    idProduitSollicite INT(16) NOT NULL AUTO_INCREMENT,
    quantiteSollicitee INT(10) NOT NULL,
    codeImmatricule VARCHAR(16) NOT NULL ,
    numeroDEP INT(16) NOT NULL ,
    PRIMARY KEY (idProduitSollicite),
    FOREIGN KEY (codeImmatricule) REFERENCES produit (codeImmatricule),
    FOREIGN KEY (numeroDEP) REFERENCES demandeEntreeProduit (numeroDEP)
);

/**** CREATION TABLE bonEntreeProduit ==> BDE DE L'ONN () ****/
CREATE TABLE bonEntreeProduit(
    idBDE INT(16) NOT NULL AUTO_INCREMENT,
    dateEntree DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantiteEntree INT(10) NOT NULL,
    prixUnitaire INT(16) DEFAULT NULL,
    matricule VARCHAR(10) NOT NULL,
    idProduitSollicite INT(16) NOT NULL ,
    codeImmatricule VARCHAR(16) NOT NULL ,
    idFournisseur int(5) NOT NULL,
    PRIMARY KEY (idBDE),
    FOREIGN KEY (codeImmatricule) REFERENCES produit (codeImmatricule),
    FOREIGN KEY (matricule) REFERENCES employe (matricule),
    FOREIGN KEY (idFournisseur) REFERENCES fournisseur (idFournisseur),
    FOREIGN KEY (idProduitSollicite) REFERENCES produitSollicite (numeroDEP)    
);

/**** CREATION TABLE bonSortieProduit ==> BDS DE L'ONN () ****/
CREATE TABLE bonSortieProduit(
    idBDS INT(16) NOT NULL AUTO_INCREMENT,
    dateSortie DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantiteSortie INT(10) NOT NULL,
    matricule VARCHAR(10) NOT NULL,
    idProduitDemande INT(16) NOT NULL ,
    codeImmatricule VARCHAR(16) NOT NULL ,
    PRIMARY KEY (idBDS),
    FOREIGN KEY (codeImmatricule) REFERENCES produit (codeImmatricule),
    FOREIGN KEY (matricule) REFERENCES employe (matricule),
    FOREIGN KEY (idProduitDemande) REFERENCES produitDemande (idProduitDemande)    
);


/********************PARC AUTO**************************/
/**** CREATION TABLE MARQUE ==> MARQUE DE VOITURE ****/
CREATE TABLE marque(
    idMarque INT(3) NOT NULL AUTO_INCREMENT,
    nomMarque VARCHAR(16) NOT NULL,
    logoMarque VARCHAR(255) NOT NULL,
    PRIMARY KEY (idMarque)  
);


/**** CREATION TABLE modele ==> modele de voiture () ****/
CREATE TABLE modele(
    idModele INT(4) NOT NULL AUTO_INCREMENT,
    nomModele VARCHAR(32) NOT NULL,
    carburant VARCHAR(16) DEFAULT 'GAZ OIL',
    nombrePlaces INT(2) DEFAULT '5',
    idMarque INT(3) NOT NULL,
    PRIMARY KEY (idModele),
    FOREIGN KEY (idMarque) REFERENCES marque (idMarque)
);



/**** CREATION TABLE piece ==> piece composant les voitures de voiture () ****/
CREATE TABLE piece(
    idPiece INT(4) NOT NULL AUTO_INCREMENT,
    nomPiece VARCHAR(32) NOT NULL,
    PRIMARY KEY (idPiece)
);



/**** CREATION TABLE degat ==> type de degat existant que peuvent subir les voitures ****/
CREATE TABLE degat(
    codeDegat INT(4) NOT NULL AUTO_INCREMENT,
    typeDegat VARCHAR(32) NOT NULL,
    descriptions VARCHAR(64) NOT NULL,
    consequence VARCHAR(64) DEFAULT NULL,
    PRIMARY KEY (codeDegat)
);



/**** CREATION TABLE voiture ==> voiture () ****/
CREATE TABLE voiture(
    immatricule VARCHAR(8) NOT NULL ,
    nomModele VARCHAR(32) NOT NULL,
    couleur VARCHAR(16) DEFAULT 'BLANC',
    matricule VARCHAR(10) DEFAULT NULL,
    photoVoiture VARCHAR(255) DEFAULT NULL,
    kilometrage INT(8) DEFAULT '0',
    dateAquisition DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idModele INT(3) NOT NULL,
    PRIMARY KEY (immatricule),
    FOREIGN KEY (matricule) REFERENCES employe (matricule),
    FOREIGN KEY (idModele) REFERENCES modele (idModele)
);



/**** CREATION TABLE assurance ==> assurance des voitures ****/
CREATE TABLE assurance(
    numeroAssurance INT(8) NOT NULL AUTO_INCREMENT,
    dateContrat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateFinContrat DATETIME,
    montantC int(8) NOT NULL,
    agence VARCHAR(32) NOT NULL,
    immatricule VARCHAR(8) NOT NULL,
    PRIMARY KEY (numeroAssurance),
    FOREIGN KEY (immatricule) REFERENCES voiture (immatricule)
);

/**** CREATION TABLE vignette ==> vignette des voitures ****/
CREATE TABLE vignette(
    numeroVignette INT(8) NOT NULL AUTO_INCREMENT,
    dateVignette DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateFinVignette DATETIME,
    montantV int(8) NOT NULL,
    immatricule VARCHAR(8) NOT NULL,
    PRIMARY KEY (numeroVignette),
    FOREIGN KEY (immatricule) REFERENCES voiture (immatricule)
);


/**** CREATION TABLE pieceVoiture ==> piece Composant une voitures (table relation entre voiture et piece ) ****/
CREATE TABLE pieceVoiture(
    numeroSeriePiece VARCHAR(32) NOT NULL ,
    etat VARCHAR(16) DEFAULT 'BON ETAT',
    kilometrageAjout int(8) DEFAULT '0',
    kilometrageEstime int(8) DEFAULT NULL,
    valeur int(8) NOT NULL,
    immatricule VARCHAR(8) NOT NULL,
    idPiece INT(4) NOT NULL,
    idFournisseur INT(5) NOT NULL,
    PRIMARY KEY (numeroSeriePiece),
    FOREIGN KEY (immatricule) REFERENCES voiture (immatricule),
    FOREIGN KEY (idPiece) REFERENCES piece (idPiece),
    FOREIGN KEY (idFournisseur) REFERENCES fournisseur (idFournisseur)
);


/**** CREATION TABLE itineraire ==> itineraires possibles****/
CREATE TABLE itineraire(
    idItineraire INT(8) NOT NULL AUTO_INCREMENT,
    depart VARCHAR(32) NOT NULL,
    arrivee VARCHAR(32) NOT NULL,
    distanceEstimee INT(8) NOT NULL,
    PRIMARY KEY (idItineraire)
);


/**** CREATION TABLE demandeEntretient****/
CREATE TABLE demandeEntretient(
    idDE INT(8) NOT NULL AUTO_INCREMENT,
    dateDeclaration DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateConstatation DATETIME NOT NULL,
    codeDegat INT(4) NOT NULL,
    immatricule VARCHAR(8) NOT NULL,
    PRIMARY KEY (idDE),
    FOREIGN KEY (codeDegat) REFERENCES degat (codeDegat),
    FOREIGN KEY (immatricule) REFERENCES voiture (immatricule)

);

/**** CREATION TABLE degatDemandeEntretient (table relation demandeEntretien et degat)****/
CREATE TABLE pieceTouchee(
    idPT INT(8) NOT NULL AUTO_INCREMENT,
    numeroSeriePiece VARCHAR(32) NOT NULL,
    idDE INT(8) NOT NULL,
    PRIMARY KEY (idPT),
    FOREIGN KEY (idDE) REFERENCES demandeEntretient (idDE),
    FOREIGN KEY (numeroSeriePiece) REFERENCES pieceVoiture (numeroSeriePiece)
);



/**** CREATION TABLE demandeVoiture (demande utilisation voiture)****/
CREATE TABLE demandeVoiture(
    numeroDemandeVoiture INT(8) NOT NULL AUTO_INCREMENT,
    matricule VARCHAR(10) NOT NULL,
    raison VARCHAR(10) DEFAULT NULL,
    detailRaison VARCHAR(128) DEFAULT NULL,
    dateHeureUtilisation DATETIME NOT NULL,
    dureeUtilisation INT(8) DEFAULT '1',
    validationDemande VARCHAR(16) DEFAULT "EN ATTENTE",
    PRIMARY KEY (numeroDemandeVoiture),
    FOREIGN KEY (matricule) REFERENCES employe (matricule)
);

/**** CREATION TABLE deplacement ==> deplacement reelle d'une voiture****/
CREATE TABLE deplacement(
    numeroDeplacement INT(8) NOT NULL AUTO_INCREMENT,
    immatricule VARCHAR(8) NOT NULL,
    dateHeureDepart DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateHeureArrivee DATETIME NOT NULL,
    nombrePassagers INT(8) NOT NULL,
    jaugeDepat INT(8) NOT NULL,
    jaugeArrivee INT(8) NOT NULL,
    idItineraire INT(8) NOT NULL,
    numeroDemandeVoiture INT(8) NOT NULL,
    PRIMARY KEY (numeroDeplacement),
    FOREIGN KEY (idItineraire) REFERENCES itineraire (idItineraire),
    FOREIGN KEY (numeroDemandeVoiture) REFERENCES demandevoiture (numeroDemandeVoiture),
    FOREIGN KEY (immatricule) REFERENCES voiture (immatricule)
);