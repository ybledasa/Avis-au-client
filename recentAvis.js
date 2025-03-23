// 🔹 Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔹 Config Firebase
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

// 🔸 Fonctions utilitaires
function formaterDate(dateStr) {
  let date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  });
}

function genererEtoiles(note) {
  return "★".repeat(Math.floor(note)) + "☆".repeat(5 - Math.floor(note));
}
function getMotifIcon(motif) {
    const icones = {
      "Consultation": '<i class="fas fa-stethoscope"></i>',
      "Urgence": '<i class="fas fa-ambulance"></i>',
      "Hospitalisation": '<i class="fas fa-hospital"></i>',
      "Maternité": '<i class="fas fa-baby"></i>',
      "Autre": '<i class="fas fa-question-circle"></i>'
    };
    return icones[motif] || '<i class="fas fa-clinic-medical"></i>';
  }
  

// ✅ Avis récents dynamiques
async function chargerAvisRecents() {
  const container = document.querySelector("#recent-avis");
  if (!container) return;

  const q = query(collection(db, "avisPatients"), orderBy("date", "desc"), limit(3));
  const snapshot = await getDocs(q);

  let html = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    html += `
     
    <div class="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition">
        
        <h3 class="text-lg font-bold text-primary mb-2">${data.hopital}</h3>
        <p><strong</strong> ${genererEtoiles(data.accueil)}</p>
        <p><strong>${getMotifIcon(data.motif)} Service :</strong> ${data.motif}</p>
            <p class="mt-2 text-gray-600"><strong></strong><br>${data.experience}</p>
            <p class="text-sm text-gray-400 mt-3">${formaterDate(data.date)}</p>
        </div>
        `;
  });

  container.innerHTML = html;
}

// ✅ Services dynamiques
async function chargerServices() {
  const container = document.querySelector("#dynamic-services");
  if (!container) return;

  const snapshot = await getDocs(collection(db, "avisPatients"));
  const services = new Map();

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.motif) {
      services.set(data.motif, (services.get(data.motif) || 0) + 1);
    }
  });

  let html = "";
  Array.from(services.entries()).forEach(([motif, count]) => {
    html += `
      <div class="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300 border">
        <div class="text-5xl mb-3">${getMotifIcon(motif)}</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${motif}</h3>
        <p class="text-sm text-gray-500 mb-3">${count} ${count > 1 ? 'avis' : 'avis'}</p>
        <a href="service.html?motif=${encodeURIComponent(motif)}"
          class="inline-block mt-auto text-blue-600 hover:text-blue-800 text-sm underline">
          Voir les avis
        </a>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ✅ Exécution au chargement
document.addEventListener("DOMContentLoaded", async () => {
  await chargerAvisRecents();
  await chargerServices();
});
