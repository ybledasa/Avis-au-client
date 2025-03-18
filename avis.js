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

// ✅ Fonction pour afficher les avis
async function afficherAvis() {
    const avisContainer = document.getElementById("avisContainer");
    avisContainer.innerHTML = "<p>Chargement des avis...</p>";

    try {
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Efface le message de chargement

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let etoiles = genererEtoiles(data.recommandation || 0);
            let dateFormatted = formaterDate(data.date);

            let avisDiv = document.createElement("div");
            avisDiv.classList.add("avis-card");

            avisDiv.innerHTML = `
                <div class="avis-logo">${data.hopital.charAt(0)}</div>
                <div class="avis-content">
                    <div class="avis-header">
                        <span>${data.hopital || "Hôpital non précisé"}</span>
                       
                    </div>
                    <div class="avis-stars">${etoiles}</div>
                    <p><strong>Service :</strong> ${data.motif || "Non précisé"}</p>
                    <p>${data.experience || "Aucune expérience détaillée"}</p>
                    <p><strong></strong> ${dateFormatted}</p>
                </div>
            `;

            avisContainer.appendChild(avisDiv);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des avis :", error);
        avisContainer.innerHTML = "<p>Erreur lors du chargement des avis.</p>";
    }
}


// ✅ Fonction pour générer des étoiles ⭐⭐⭐⭐☆
function genererEtoiles(note) {
    return "★".repeat(Math.floor(note)) + "☆".repeat(5 - Math.floor(note));
}

// ✅ Fonction pour formater la date
function formaterDate(dateStr) {
    let date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// 🔹 Charger les avis après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherAvis);
