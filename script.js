// 🔹 Importation des modules Firebase Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
    
        // 🔹 Remplace par TES valeurs Firebase 🔹
        const firebaseConfig = {
            apiKey: "AIzaSyCl46lrkQejIIz24g1P7Qt2ktNbG0MML4o",
            authDomain: "avis-au-client.firebaseapp.com",
            projectId: "avis-au-client",
            storageBucket: "avis-au-client.appspot.com",
            messagingSenderId: "291367297087",
            appId: "1:291367297087:web:09beaf7794126fc79bd88a",
            measurementId: "G-WESSM7PQZM"
        };
    
        // Initialisation Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app); // 🔹 Ajout de Firestore
    

// ✅ Fonction pour récupérer et afficher les avis Firebase
async function afficherAvis() {
  try {
    const querySnapshot = await getDocs(collection(db, "avisPatients"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      console.log("Nom :", data.nomPrenom);
      console.log("Âge :", data.âge);
      console.log("Problèmes :", data.problèmes.join(", ")); // Afficher la liste correctement
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  }
}

// 🔹 Exécuter la fonction après chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  afficherAvis();

  // ✅ Fonction pour gérer le clic sur les étoiles
  function handleRatingClick(ratingId, inputId) {
    const stars = document.querySelectorAll(`#${ratingId} span`);
    const input = document.getElementById(inputId);

    stars.forEach(star => {
      star.addEventListener("click", function () {
        let value = this.getAttribute("data-value");
        input.value = value;
        stars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < value; i++) {
          stars[i].classList.add("active");
        }
      });

      star.addEventListener("mouseover", function () {
        stars.forEach(s => s.classList.remove("hover"));
        for (let i = 0; i < this.getAttribute("data-value"); i++) {
          stars[i].classList.add("hover");
        }
      });

      star.addEventListener("mouseout", function () {
        stars.forEach(s => s.classList.remove("hover"));
      });
    });
  }

  // 🔹 Activer les étoiles de notation
  handleRatingClick("rating1", "accueil_value");
  handleRatingClick("rating2", "ecoute_value");
});
