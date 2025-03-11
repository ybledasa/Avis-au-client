// 🔹 Importation de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔹 Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCl46lrkQejIIz24g1P7Qt2ktNbG0MML4o",
    authDomain: "avis-au-client.firebaseapp.com",
    projectId: "avis-au-client",
    storageBucket: "avis-au-client.appspot.com",
    messagingSenderId: "291367297087",
    appId: "1:291367297087:web:09beaf7794126fc79bd88a",
    measurementId: "G-WESSM7PQZM"
};

// 🔹 Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let listeAvis = []; // Stocker les avis pour la recherche

// ✅ Fonction pour récupérer et afficher les avis triés par date (du plus récent au plus ancien)
async function afficherAvis() {
    const avisContainer = document.getElementById("avisContainer");
    avisContainer.innerHTML = "<p>Chargement des avis...</p>";

    try {
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Effacer le message de chargement
        listeAvis = []; // Réinitialiser la liste des avis

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let dateSoumission = data.date ? new Date(data.date).toLocaleString() : "Non précisé";

            // Ajouter chaque avis à la liste pour permettre la recherche
            listeAvis.push({
                id: doc.id,
                nom: data.nomPrenom || "Non précisé",
                date: dateSoumission,
                sexe: data.sexe || "Non précisé",
                hopital: data.hopital || "Non précisé",
                motif: data.motif || "Non précisé",
                accueil: data.accueil || "Non précisé",
                attente: data.attente || "Non précisé",
                ecoute: data.ecoute || "Non précisé",
                experience: data.experience || "Non précisé",
                recommandation: data.recommandation || "Non précisé",
                suggestion: data.suggestion || "Aucune",
            });
        });

        // Afficher les avis après chargement
        afficherListeAvis(listeAvis);

    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        avisContainer.innerHTML = "<p>Erreur lors du chargement des avis.</p>";
    }
}

// ✅ Fonction pour afficher les avis à partir d'une liste donnée
function afficherListeAvis(avis) {
    const avisContainer = document.getElementById("avisContainer");
    avisContainer.innerHTML = ""; // Vider la liste avant d'afficher les résultats

    avis.forEach((data) => {
        let avisDiv = document.createElement("div");
        avisDiv.classList.add("avis-card"); // Ajout d'une classe CSS pour le style
        avisDiv.innerHTML = `
            <p><strong>Nom :</strong> ${data.nom}</p>
            <p><strong>Date :</strong> ${data.date}</p>
            <p><strong>Sexe :</strong> ${data.sexe}</p>
            <p><strong>Hôpital :</strong> ${data.hopital}</p>
            <p><strong>Motif :</strong> ${data.motif}</p>
            <p><strong>Accueil :</strong> ${data.accueil}</p>
            <p><strong>Attente :</strong> ${data.attente}</p>
            <p><strong>Écoute :</strong> ${data.ecoute}</p>
            <p><strong>Expérience :</strong> ${data.experience}</p>
            <p><strong>Recommandation :</strong> ${data.recommandation}</p>
            <p><strong>Suggestion :</strong> ${data.suggestion}</p>
            <hr>
        `;
        avisContainer.appendChild(avisDiv);
    });
}

// ✅ Fonction pour filtrer les avis en fonction du texte entré dans la barre de recherche
function filtrerAvis() {
    let recherche = document.getElementById("searchInput").value.toLowerCase();
    let avisFiltres = listeAvis.filter(avis => 
        avis.nom.toLowerCase().includes(recherche) || 
        avis.date.toLowerCase().includes(recherche)
    );
    
    afficherListeAvis(avisFiltres);
}

// 🔹 Exécuter la fonction après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherAvis);
