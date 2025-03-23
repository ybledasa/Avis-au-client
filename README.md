// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl46lrkQejIIz24g1P7Qt2ktNbG0MML4o",
  authDomain: "avis-au-client.firebaseapp.com",
  databaseURL: "https://avis-au-client-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "avis-au-client",
  storageBucket: "avis-au-client.firebasestorage.app",
  messagingSenderId: "291367297087",
  appId: "1:291367297087:web:09beaf7794126fc79bd88a",
  measurementId: "G-WESSM7PQZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



Pour héberger votre site sur Firebase Hosting, vous devez disposer de la CLI Firebase (un outil de ligne de commande).

Exécutez la commande npm pour installer la CLI ou la mettre à jour.

npm install -g firebase-tools

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire Avis Patients</title>
    <link rel="stylesheet" href="formulaire.css">
    <script src="script.js" type="module"></script>
    
   
</head>
<body>
    <div class="form-container">
        <form id="avisForm" >
            <h1>Formulaire de Recueil des Avis des Patients</h1>
            <p>Merci de prendre quelques instants pour partager votre expérience.</p>
    
           <div>
            <h4>Nom et Prénom</h4>
            <input type="text" name="nom_prenom" required>
           </div>
    
           <div>
            <h4>Âge</h4>
            <label><input type="radio" name="age" value="Moins de 18 ans"> Moins de 18 ans</label><br>
            <label><input type="radio" name="age" value="18 - 30 ans"> 18 - 30 ans</label><br>
            <label><input type="radio" name="age" value="31 - 50 ans"> 31 - 50 ans</label><br>
            <label><input type="radio" name="age" value="51 ans et plus"> 51 ans et plus</label>
           </div>
    
           <div>
            <h4>Sexe</h4>
            <label><input type="radio" name="sexe" value="Homme"> Homme</label><br>
            <label><input type="radio" name="sexe" value="Femme"> Femme</label><br>
           </div>
    
           <div>
            <h4>Nom de l’hôpital ou clinique</h4>
           
           <select name="hopital" id="hopital" required >
                <option value="" disabled selected>-- Sélectionnez l'hôpital ou la clinique --</option>
                <option value="Centre hospitalier universitaire de Cocody (CHU de Cocody)" data-lat="5.3598" data-lng="-4.0083">Centre hospitalier universitaire de Cocody (CHU de Cocody)</option>
                <option value="Centre hospitalier universitaire de Treichville (CHU de Treichville)">Centre hospitalier universitaire de Treichville (CHU de Treichville)</option>
                <option value="Centre hospitalier universitaire de Yopougon (CHU de Yopougon)">Centre hospitalier universitaire de Yopougon (CHU de Yopougon)</option>
                <option value="Centre hospitalier universitaire d'Angré (CHU d'Angré)">Centre hospitalier universitaire d'Angré (CHU d'Angré)</option>
                <option value="Hôpital militaire d'Abidjan (HMA)">Hôpital militaire d'Abidjan (HMA)</option>
                <option value="Centre national de transfusion sanguine (Abidjan)">Centre national de transfusion sanguine (Abidjan)</option>
                <option value="Centre de santé El Rapha3">Centre de santé El Rapha3</option>
                <option value="Centre de santé urbain à base communautaire d'Abobo">Centre de santé urbain à base communautaire d'Abobo</option>
                <option value="Centre Éducation Sanitaire">Centre Éducation Sanitaire</option>
                <option value="Centre médical le CEGOS">Centre médical le CEGOS</option>
                <option value="Hôpital général d'Abobo">Hôpital général d'Abobo</option>
                <option value="Hôpital général de Port-Bouët">Hôpital général de Port-Bouët</option>
                <option value="Hôpital général d'Anyama">Hôpital général d'Anyama</option>
                <option value="Hôpital général de Koumassi">Hôpital général de Koumassi</option>
                <option value="Hôpital général de Marcory">Hôpital général de Marcory</option>
                <option value="Polyclinique internationale Sainte Anne-Marie (PISAM)">Polyclinique internationale Sainte Anne-Marie (PISAM)</option>
                <option value="Polyclinique des Deux-Plateaux">Polyclinique des Deux-Plateaux</option>
                <option value="Polyclinique Médicale FARAH, Marcory">Polyclinique Médicale FARAH, Marcory</option>
                <option value="Centre d'imagerie médicale d'Abidjan (CIMA)">Centre d'imagerie médicale d'Abidjan (CIMA)</option>
                <option value="Polyclinique Avicenne - Boulevard Achalme, Marcory Résidentiel">Polyclinique Avicenne - Boulevard Achalme, Marcory Résidentiel</option>
                <option value="Polyclinique internationale Hôtel Dieu Abidjan (PIHDA)">Polyclinique internationale Hôtel Dieu Abidjan (PIHDA)</option>
                <option value="Polyclinique Les Grâces, Marcory Zone 4">Polyclinique Les Grâces, Marcory Zone 4</option>
                <option value="Polyclinique centrale Abobo">Polyclinique centrale Abobo</option>
                <option value="Polyclinique internationale de l'Indénié">Polyclinique internationale de l'Indénié</option>
                <option value="Polyclinique Central, ABOBO">Polyclinique Central, ABOBO</option>
                <option value="Polyclinique Sainte-Anne Marie Anani">Polyclinique Sainte-Anne Marie Anani</option>
                <option value="Polyclinique 'Les Grâces - Marcory'">Polyclinique "Les Grâces - Marcory</option>
                <option value="Polyclinique La Providence - Cocody">Polyclinique La Providence - Cocody</option>
                <option value="Polyclinique Panthéon médical-Riviera 3">Polyclinique Panthéon médical-Riviera 3</option>
                <option value="Clinique médical Adjamé Liberté (CMAL)">Clinique médical Adjamé Liberté (CMAL)</option>
                <option value="Clinique Procréa- cocody riviera palmeraie">Clinique Procréa- cocody riviera palmeraie</option>
                <option value="Centre médical de Dermatologie d'Abidjan Cocody">Centre médical de Dermatologie d'Abidjan Cocody</option>
                <option value="Centre international d'ophtalmologie">Centre international d'ophtalmologie</option>
                <option value="Centre médical La Rochelle">Centre médical La Rochelle</option>
                <option value="Clinique Trade Center">Clinique Trade Center</option>
                <option value="Clinique Goci">Clinique Goci</option>
                <option value="Centre médical 'La Sagesse', quartier Abobo">Centre médical "La Sagesse" quartier Abobo</option>
                <option value="Clinique Israel">Clinique Israel</option>
                <option value="Clinique Les Arcades">Clinique Les Arcades</option>
                <option value="Clinique médicale Les Béatitudes">Clinique médicale Les Béatitudes</option>
                <option value="Clinique médicale La Rosette">Clinique médicale La Rosette</option>
                <option value="Clinique médicale le Messie">Clinique médicale le Messie</option>
                <option value="Clinique médicale du Dokui">Clinique médicale du Dokui</option>
                <option value="Espace médical Saint-Paul">Espace médical Saint-Paul</option>
                <option value="Clinique universelle Santé Cusa">Clinique universelle Santé Cusa</option>
                <option value="Clinique Saint-Martin de Tours (CSM)">Clinique Saint-Martin de Tours (CSM)</option>
                <option value="centre médical Les Archanges">centre médical Les Archanges</option>
                <option value=">Clinique Saint-Gabriel">Clinique Saint-Gabriel</option>
                <option value="Clinique Rhema">Clinique Rhema</option>
                <option value="Clinique Nanan">Clinique Nanan</option>
                <option value="Clinique médicale La Colombe">Clinique médicale La Colombe</option>
                <option value="Clinique Rosa Maria">Clinique Rosa Maria</option>
                <option value="Clinique médicale Anne Marie">Clinique médicale Anne Marie</option>
                <option value="Espace médical La Pulcherie">Espace médical La Pulcherie</option>
                <option value="Centre médical Les Cherubins, Abobo">Centre médical Les Cherubins, Abobo</option>
                <option value="Centre Médical EDEN Abobo Belleville">Centre Médical EDEN Abobo Belleville</option>
                <option value="Clinique médicale Saint-Viateur, Riviera palmeraie">Clinique médicale Saint-Viateur, Riviera palmeraie</option>
                <option value="Groupe médical Plateau">Groupe médical Plateau</option>
                <option value="Groupe médical Promethée">Groupe médical Promethée</option>
                <option value="Centre médical Inter Entreprise (plateau)">Centre médical Inter Entreprise (plateau)</option>
                <option value="Espace médical Le Phenix">Espace médical Le Phenix</option>
                <option value="Centre médical Harmony (CMH), Riviera Golf">Centre médical Harmony (CMH), Riviera Golf</option>
                <option value="Centre médical Social El-Kabod , Koumassi Remblais">Centre médical Social El-Kabod , Koumassi Remblais</option>
                <option value="Centre médical des œuvres et mission (CMOMISS), Yopougon Camp Militaire">Centre médical des œuvres et mission (CMOMISS), Yopougon Camp Militaire</option>
                <option value="Clinique médicale Danga, du quartier Cocody Danga">Clinique médicale Danga, du quartier Cocody Danga</option>
                <option value="Centre Médical International La Gospa, Cocody Danga">Centre Médical International La Gospa, Cocody Danga</option>
                <option value="Clinique Medicale OASIS SANTE,Yopougon Keneya">Clinique Medicale OASIS SANTE,Yopougon Keneya</option>
                <option value="Espace Médical Saint Georges (Méagui)">Espace Médical Saint Georges (Méagui)</option>
                <option value="Clinique RIMCA (Koumassi)">Clinique RIMCA (Koumassi)</option>
                <option value="centre médico-Pédiatrique Ananeraie">centre médico-Pédiatrique Ananeraie</option>
                <option value="centre médical st Nicolas">centre médical st Nicolas</option>
                <option value="centre médical st Nicolas">Clinique Soma</option>
                

                
            </select>

            <input type="hidden" name="latitude" id="latitude">
            <input type="hidden" name="longitude" id="longitude">
        </div>
        <h4>Autre</h4>
        <input type="text" name="Autre" required>



        <div>
            
        </div>
    
           <div>
            <h4>Motif de visite</h4>
            <label><input type="radio" name="motif" value="Consultation"> Consultation</label><br>
            <label><input type="radio" name="motif" value="Urgence"> Urgence</label><br>
            <label><input type="radio" name="motif" value="Hospitalisation"> Hospitalisation</label><br>
            <label><input type="radio" name="motif" value="Maternité"> Maternité</label><br>
            <label><input type="radio" name="motif" value="Autre"> Autre</label>
           </div>
    
           <div>
            <h4>Si autre, précisez :</h4>
            <input type="text" name="motif_autre">
           </div>
    
           <div>
            <h4>Qualité de l’accueil et de la prise en charge</h4>
            <p>(1 = Très mauvais, 5 = Excellent)</p>
            <div class="rating" id="rating1">
                <span data-value="1">★</span>
                <span data-value="2">★</span>
                <span data-value="3">★</span>
                <span data-value="4">★</span>
                <span data-value="5">★</span>
            </div>
            <input type="hidden" name="accueil" id="accueil_value">
           </div>
    
           <div>
            <h4>Temps d’attente acceptable ?</h4>
            <label><input type="radio" name="attente" value="Oui"> Oui</label><br>
            <label><input type="radio" name="attente" value="Non"> Non</label>
           </div>
    
           <div>
            <h4>Le personnel soignant était-il à l’écoute ?</h4>
            <p>(1 = Très mauvais, 5 = Excellent)</p>
            <div class="rating" id="rating2">
                <span data-value="1">★</span>
                <span data-value="2">★</span>
                <span data-value="3">★</span>
                <span data-value="4">★</span>
                <span data-value="5">★</span>
            </div>
            <input type="hidden" name="ecoute" id="ecoute_value">
           </div>
    
           <div>
            <h4>Difficultés rencontrées</h4>
            <label><input type="checkbox" name="difficultes[]" value="Attente"> Attente</label><br>
            <label><input type="checkbox" name="difficultes[]" value="Manque de matériel"> Manque de matériel</label><br>
            <label><input type="checkbox" name="difficultes[]" value="Personnel indisponible"> Personnel indisponible</label><br>
            <label><input type="checkbox" name="difficultes[]" value="Pas de difficultes rencontrées"> Pas de difficultes rencontrées</label>
           </div>
    
           <div>
            <h4>Expliquez brièvement votre expérience:</h4>
            <textarea name="experience" rows="4"></textarea>
           </div>
    
           <div>
            <h4>Recommanderiez-vous cet hôpital/clinique ?</h4>
            <input type="text" name="recommandation">
           </div>
    
           <div>
            <h4>Suggestions d’amélioration</h4>
            <input type="text" name="suggestion">
           </div>
    
           <div>
            <button type="submit">Envoyer</button>
           </div>
        </form>
    </div>
    <script type="module">
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
    
        // Gestion du formulaire
        document.querySelector("form").addEventListener("submit", async function(event) {
            event.preventDefault(); // Empêcher le rechargement de la page
    
            // Récupérer les valeurs du formulaire
            const nomPrenom = document.querySelector('input[name="nom_prenom"]').value.trim();
            const age = document.querySelector('input[name="age"]:checked')?.value || "";
            const sexe = document.querySelector('input[name="sexe"]:checked')?.value || "";
            const hopital = document.querySelector('select[name="hopital"]').value.trim();
            const motif = document.querySelector('input[name="motif"]:checked')?.value || "";
            const motifAutre = document.querySelector('input[name="motif_autre"]').value.trim();
            const accueil = document.getElementById("accueil_value").value.trim();
            const attente = document.querySelector('input[name="attente"]:checked')?.value || "";
            const ecoute = document.getElementById("ecoute_value").value.trim();
            const experience = document.querySelector('textarea[name="experience"]').value.trim();
            const recommandation = document.querySelector('input[name="recommandation"]').value.trim();
            const suggestion = document.querySelector('input[name="suggestion"]').value.trim();
    
            // Récupérer les difficultés (cases à cocher)
            const difficulties = Array.from(document.querySelectorAll('input[name="difficultes[]"]:checked'))
                                     .map(el => el.value);
                                     if (motif === "Autre" && !motifAutre) {
            alert("Veuillez préciser votre motif de visite.");
                return;
            }
                         
    
            try {
                await addDoc(collection(db, "avisPatients"), {
                    nomPrenom,
                    age,
                    sexe,
                    hopital,
                    motif,
                    motifAutre,
                    accueil,
                    attente,
                    ecoute,
                    difficulties,
                    experience,
                    recommandation,
                    suggestion,
                    date: new Date().toISOString()
                });
    
                window.location.href = "confirmation.html"; // Redirection après envoi
                } catch (error) {
                    console.error("Erreur lors de l'enregistrement :", error);
                    alert("Une erreur s'est produite, veuillez réessayer.");
                }
        });
        window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.9)";
        navbar.style.padding = "15px 40px";
    } else {
        navbar.style.background = "rgba(0, 0, 0, 0.5)";
        navbar.style.padding = "20px 40px";
    }
});

    </script>
    
    
      

    
</body>
</html>
async function afficherAvis(filtreMotif = "all", filtreEmplacement = "all", filtreNote = "all", searchQuery = "") {
    const avisContainer = document.getElementById("avisContainer");
    avisContainer.innerHTML = "<p>Chargement des avis...</p>";

    try {
        const q = query(collection(db, "avisPatients"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        avisContainer.innerHTML = ""; // Efface le message de chargement

        let avisTrouves = false;

        querySnapshot.forEach((doc) => {
            let data = doc.data();

            // 🔹 Vérification des filtres appliqués
            if ((filtreMotif !== "all" && data.motif !== filtreMotif) ||
                (filtreEmplacement !== "all" && data.hopital !== filtreEmplacement)) {
                return;
            }

            // 🔹 Vérification du filtre de recherche
            if (searchQuery && !data.hopital.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !data.motif.toLowerCase().includes(searchQuery.toLowerCase())) {
                return;
            }

            // 🔹 Calcul de la moyenne des étoiles
            let accueilScore = parseInt(data.accueil) || 0;
            let ecouteScore = parseInt(data.ecoute) || 0;
            let moyenneStars = (accueilScore + ecouteScore) / 2;
            let etoilesMoyenne = genererEtoiles(moyenneStars);

            // 🔹 Filtrage par note (exacte)
            if (filtreNote !== "all" && Math.round(moyenneStars) !== parseInt(filtreNote)) {
                return;
            }

            let dateFormatted = formaterDate(data.date);

            // 🔹 Création de l'affichage de l'avis
            let avisDiv = document.createElement("div");
            avisDiv.classList.add("avis-card");

            avisDiv.innerHTML = `
                <div class="avis-logo">${data.hopital ? data.hopital.charAt(0) : "?"}</div>
                <div class="avis-content">
                    <div class="avis-header">
                        <span>${data.hopital || "Hôpital non précisé"}</span>
                    </div>
                    <div class="avis-stars">${etoilesMoyenne}</div>
                    <p><strong>Service :</strong> ${data.motif || "Non précisé"}</p>
                    <p>${data.experience || "Aucune expérience détaillée"}</p>
                    <p><strong></strong> ${dateFormatted}</p>

                   
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