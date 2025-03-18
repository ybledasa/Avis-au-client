// 🔹 Importation de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// ✅ Fonction pour afficher les avis récents
async function afficherAvisRecents() {
    const avisContainer = document.getElementById("recent-avis-container");
    avisContainer.innerHTML = "<p>Chargement des avis...</p>";

    try {
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Efface le message de chargement

        if (querySnapshot.empty) {
            avisContainer.innerHTML = "<p>Aucun avis disponible.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let etoiles = genererEtoiles(data.recommandation || 0);

            let avisDiv = document.createElement("div");
            avisDiv.classList.add("avis-card");
            avisDiv.innerHTML = `
                <h3>${data.hopital || "Hôpital non précisé"}</h3>
                <p><strong>Service :</strong> ${data.motif || "Non précisé"}</p>
                <p><strong>Note :</strong> ${etoiles}</p>
                <p><strong>Expérience :</strong> ${data.experience || "Aucune description"}</p>
            `;
            avisContainer.appendChild(avisDiv);
        });

        console.log("Avis récents chargés avec succès.");

    } catch (error) {
        console.error("Erreur lors du chargement des avis :", error);
        avisContainer.innerHTML = "<p>Erreur lors du chargement des avis.</p>";
    }
}

// ✅ Récupérer les services (motifs) et compter les avis
async function afficherServices() {
    const servicesContainer = document.getElementById("services-container");
    servicesContainer.innerHTML = "<p>Chargement des services...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "avisPatients"));

        let servicesData = {};

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            if (data.motif) {
                if (!servicesData[data.motif]) {
                    servicesData[data.motif] = { count: 0 };
                }
                servicesData[data.motif].count += 1;
            }
        });

        let servicesArray = Object.entries(servicesData);
        servicesContainer.innerHTML = ""; // Effacer le message de chargement

        if (servicesArray.length === 0) {
            servicesContainer.innerHTML = "<p>Aucun service disponible.</p>";
            return;
        }

        servicesArray.forEach(([motif, info]) => {
            let serviceBlock = document.createElement("div");
            serviceBlock.classList.add("service-block");
            serviceBlock.innerHTML = `
                <h3>${motif}</h3>
                <p>${info.count} avis</p>
                <button onclick="window.location.href='service.html?motif=${encodeURIComponent(motif)}'">
                    Voir les hôpitaux
                </button>
            `;
            servicesContainer.appendChild(serviceBlock);
        });

        console.log("Services chargés avec succès :", servicesData);

    } catch (error) {
        console.error("Erreur lors du chargement des services :", error);
        servicesContainer.innerHTML = "<p>Erreur lors du chargement.</p>";
    }
}

// ✅ Fonction pour générer des étoiles en fonction de la note
function genererEtoiles(note) {
    let etoiles = "";
    for (let i = 1; i <= 5; i++) {
        etoiles += i <= note ? "★" : "☆";
    }
    return etoiles;
}

// 🔹 Charger les données après le chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    afficherAvisRecents();
    afficherServices();
});
