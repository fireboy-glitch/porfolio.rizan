<?php
header('Content-Type: application/json');

// Your email address
$to_email = "rizanmk27@gmail.com";

// Get JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Extract form data
$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$message = htmlspecialchars($data['message']);

// Prepare email content
$subject = "New Message from rizansubedi.com.np";
$body = "Name: $name\nEmail: $email\nMessage: $message";
$headers = "From: $email";

// Send email
if (mail($to_email, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?> 