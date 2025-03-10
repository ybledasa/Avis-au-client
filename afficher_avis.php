<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";  // Remplace par ton identifiant MySQL
$password = "";      // Remplace par ton mot de passe MySQL
$dbname = "avis_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Récupérer les avis
$sql = "SELECT nom_prenom, accueil, ecoute, experience FROM avis_patients ORDER BY date_soumission DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<li><strong>" . htmlspecialchars($row['nom_prenom']) . "</strong> - " .
             "Accueil : " . $row['accueil'] . " étoiles - " .
             "Écoute : " . $row['ecoute'] . " étoiles<br>" .
             "<em>" . htmlspecialchars($row['experience']) . "</em></li>";
    }
} else {
    echo "<li>Aucun avis pour le moment.</li>";
}

$conn->close();
?>
