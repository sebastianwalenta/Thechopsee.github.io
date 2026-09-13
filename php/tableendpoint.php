<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "sql.endora.cz:3310";
$username   = "USER_NAME";
$password   = "PASSWORD";
$dbname     = "DB_NAME";
// Připojení k databázi
$conn = new mysqli($servername, $username, $password, $dbname);

// Kontrola připojení
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "error" => "Connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Nastavení UTF-8
$conn->set_charset("utf8");

// SQL dotaz
$sql = "SELECT * FROM `Zavodnici`";
$result = $conn->query($sql);

$data = [];

$pocet_ucastniku = 0;
$pocet_rg = 0;
$pocet_maket = 0;
$pocet_footy = 0;

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pocet_ucastniku++;

        // RG převod
        $rg = false;
        if (array_key_exists('rg_plachta', $row) && !empty(trim((string) ($row['rg_plachta'] ?? '')))) {
            $rg = true;
        } elseif (array_key_exists('rg', $row) && ($row['rg'] == 2)) {
            $rg = true;
        }

        if ($rg) {
            $pocet_rg++;
        }

        // Kategorie převod
        $kategorie = "-";
        $nssKategorie = trim((string) ($row['nss_kat'] ?? ''));

        if ($nssKategorie !== '') {
            switch (strtolower($nssKategorie)) {
                case 'nss_a':
                case 'nss a':
                case 'nssa':
                    $kategorie = 'NSS-A';
                    break;

                case 'nss_b':
                case 'nss b':
                case 'nssb':
                    $kategorie = 'NSS-B';
                    break;

                case 'nss_c':
                case 'nss c':
                case 'nssc':
                    $kategorie = 'NSS-C';
                    break;

                default:
                    $kategorie = $nssKategorie;
                    break;
            }

            $pocet_maket++;
        } elseif (array_key_exists('kategorie', $row) && $row['kategorie'] != null) {
            switch ($row['kategorie']) {
                case 'nss_a':
                    $kategorie = 'NSS-A';
                    break;

                case 'nss_b':
                    $kategorie = 'NSS-B';
                    break;

                case 'nss_c':
                    $kategorie = 'NSS-C';
                    break;

                default:
                    $kategorie = $row['kategorie'];
                    break;
            }

            $pocet_maket++;
        }

        $nazevModelu = '-';
        if (array_key_exists('nss_nazev', $row) && trim((string) ($row['nss_nazev'] ?? '')) !== '') {
            $nazevModelu = trim((string) $row['nss_nazev']);
        } elseif (array_key_exists('nazev', $row) && $row['nazev'] != null) {
            $nazevModelu = $row['nazev'];
        }

        $footy = false;
        if (array_key_exists('footy_plachta', $row) && !empty(trim((string) ($row['footy_plachta'] ?? '')))) {
            $footy = true;
        } elseif (array_key_exists('footy', $row) && !empty($row['footy']) && $row['footy'] != '-' && $row['footy'] != 'Ne') {
            $footy = true;
        }

        if ($footy) {
            $pocet_footy++;
        }

        $data[] = [
            'jmeno' => $row['jmeno'] ?? '',
            'prijmeni' => $row['prijmeni'] ?? '',
            'cele_jmeno' => trim((string) ($row['jmeno'] ?? '') . ' ' . (string) ($row['prijmeni'] ?? '')),
            'vek' => $row['vek'] ?? '',
            'stat' => $row['stat'] ?? '',
            'rg' => $rg,
            'rg_text' => $rg ? 'Ano' : 'Ne',
            'kategorie' => $kategorie,
            'nazev_modelu' => $nazevModelu,
            'mail' => $row['mail'] ?? '',
            'klub' => $row['klub'] ?? '',
            'licence' => $row['licence'] ?? '',
            'ubytovani' => (int) ($row['ubytovani'] ?? 0),
            'pocet_osob' => (int) ($row['pocet_osob'] ?? 0),
            'rg_plachta' => $row['rg_plachta'] ?? '',
            'footy_plachta' => $row['footy_plachta'] ?? '',
            'footy' => $footy,
            'footy_text' => $footy ? 'Ano' : 'Ne'
        ];
    }
}

$conn->close();

// Výstup JSON
echo json_encode([
    'statistiky' => [
        'pocet_ucastniku' => $pocet_ucastniku,
        'pocet_rg' => $pocet_rg,
        'pocet_maket' => $pocet_maket,
        'pocet_footy' => $pocet_footy
    ],
    'zavodnici' => $data
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>