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

// ✅ Fonction pour afficher les avis avec filtres et recherche
async function afficherAvis(filtreMotif = "all", filtreEmplacement = "all", searchQuery = "") {
    const avisContainer = document.getElementById("avisContainer");
    avisContainer.innerHTML = "<p>Chargement des avis...</p>";

    try {
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Efface le message de chargement

        let avisTrouves = false;

        querySnapshot.forEach((doc) => {
            let data = doc.data();

            // Vérification des filtres appliqués
            if ((filtreMotif !== "all" && data.motif !== filtreMotif) ||
                (filtreEmplacement !== "all" && data.hopital !== filtreEmplacement)) {
                return;
            }

            // Vérification du filtre de recherche
            if (searchQuery && !data.hopital.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !data.motif.toLowerCase().includes(searchQuery.toLowerCase())) {
                return;
            }

            // 🔹 Calcul de la moyenne des étoiles
            let accueilScore = parseInt(data.accueil) || 0;
            let ecouteScore = parseInt(data.ecoute) || 0;
            let moyenneStars = (accueilScore + ecouteScore) / 2;
            let etoilesMoyenne = genererEtoiles(moyenneStars);

            let etoiles = genererEtoiles(data.recommandation || 0);
            let dateFormatted = formaterDate(data.date);

            // Création de l'affichage de l'avis
            let avisDiv = document.createElement("div");
            avisDiv.classList.add("avis-card");

            avisDiv.innerHTML = `
                <div class="avis-logo">${data.hopital ? data.hopital.charAt(0) : "?"}</div>
                <div class="avis-content">
                    <div class="avis-header">
                        <span>${data.hopital || "Hôpital non précisé"}</span>
                    </div>
                    <div class="avis-stars">${etoiles}</div>
                    <p><strong>Service :</strong> ${data.motif || "Non précisé"}</p>
                    <p>${data.experience || "Aucune expérience détaillée"}</p>
                    <p><strong>Date :</strong> ${dateFormatted}</p>

                    <!-- 🔹 Synthèse des étoiles -->
                    <div class="avis-summary">
                        <p><strong>Évaluation moyenne :</strong> ${etoilesMoyenne} (${moyenneStars.toFixed(1)}/5)</p>
                       
                    </div>
                </div>
            `;

            avisContainer.appendChild(avisDiv);
            avisTrouves = true;
        });

        if (!avisTrouves) {
            avisContainer.innerHTML = "<p>Aucun avis trouvé.</p>";
        }

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
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// ✅ Charger les filtres dynamiques (services et emplacements)
async function chargerFiltres() {
    const emplacementFiltre = document.getElementById("emplacement-filtre");
    const categoriesList = document.getElementById("categories-list");

    emplacementFiltre.innerHTML = `<option value="all">Tous</option>`;
    categoriesList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "avisPatients"));
    let emplacements = new Set();
    let categories = new Map();

    querySnapshot.forEach((doc) => {
        let data = doc.data();
        if (data.hopital) emplacements.add(data.hopital);
        if (data.motif) categories.set(data.motif, (categories.get(data.motif) || 0) + 1);
    });

    // 🔹 Ajout des options d'emplacements
    emplacements.forEach((emplacement) => {
        let option = document.createElement("option");
        option.value = emplacement;
        option.textContent = emplacement;
        emplacementFiltre.appendChild(option);
    });

    // 🔹 Ajout des services avec nombre d’avis
    categories.forEach((count, categorie) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#" class="category-link" data-motif="${categorie}">${categorie}</a> (${count})`;
        categoriesList.appendChild(listItem);
    });

    // 🔹 Gestion des clics sur les catégories
    document.querySelectorAll(".category-link").forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            let motifSelectionne = event.target.getAttribute("data-motif");
            afficherAvis(motifSelectionne, emplacementFiltre.value);
        });
    });

    // 🔹 Gestion du filtre emplacement
    emplacementFiltre.addEventListener("change", () => {
        afficherAvis("all", emplacementFiltre.value);
    });
}

// ✅ Gestion de la recherche dynamique
document.getElementById("searchInput").addEventListener("input", (event) => {
    const searchQuery = event.target.value.trim();
    afficherAvis("all", "all", searchQuery);
});

// ✅ Charger les avis et les filtres au démarrage
document.addEventListener("DOMContentLoaded", async () => {
    await chargerFiltres();
    await afficherAvis();
});
