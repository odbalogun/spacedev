<?php
/**
 * Contact / Quote form handler for SPACEDEV website.
 * Deploy this file alongside your built site (e.g. in the same directory as index.html).
 * Requires PHP with mail() enabled, or replace mail() with PHPMailer + SMTP for better deliverability.
 */

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Recipient – emails are sent here
$to = 'info@spacedevconsulting.com';

// Get and sanitize input
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$project = isset($_POST['project_type']) ? trim(strip_tags($_POST['project_type'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Basic validation
$errors = [];
if ($name === '') {
    $errors[] = 'Name is required';
}
if ($email === '') {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}
if ($message === '') {
    $errors[] = 'Message is required';
}

if (!empty($errors)) {
    header('Location: contact.html?error=1');
    exit;
}

// Build email
$subject = 'New message from SPACEDEV website';
$body    = "Name: $name\n";
$body   .= "Email: $email\n";
$body   .= "Project type: $project\n\n";
$body   .= "Message:\n$message\n";

$headers = [];
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: SPACEDEV Website <noreply@' . ($_SERVER['HTTP_HOST'] ?? 'spacedevconsulting.com') . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    header('Location: contact.html?sent=1');
} else {
    header('Location: contact.html?error=1');
}
exit;
