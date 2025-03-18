// 🔹 Importation de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// ✅ Récupérer le paramètre `motif` depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const motif = urlParams.get("motif");
document.getElementById("motif-title").textContent = motif || "Service inconnu";

// ✅ Récupérer les hôpitaux pour ce service
async function afficherHopitauxParService() {
    const hopitauxContainer = document.getElementById("hopitaux-container");
    hopitauxContainer.innerHTML = "<p>Chargement...</p>";

    if (!motif) {
        hopitauxContainer.innerHTML = "<p>Service non spécifié.</p>";
        return;
    }

    try {
        const q = query(collection(db, "avisPatients"), where("motif", "==", motif));
        const querySnapshot = await getDocs(q);

        hopitauxContainer.innerHTML = ""; // Effacer le message de chargement

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let hopitalDiv = document.createElement("div");
            hopitalDiv.classList.add("hopital-card");
            hopitalDiv.innerHTML = `
                <h3>${data.hopital}</h3>
                <p>Note : ${data.recommandation || "Non noté"}</p>
            `;
            hopitauxContainer.appendChild(hopitalDiv);
        });

    } catch (error) {
        console.error("Erreur lors du chargement :", error);
        hopitauxContainer.innerHTML = "<p>Erreur lors du chargement.</p>";
    }
}

// 🔹 Charger les hôpitaux après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherHopitauxParService);
