// ✅ Script JS complet organisé, nettoyé et corrigé
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCl46lrkQejIIz24g1P7Qt2ktNbG0MML4o",
  authDomain: "avis-au-client.firebaseapp.com",
  projectId: "avis-au-client",
  storageBucket: "avis-au-client.appspot.com",
  messagingSenderId: "291367297087",
  appId: "1:291367297087:web:09beaf7794126fc79bd88a",
  measurementId: "G-WESSM7PQZM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let docRefHopital = null;

// 🔐 Connexion utilisateur
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  docRefHopital = doc(db, "hopitaux", user.uid);
  const userDoc = await getDoc(docRefHopital);

  if (userDoc.exists()) {
    const data = userDoc.data();
    document.getElementById("hospitalName").textContent = data.nom;
    document.getElementById("profilNom").textContent = data.nom;
    document.getElementById("profilContact").textContent = data.contact;
    document.getElementById("profilAbonnement").textContent = data.abonnement?.statut || "Non renseigné";

    if (data.abonnement?.dateFin) {
      const dateFin = new Date(data.abonnement.dateFin);
      const maintenant = new Date();
      const diff = dateFin.getTime() - maintenant.getTime();
      const joursRestants = Math.ceil(diff / (1000 * 3600 * 24));
      document.getElementById("joursRestants").textContent = joursRestants >= 0 ? `${joursRestants} jours` : "Expiré";
    } else {
      document.getElementById("joursRestants").textContent = "Non renseigné";
    }

    afficherAvis(user.uid);
    afficherStatistiques();
    afficherTousLesAvis(data.nom);
  }
});

// 📊 Affichage statistiques générales
async function afficherAvis(hopitalId) {
  const snapshot = await getDocs(collection(db, `hopitaux/${hopitalId}/avis`));
  document.getElementById("totalAvis").textContent = snapshot.size;

  let totalScore = 0;
  snapshot.forEach(doc => totalScore += doc.data().score || 0);

  const moyenne = snapshot.size > 0 ? (totalScore / snapshot.size).toFixed(1) : "-";
  document.getElementById("moyenneSatisfaction").textContent = moyenne + " / 5";
}

function afficherStatistiques() {
  const ctx = document.getElementById("chartSatisfaction").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
      datasets: [{
        label: "Satisfaction",
        data: [80, 85, 78, 90, 88, 92],
        backgroundColor: "rgba(113, 93, 185, 0.5)"
      }]
    }
  });
}

function exporterExcel() {
  const table = document.getElementById("tableAvis");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Avis Patients" });
  XLSX.writeFile(wb, "avis_patients.xlsx");
}

async function afficherTousLesAvis(hopitalNom) {
  const avisBody = document.getElementById("avisBody");
  avisBody.innerHTML = "<tr><td colspan='10'>Chargement...</td></tr>";

  const q = query(collection(db, "avisPatients"), where("hopital", "==", hopitalNom));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    avisBody.innerHTML = "<tr><td colspan='10'>Aucun avis trouvé.</td></tr>";
    return;
  }

  let rows = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    rows += `
      <tr>
        <td>${data.age || "-"}</td>
        <td>${data.sexe || "-"}</td>
        <td>${data.motif || data.motifAutre || "-"}</td>
        <td>${data.accueil || "-"}</td>
        <td>${data.attente || "-"}</td>
        <td>${data.ecoute || "-"}</td>
        <td>${data.experience || "-"}</td>
        <td>${data.recommandation || "-"}</td>
        <td>${new Date(data.date).toLocaleDateString() || "-"}</td>
      </tr>`;
  });

  avisBody.innerHTML = rows;
  afficherPage(1);
}

function filtrerParDate() {
  const dateChoisie = document.getElementById("dateFilter").value;
  if (!dateChoisie) return;

  const lignes = document.querySelectorAll("#avisBody tr");
  lignes.forEach((ligne) => {
    const dateCell = ligne.children[8];
    if (!dateCell) return;
    const dateTexte = dateCell.textContent;
    const [jour, mois, annee] = dateTexte.split("/");
    const dateFormatee = `${annee}-${mois.padStart(2, "0")}-${jour.padStart(2, "0")}`;
    ligne.style.display = dateFormatee === dateChoisie ? "" : "none";
  });
}

function afficherFormulaireEdition() {
  document.getElementById("profilView").style.display = "none";
  document.getElementById("formEdition").style.display = "block";
  document.getElementById("nouveauContact").value = document.getElementById("profilContact").textContent;
  document.getElementById("nouveauStatut").value = document.getElementById("profilAbonnement").textContent;
}

function annulerEdition() {
  document.getElementById("formEdition").style.display = "none";
  document.getElementById("profilView").style.display = "block";
}

async function enregistrerProfil() {
  const nouveauContact = document.getElementById("nouveauContact").value;
  const nouveauStatut = document.getElementById("nouveauStatut").value;

  if (!docRefHopital) return alert("Document introuvable");

  try {
    await updateDoc(docRefHopital, {
      contact: nouveauContact,
      "abonnement.statut": nouveauStatut
    });

    document.getElementById("profilContact").textContent = nouveauContact;
    document.getElementById("profilAbonnement").textContent = nouveauStatut;

    annulerEdition();
    alert("Mise à jour réussie !");
  } catch (error) {
    console.error("Erreur mise à jour:", error);
    alert("Échec de la mise à jour.");
  }
}

async function renouvelerAbonnement() {
  const nouvelleDate = document.getElementById("nouvelleDateFin").value;
  if (!nouvelleDate) return alert("Veuillez choisir une date");

  try {
    await updateDoc(docRefHopital, {
      "abonnement.dateFin": nouvelleDate
    });
    alert("✅ Abonnement renouvelé !");
    location.reload();
  } catch (error) {
    console.error(error);
    alert("❌ Erreur lors du renouvellement.");
  }
}

let currentPage = 1;
const rowsPerPage = 10;

function afficherPage(page) {
  const lignes = document.querySelectorAll("#avisBody tr");
  const totalPages = Math.ceil(lignes.length / rowsPerPage);
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  lignes.forEach((ligne, index) => {
    ligne.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? "" : "none";
  });

  document.getElementById("pagination").innerHTML = `
    <button onclick="afficherPage(${page - 1})" ${page === 1 ? "disabled" : ""}>Précédent</button>
    Page ${page} / ${totalPages}
    <button onclick="afficherPage(${page + 1})" ${page === totalPages ? "disabled" : ""}>Suivant</button>
  `;

  currentPage = page;
}

function afficherSection(section, element) {
  document.querySelectorAll(".main--content").forEach((el) => {
    el.classList.remove("active-section");
    el.style.opacity = 0;
    el.style.transition = "opacity 0.5s ease";
  });

  const selected = document.getElementById(section);
  selected.classList.add("active-section");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    selected.style.opacity = 1;
  }, 50);

  document.querySelectorAll(".menu li").forEach((el) => el.classList.remove("active"));
  if (element) element.classList.add("active");
}

window.afficherSection = afficherSection;
window.filtrerParDate = filtrerParDate;
window.exporterExcel = exporterExcel;
window.renouvelerAbonnement = renouvelerAbonnement;
window.afficherFormulaireEdition = afficherFormulaireEdition;
window.annulerEdition = annulerEdition;
window.enregistrerProfil = enregistrerProfil;
window.afficherPage = afficherPage;

const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    const confirmation = confirm("Voulez-vous vraiment vous déconnecter ?");
    if (confirmation) {
      document.body.style.opacity = 1;
      const fadeOut = setInterval(() => {
        if (document.body.style.opacity > 0) {
          document.body.style.opacity -= 0.1;
        } else {
          clearInterval(fadeOut);
          signOut(auth).then(() => {
            window.location.href = "acceuil.html";
          });
        }
      }, 30);
    }
  });
}
