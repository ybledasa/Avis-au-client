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
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Effacer le message de chargement

        let avisParHopital = {}; // Stocker les avis regroupés par hôpital

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let dateSoumission = data.date ? new Date(data.date).toLocaleString() : "Non précisé";
            let hopital = data.hopital || "Hôpital non précisé";

            if (!avisParHopital[hopital]) {
                avisParHopital[hopital] = [];
            }

            avisParHopital[hopital].push({
                nom: data.nomPrenom || "Non précisé",
                
                sexe: data.sexe || "Non précisé",
                motif: data.motif || "Non précisé",
                accueil: data.accueil || "Non précisé",
                attente: data.attente || "Non précisé",
                ecoute: data.ecoute || "Non précisé",
                experience: data.experience || "Non précisé",
                recommandation: data.recommandation || "Non précisé",
                suggestion: data.suggestion || "Aucune",
                date: dateSoumission,
            });
        });

        // 🔹 Afficher les avis regroupés par hôpital
        for (let hopital in avisParHopital) {
            let hopitalDiv = document.createElement("div");
            hopitalDiv.classList.add("hopital-block");

            let hopitalTitle = document.createElement("h2");
            hopitalTitle.textContent = hopital;
            hopitalDiv.appendChild(hopitalTitle);

            avisParHopital[hopital].forEach((data) => {
                let avisDiv = document.createElement("div");
                avisDiv.classList.add("avis-card");
                avisDiv.innerHTML = `
                    
                    <p><strong>Motif :</strong> ${data.motif}</p>
                    <p><strong>Accueil :</strong> ${data.accueil}</p>
                    <p><strong>Attente :</strong> ${data.attente}</p>
                    <p><strong>Écoute :</strong> ${data.ecoute}</p>
                    <p><strong>Expérience :</strong> ${data.experience}</p>
                    <p><strong>Recommandation :</strong> ${data.recommandation}</p>
                    <p><strong>Suggestion :</strong> ${data.suggestion}</p>
                    <p><strong>Date :</strong> ${data.date}</p>
                    <hr>
                `;
                hopitalDiv.appendChild(avisDiv);
            });

            avisContainer.appendChild(hopitalDiv);
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        avisContainer.innerHTML = "<p>Erreur lors du chargement des avis.</p>";
    }
}

// 🔹 Exécuter la fonction après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherAvis);
