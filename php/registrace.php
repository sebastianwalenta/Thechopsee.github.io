<?php
/**
 * Těrlická plachta - Backend pro registraci závodníků (Verze s jednou tabulkou)
 * Místo: https://dataspracovavac.tode.cz/test.php
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// include 'logs.php'; // Předpokládáme existenci logs.php na serveru

ini_set('display_errors', 0);
error_reporting(E_ALL);

// DB KONFIGURACE
$servername = "sql.endora.cz:3310";
$username   = "USER_NAME";
$password   = "PASSWORD";
$dbname     = "DB_NAME";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die("Připojení k databázi selhalo: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

// SBĚR DAT Z POST
$jmeno         = trim($_POST['firstName'] ?? '');
$prijmeni      = trim($_POST['lastName'] ?? '');
$vek           = ($_POST['ageGroup'] ?? '') === '17-' ? 'J' : 'S';
$mail          = $_POST['email'] ?? '';
$klub          = $_POST['club'] ?? '';
$licence       = $_POST['license'] ?? '';
$stat          = strtoupper(trim($_POST['country'] ?? ''));
$ubytovani     = ($_POST['accommodation'] ?? 'false') === 'true' ? 1 : 0;
$upocet        = (int) ($_POST['accommodationPersons'] ?? 0);

// NSS
$attendsNss    = ($_POST['attendsNss'] ?? 'false') === 'true';
$nssCategory   = $attendsNss ? ($_POST['nssCategory'] ?? '') : null;
$nssBoatName   = $attendsNss ? ($_POST['nssBoatName'] ?? '') : null;
$nssScale      = $attendsNss ? (float) ($_POST['nssScale'] ?? 0) : null;
$nssDisplacement = $attendsNss ? (float) ($_POST['nssDisplacement'] ?? 0) : null;
$nssSailArea   = $attendsNss ? (float) ($_POST['nssSailArea'] ?? 0) : null;
$nssWaterline  = $attendsNss ? (float) ($_POST['nssWaterline'] ?? 0) : null;

// RG650
$attendsRg     = ($_POST['attendsRg'] ?? 'false') === 'true';
$rgSailNumber  = $attendsRg ? ($_POST['rgSailNumber'] ?? '') : null;

// Footy
$attendsFooty  = ($_POST['attendsFooty'] ?? 'false') === 'true';
$footySailNumber = $attendsFooty ? ($_POST['footySailNumber'] ?? '') : null;

// Validace jména a příjmení (pouze jedno slovo)
if (preg_match('/\s/', $jmeno) || preg_match('/\s/', $prijmeni)) {
    http_response_code(400);
    echo "Chyba: Jméno a příjmení smí obsahovat pouze jedno slovo.";
    exit;
}

// Validace státu
if (strlen($stat) !== 3) {
    http_response_code(400);
    echo "Chyba: ISO kód státu musí mít 3 znaky.";
    exit;
}

// Validace kategorií
if (!$attendsNss && !$attendsRg && !$attendsFooty) {
    http_response_code(400);
    echo "Chyba: Závodník musí mít vybranou alespoň jednu kategorii (NSS, RG650 nebo Footy).";
    exit;
}

// Uložení do jedné tabulky
$stmt = $conn->prepare("
    INSERT INTO Zavodnici
    (jmeno, prijmeni, vek, mail, klub, licence, stat, ubytovani, pocet_osob,
     nss_kat, nss_nazev, nss_meritko, nss_vytlak, nss_plocha, nss_delka,
     rg_plachta, footy_plachta)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    http_response_code(500);
    die("Chyba při přípravě dotazu: " . $conn->error);
}

$stmt->bind_param("sssssssiisssdddds",
    $jmeno,
    $prijmeni,
    $vek,
    $mail,
    $klub,
    $licence,
    $stat,
    $ubytovani,
    $upocet,
    $nssCategory,
    $nssBoatName,
    $nssScale,
    $nssDisplacement,
    $nssSailArea,
    $nssWaterline,
    $rgSailNumber,
    $footySailNumber
);

if ($stmt->execute()) {
    echo "✅ Registrace proběhla úspěšně.";
    // if (function_exists('logData')) { logData("registrace", "Úspěšná: $mail"); }
} else {
    http_response_code(500);
    echo "Chyba při ukládání: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
