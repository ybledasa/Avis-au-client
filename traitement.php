<?php
// Connexion à la base de données
$servername = "localhost"; // Serveur MySQL
$username = "root"; // Nom d’utilisateur MySQL
$password = ""; // Mot de passe (laisser vide si par défaut)
$database = "avis_patients"; // Nom de la base de données

$conn = new mysqli($servername, $username, $password, $database);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Récupérer les données du formulaire
$nom_prenom = $_POST['nom_prenom'];
$age = $_POST['age'];
$sexe = $_POST['sexe'];
$hopital = $_POST['hopital'];
$motif = $_POST['motif'];
$motif_autre = !empty($_POST['motif_autre']) ? $_POST['motif_autre'] : NULL;
$accueil = $_POST['accueil'];
$attente = $_POST['attente'];
$ecoute = $_POST['ecoute'];
$difficultes = isset($_POST['difficultes']) ? implode(", ", $_POST['difficultes']) : NULL;
$experience = $_POST['experience'];
$recommandation = $_POST['recommandation'];
$suggestion = $_POST['suggestion'];

// Préparer la requête SQL pour insérer les données
$sql = "INSERT INTO avis (nom_prenom, age, sexe, hopital, motif, motif_autre, accueil, attente, ecoute, difficultes, experience, recommandation, suggestion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssissssss", $nom_prenom, $age, $sexe, $hopital, $motif, $motif_autre, $accueil, $attente, $ecoute, $difficultes, $experience, $recommandation, $suggestion);

if ($stmt->execute()) {
    // Redirection vers la page de confirmation
    header("Location: confirmation.html");
    exit();
} else {
    echo "Erreur : " . $conn->error;
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>
