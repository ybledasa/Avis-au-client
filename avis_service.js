
// 🔹 Importation Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getMotifFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("motif");
}

function genererEtoiles(note) {
  return "★".repeat(Math.floor(note)) + "☆".repeat(5 - Math.floor(note));
}

function formaterDate(dateStr) {
  let date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  });
}

async function afficherAvisParMotif() {
  const motif = getMotifFromURL();
  const container = document.getElementById("avisContainer");
  const titre = document.getElementById("titre-motif");

  if (titre && motif) titre.textContent = `Avis pour le service : ${motif}`;

  const snapshot = await getDocs(collection(db, "avisPatients"));
  let avisHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.motif === motif) {
      const etoiles = genererEtoiles(data.accueil || 0);
      avisHTML += `
        <div class="flex items-start gap-4 bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-600 hover:shadow-md transition-all duration-300">
          <div class="flex-shrink-0 bg-gray-200 text-gray-800 font-bold w-10 h-10 flex items-center justify-center rounded">
            ${data.hopital?.charAt(0) || "?"}
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-1">${data.hopital || "Hôpital non précisé"}</h3>
            <p class="text-yellow-500 text-sm mb-1">${etoiles}</p>
            <p><span class="font-semibold">Service :</span> ${data.motif}</p>
            <p class="text-sm italic my-1">${data.experience || "Aucune expérience détaillée"}</p>
            <p class="text-gray-500 text-sm">📅 ${formaterDate(data.date)}</p>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = avisHTML || "<p>Aucun avis pour ce service.</p>";
}

document.addEventListener("DOMContentLoaded", afficherAvisParMotif);