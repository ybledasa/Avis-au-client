// 🔹 Importation de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// 🔹 Variables globales
let triPar = "date";
let currentPage = 1;
const avisParPage = 5;
let allAvis = [];

function genererEtoiles(note) {
  return "★".repeat(Math.floor(note)) + "☆".repeat(5 - Math.floor(note));
}

function formaterDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function afficherAvis(filtreMotif = "all", filtreEmplacement = "all", filtreNote = "all", recherche = "") {
  const avisContainer = document.getElementById("avisContainer");
  const noResults = document.getElementById("no-results");

  if (!avisContainer) return;

  avisContainer.innerHTML = "";
  if (noResults) noResults.classList.add("hidden");

  const q = query(collection(db, "avisPatients"));
  const querySnapshot = await getDocs(q);

  allAvis = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Tri
  allAvis.sort((a, b) => {
    if (triPar === "note") return (b.accueil || 0) - (a.accueil || 0);
    return new Date(b.date) - new Date(a.date);
  });

  const avisFiltres = allAvis.filter((data) => {
    const matchMotif = filtreMotif === "all" || data.motif === filtreMotif;
    const matchEmplacement = filtreEmplacement === "all" || data.hopital === filtreEmplacement;
    const matchRecherche = !recherche || data.hopital?.toLowerCase().includes(recherche.toLowerCase()) || data.experience?.toLowerCase().includes(recherche.toLowerCase());
    const matchNote = filtreNote === "all" || Math.floor(data.accueil || 0).toString() === filtreNote;
    return matchMotif && matchEmplacement && matchRecherche && matchNote;
  });

  // Pagination
  const start = (currentPage - 1) * avisParPage;
  const paginated = avisFiltres.slice(start, start + avisParPage);

  if (paginated.length === 0 && noResults) {
    noResults.classList.remove("hidden");
    return;
  }

  paginated.forEach((data) => {
    const avisDiv = document.createElement("div");
    avisDiv.className = "flex items-start gap-4 bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-600 hover:shadow-md transition-all duration-300 fade-in";

    avisDiv.innerHTML = `
      <div class="flex-shrink-0 bg-gray-200 text-gray-800 font-bold w-10 h-10 flex items-center justify-center rounded">
        ${data.hopital?.charAt(0) || "?"}
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${data.hopital || "Hôpital non précisé"}</h3>
        <p class="text-yellow-500 text-sm mb-1">${genererEtoiles(data.accueil || 0)}</p>
        <p><span class="font-semibold">Service :</span> ${data.motif || "Non précisé"}</p>
        <p class="text-sm italic my-1">${data.experience || "Aucune expérience détaillée"}</p>
        <p class="text-gray-500 text-sm">📅 ${formaterDate(data.date)}</p>
      </div>
    `;
    avisContainer.appendChild(avisDiv);
  });

  afficherPagination(avisFiltres.length);
}

function afficherPagination(totalAvis) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";
  const totalPages = Math.ceil(totalAvis / avisParPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 mx-1 border rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`;
    btn.onclick = () => {
      currentPage = i;
      afficherAvis();
    };
    pagination.appendChild(btn);
  }
}

async function chargerFiltres() {
  const emplacementFiltre = document.getElementById("emplacement-filtre");
  const servicesList = document.getElementById("categories-list");

  if (!emplacementFiltre || !servicesList) return;

  emplacementFiltre.innerHTML = `<option value="all">Tous</option>`;
  servicesList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "avisPatients"));
  let emplacements = new Set();
  let services = new Map();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.hopital) emplacements.add(data.hopital);
    if (data.motif) services.set(data.motif, (services.get(data.motif) || 0) + 1);
  });

  emplacements.forEach((emplacement) => {
    const option = document.createElement("option");
    option.value = emplacement;
    option.textContent = emplacement;
    emplacementFiltre.appendChild(option);
  });

  services.forEach((count, service) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" class="category-link text-blue-600 hover:underline" data-motif="${service}">${service}</a> (${count})`;
    servicesList.appendChild(li);
  });

  // Filtres dynamiques
  emplacementFiltre.addEventListener("change", () => {
    currentPage = 1;
    afficherAvis("all", emplacementFiltre.value);
  });

  servicesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-link")) {
      e.preventDefault();
      const motif = e.target.dataset.motif;
      currentPage = 1;
      afficherAvis(motif, emplacementFiltre.value);
    }
  });

  document.querySelectorAll(".filtre-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const selectedNote = event.target.getAttribute("data-note");
      currentPage = 1;
      afficherAvis("all", emplacementFiltre.value, selectedNote);
    });
  });

  // Tri
  document.getElementById("tri-select")?.addEventListener("change", (e) => {
    triPar = e.target.value;
    currentPage = 1;
    afficherAvis();
  });

  // Export CSV
  document.getElementById("export-btn")?.addEventListener("click", () => {
    const rows = allAvis.map((avis) => [
      avis.hopital,
      avis.motif,
      avis.accueil,
      avis.experience,
      formaterDate(avis.date)
    ]);
    const csvContent = [
      "Hôpital,Motif,Note,Expérience,Date",
      ...rows.map((e) => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "avis-patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", async () => {
  await chargerFiltres();
  await afficherAvis();
});

document.getElementById("searchInput")?.addEventListener("input", (e) => {
  currentPage = 1;
  afficherAvis("all", "all", "all", e.target.value.trim());
});
