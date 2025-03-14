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
                nom: data.nomPrenom || "Anonyme",
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
// Fonction pour formater la date correctement
function formaterDate(dateStr) {
    if (!dateStr) {
        return "Date non précisée"; // Gère les cas où la date est absente
    }

    let date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return "Date invalide"; // Si la date est mal formatée
    }

    return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


// 🔹 Afficher les avis regroupés par hôpital
for (let hopital in avisParHopital) {
    let hopitalDiv = document.createElement("div");
    hopitalDiv.classList.add("hopital-block");

    let hopitalTitle = document.createElement("div");
    hopitalTitle.classList.add("hopital-title");
    hopitalTitle.textContent = hopital;

    // Créer un div pour afficher l'avis sélectionné
    let avisDiv = document.createElement("div");
    avisDiv.classList.add("avis-card");

    // Créer un conteneur pour la liste déroulante
    let avisSelectContainer = document.createElement("div");
    avisSelectContainer.classList.add("avis-select-container");

    // Créer la liste déroulante pour sélectionner un avis
    let avisSelect = document.createElement("select");
    avisSelect.classList.add("avis-select");

    // Ajouter une option par défaut "Voir plus d'avis"
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Voir plus d'avis";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    avisSelect.appendChild(defaultOption);

    // Ajouter les avis dans la liste déroulante et gérer l'affichage
    avisParHopital[hopital].forEach((data, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `Avis ${index + 1}`;
        avisSelect.appendChild(option);
    });
      // Fonction pour formater la date correctement
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
    // Fonction pour mettre à jour l'affichage de l'avis sélectionné
    function mettreAJourAvis(index) {
        let data = avisParHopital[hopital][index];

        avisDiv.innerHTML = `
            <div class="avis-header">
                <i class="fa-solid fa-user-circle avis-icon"></i> 
                <span>Avis Anonyme</span>
            </div>
            <p><strong>Motif :</strong> ${data.motif}</p>
            <p><strong>Accueil :</strong> ${data.accueil}</p>
            <p><strong>Attente :</strong> ${data.attente}</p>
            <p><strong>Écoute :</strong> ${data.ecoute}</p>
            <p><strong>Expérience :</strong> ${data.experience}</p>
            <p><strong>Recommandation :</strong> ${data.recommandation}</p>
            <p><strong>Suggestion :</strong> ${data.suggestion}</p>
            <p>${formaterDate(data.date)}</p>
        `;
    }
  // Afficher le premier avis par défaut
  mettreAJourAvis(0);

  // Masquer le sélecteur si l'hôpital n'a qu'un seul avis
  if (avisParHopital[hopital].length > 1) {
      avisSelect.addEventListener("change", function () {
          mettreAJourAvis(this.value);
      });

      avisSelectContainer.appendChild(avisSelect);
  }

  // Ajouter les éléments au bloc hôpital
  hopitalDiv.appendChild(hopitalTitle);
  hopitalDiv.appendChild(avisDiv);
  hopitalDiv.appendChild(avisSelectContainer); // ✅ Sélecteur en bas du bloc

  // Ajouter le bloc hôpital au conteneur principal
  avisContainer.appendChild(hopitalDiv);
}

    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        avisContainer.innerHTML = "<p>Erreur lors du chargement des avis.</p>";
    }
}
// ✅ Fonction pour récupérer et afficher les hôpitaux les mieux et les moins bien notés
async function afficherHopitaux() {
    const topContainer = document.getElementById("hospitalsTop");
    const worstContainer = document.getElementById("hospitalsWorst");

    topContainer.innerHTML = "<p>Chargement...</p>";
    worstContainer.innerHTML = "<p>Chargement...</p>";

    try {
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        let hopitaux = {};

        // 🔹 Parcourir les avis et classer par hôpital
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let hopital = data.hopital || "Hôpital non précisé";
            let note = parseFloat(data.recommandation) || 0;

            if (!hopitaux[hopital]) {
                hopitaux[hopital] = { total: 0, count: 0 };
            }

            hopitaux[hopital].total += note;
            hopitaux[hopital].count++;
        });

        // 🔹 Trier les hôpitaux selon la note moyenne
        let hopitauxArray = Object.keys(hopitaux).map(hopital => ({
            nom: hopital,
            noteMoyenne: hopitaux[hopital].count > 0 ? (hopitaux[hopital].total / hopitaux[hopital].count).toFixed(1) : "N/A"
        }));

        // 🔹 Séparer les meilleurs et les moins bien notés
        let hopitauxTop = hopitauxArray.sort((a, b) => b.noteMoyenne - a.noteMoyenne).slice(0, 4);
        let hopitauxWorst = hopitauxArray.sort((a, b) => a.noteMoyenne - b.noteMoyenne).slice(0, 4);

        // 🔹 Fonction pour générer une carte hôpital
        function creerCarteHopital(hopital) {
            return `
                <div class="hospital-card">
                    <h3>${hopital.nom}</h3>
                    <p>⭐ ${hopital.noteMoyenne}/5</p>
                </div>
            `;
        }

        // 🔹 Remplir les sections
        topContainer.innerHTML = hopitauxTop.map(creerCarteHopital).join("");
        worstContainer.innerHTML = hopitauxWorst.map(creerCarteHopital).join("");

    } catch (error) {
        console.error("Erreur lors de la récupération des hôpitaux :", error);
        topContainer.innerHTML = "<p>Erreur de chargement.</p>";
        worstContainer.innerHTML = "<p>Erreur de chargement.</p>";
    }
}

// 🔹 Exécuter après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherHopitaux);

// 🔹 Exécuter la fonction après le chargement de la page
document.addEventListener("DOMContentLoaded", afficherAvis);
