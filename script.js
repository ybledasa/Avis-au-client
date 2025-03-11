document.addEventListener("DOMContentLoaded", function () {
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

    handleRatingClick("rating1", "accueil_value");
    handleRatingClick("rating2", "ecoute_value");
});
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const db = getFirestore();

async function afficherAvis() {
  try {
    const querySnapshot = await getDocs(collection(db, "avisPatients"));
    querySnapshot.forEach((doc) => {
      console.log("Avis récupéré :", doc.data());
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  }
}

afficherAvis();
