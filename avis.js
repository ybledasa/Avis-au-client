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

// ✅ Fonction pour récupérer et afficher les avis triés par date (du plus récent au plus ancien)
async function afficherAvis() {
    const avisContainer = document.getElementById("avisContainer");
    avisContainer.innerHTML = "<p>Chargement des avis...</p>";

    try {
        // 🔹 Récupérer les avis en les triant par "date" (du plus récent au plus ancien)
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Effacer le message de chargement

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            
            // 🔹 Vérifier si certaines valeurs sont `undefined`
            let dateSoumission = data.date ? new Date(data.date).toLocaleString() : "Non précisé";

            let avisDiv = document.createElement("div");
            avisDiv.classList.add("avis-card"); // Ajout d'une classe CSS pour le style
            avisDiv.innerHTML = `
                <p><strong>Nom :</strong> ${data.nomPrenom || "Non précisé"}</p>
                <p><strong>Âge :</strong> ${data.âge || "Non précisé"}</p>
                <p><strong>Sexe :</strong> ${data.sexe || "Non précisé"}</p>
                <p><strong>Hôpital :</strong> ${data.hopital || "Non précisé"}</p>
                <p><strong>Motif :</strong> ${data.motif || "Non précisé"}</p>
                <p><strong>Motif Autre :</strong> ${data.motifAutre || "Aucun"}</p>
                <p><strong>Accueil :</strong> ${data.accueil || "Non précisé"}</p>
                <p><strong>Attente :</strong> ${data.attente || "Non précisé"}</p>
                <p><strong>Écoute :</strong> ${data.ecoute || "Non précisé"}</p>
                <p><strong>Expérience :</strong> ${data.experience || "Non précisé"}</p>
                <p><strong>Recommandation :</strong> ${data.recommandation || "Non précisé"}</p>
                <p><strong>Suggestion :</strong> ${data.suggestion || "Aucune"}</p>
                <p><strong>Date de Soumission :</strong> ${dateSoumission}</p>
                <hr>
            `;
            avisContainer.appendChild(avisDiv);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        avisContainer.innerHTML = "<p>Erreur lors du chargement des avis.</p>";
    }
}

// 🔹 Exécuter la fonction après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherAvis);
