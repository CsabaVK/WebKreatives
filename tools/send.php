<?php
// WebKreatives Contact Form Handler
// Upload this file to public_html on Hostinger

// -- Settings --
$to_email = "info@webkreatives.com";
$site_name = "WebKreatives";

// -- Anti-spam: block if honeypot field is filled --
if (!empty($_POST['website'])) {
    http_response_code(200);
    echo json_encode(["status" => "ok"]);
    exit;
}

// -- Only allow POST --
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// -- Collect fields --
$name    = htmlspecialchars(trim($_POST['name'] ?? ''));
$email   = htmlspecialchars(trim($_POST['email'] ?? ''));
$phone   = htmlspecialchars(trim($_POST['phone'] ?? ''));
$type    = htmlspecialchars(trim($_POST['type'] ?? ''));
$package = htmlspecialchars(trim($_POST['package'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// -- Validate required fields --
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Vul alle verplichte velden in."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Ongeldig e-mailadres."]);
    exit;
}

// -- Build email --
$subject = "Nieuwe aanvraag via WebKreatives.com - $name";

$body  = "=== Nieuwe Website Aanvraag ===\n\n";
$body .= "Naam:       $name\n";
$body .= "E-mail:     $email\n";
$body .= "Telefoon:   " . ($phone ?: "Niet ingevuld") . "\n";
$body .= "Branche:    " . ($type ?: "Niet gekozen") . "\n";
$body .= "Pakket:     " . ($package ?: "Niet gekozen") . "\n";
$body .= "\n--- Bericht ---\n\n";
$body .= strip_tags($message) . "\n\n";
$body .= "---\n";
$body .= "Verzonden op: " . date('d-m-Y H:i') . "\n";
$body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

$headers  = "From: $site_name <noreply@webkreatives.com>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// -- Send --
$sent = mail($to_email, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(["status" => "ok", "message" => "Bericht verzonden!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Er ging iets mis. Probeer het later opnieuw."]);
}
?>
