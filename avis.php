<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "avis_patients";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

$sql = "SELECT * FROM avis ORDER BY date_submission DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Avis</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Liste des Avis</h1>
        <table border="1">
            <tr>
                <th>Nom</th>
                <th>Âge</th>
                <th>Sexe</th>
                <th>Hôpital</th>
                <th>Motif</th>
                <th>Note Accueil</th>
                <th>Note Écoute</th>
                <th>Expérience</th>
                <th>Recommandation</th>
                <th>Soumis le</th>
            </tr>
            <?php while ($row = $result->fetch_assoc()) { ?>
            <tr>
                <td><?= htmlspecialchars($row["nom_prenom"]); ?></td>
                <td><?= htmlspecialchars($row["age"]); ?></td>
                <td><?= htmlspecialchars($row["sexe"]); ?></td>
                <td><?= htmlspecialchars($row["hopital"]); ?></td>
                <td><?= htmlspecialchars($row["motif"]); ?></td>
                <td><?= htmlspecialchars($row["accueil"]); ?></td>
                <td><?= htmlspecialchars($row["ecoute"]); ?></td>
                <td><?= htmlspecialchars($row["experience"]); ?></td>
                <td><?= htmlspecialchars($row["recommandation"]); ?></td>
                <td><?= htmlspecialchars($row["date_submission"]); ?></td>
            </tr>
            <?php } ?>
        </table>
    </div>
</body>
</html>

<?php $conn->close(); ?>
