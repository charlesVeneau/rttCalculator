//Création des variables DOM pour afficher resultat calcul

var resultJoursOuvr = document.getElementById("resultJoursOuvr");
var resultJoursTrav = document.getElementById("resultJoursTrav");
var resultCongesPayes = document.getElementById("resultCongesPayes");
var resultRTT = document.getElementById("resultRTT");


//fonction du calcul des RTT

document.getElementById("calculer").addEventListener("click", calculer = (e) => {

    e.preventDefault();



    //Recuperation des données utilisateur
    var debut = document.getElementById("debut").value;
    var fin = document.getElementById("fin").value;
    var joursTravailles = document.getElementById("joursTravailles").value;
    var congesPayes = document.getElementById("congesPayes").value;

    //Reference temps d'une journée type 24h
    var unJour = 24 * 60 * 60 * 1000;

    //tableau pour enregister tout les jours de la période
    var tableauJours = [];

    //méthode avec une boucle while pour ajouter chaque jour dans le tableau
    var calculNbreJours = (premierJour, dernierJour) => {

        var pJ = new Date(premierJour);
        var dJ = new Date(dernierJour);

        while (pJ <= dJ) {
            tableauJours.push(new Date(pJ));
            pJ.setDate(pJ.getDate() + 1);
        }
        return tableauJours;
    }

    //Appelle de la méthode
    calculNbreJours(debut, fin);


    var weekend = 0;

    //Boucle for pour savoir si un jour est un samedi ou un dimanche
    for (let i = 0; i < tableauJours.length; i++) {
        if (tableauJours[i].getDay() === 6 || tableauJours[i].getDay() === 0) {
            weekend++;
        }
    }

    // FIN DU CALCUL DES SAMEDIS ET DIMANCHE //


    // jours fériés //

    var annee = new Date(debut).getFullYear();
    var jourAn = new Date(annee, 00, 01, 01);
    var feteTrav = new Date(annee, 04, 01, 01);
    var feteVict = new Date(annee, 04, 08, 01);
    var feteNat = new Date(annee, 06, 14, 01);
    var assomption = new Date(annee, 07, 15, 01);
    var toussaint = new Date(annee, 10, 01, 01);
    var armistice = new Date(annee, 10, 11, 01);
    var noel = new Date(annee, 11, 25, 01);
    var tableauJoursFeries = [jourAn, feteTrav, feteVict, feteNat, assomption, toussaint, armistice, noel];

    //variable incrementable des jours feries en semaine (lundi de paques, ascension, pentecôte)

    var joursFeriesSem = 3;

    //Comparaison des deux tableaux (tableauJours et joursFeries), recherche des concordances et incrementation d'une variable si un jour ferié est en semaine

    for (var i = 0; i < tableauJoursFeries.length; i++) {
        if (tableauJours.indexOf(tableauJoursFeries[i])) {
            if (tableauJoursFeries[i].getDay() !== 6) {
                if (tableauJoursFeries[i].getDay() !== 0) {
                    joursFeriesSem++;
                }
            }
        }
    }


    //Nombre de jours ouvrés
    var nbreJoursOuvres = tableauJours.length - weekend - joursFeriesSem - congesPayes;

    //Nombre de RTT
    var joursRTT = nbreJoursOuvres - joursTravailles;

    //Affichage des paramètres utilisateurs
    resultJoursOuvr.innerHTML = nbreJoursOuvres;
    resultJoursTrav.innerHTML = joursTravailles;
    resultCongesPayes.innerHTML = congesPayes;
    resultRTT.innerHTML = joursRTT;
})
