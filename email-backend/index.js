// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer'); // For handling file uploads (multipart/form-data)
const cors = require('cors'); // For handling Cross-Origin Resource Sharing

const app = express();
const port = process.env.PORT || 5000; // Server will run on port 5000 by default

// --- Middleware Setup ---
// Enable CORS for your frontend application
// IMPORTANT: In production, replace '*' with your React app's domain (e.g., 'https://your-react-app.com')
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your React dev server
}));
app.use(express.json()); // To parse JSON bodies (though Multer handles most of our form data)

// Configure Multer for file uploads
// Using memoryStorage to keep the file in memory as a Buffer
// This is suitable for smaller files like images/PDFs. For very large files, consider diskStorage.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Nodemailer Transporter Setup ---
// Configure the transporter with your email service details.
// !!! IMPORTANT !!! Use environment variables for sensitive info (EMAIL_USER, EMAIL_PASS).
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,     // e.g., 'smtp.gmail.com' for Gmail, 'smtp.mailgun.org'
    port: parseInt(process.env.EMAIL_PORT, 10), // Port for your SMTP server (e.g., 587 for TLS, 465 for SSL)
    secure: process.env.EMAIL_SECURE === 'true', // true for port 465 (SSL), false for other ports (like 587 with TLS)
    auth: {
        user: process.env.EMAIL_USER, // Your email address that will SEND the email
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Optional: Verify Nodemailer transporter connection (good for debugging)
transporter.verify(function (error, success) {
    if (error) {
        console.error("Nodemailer connection error:", error);
    } else {
        console.log("Nodemailer server is ready to send messages.");
    }
});

// --- API Endpoint for Form Submission ---
// `upload.single('design_file')` tells Multer to expect a single file field named 'design_file'
app.post('/api/send-email', upload.single('design_file'), async (req, res) => {
    // Access text fields from req.body
    const { full_name, email_address, phone_number, embroidery_needs } = req.body;
    // Access the uploaded file from req.file
    const designFile = req.file;

    // Basic validation
    if (!full_name || !email_address || !phone_number || !embroidery_needs) {
        return res.status(400).json({ message: 'Please fill in all required text fields.' });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,         // Sender address (your email)
            to: process.env.RECEIVER_EMAIL,       // Receiver address (the email where you want to get submissions)
            subject: `New Quote Request from ${full_name}`, // Email subject
            html: `
                <h2>New Custom Embroidery Quote Request</h2>
                <p><strong>Full Name:</strong> ${full_name}</p>
                <p><strong>Email:</strong> ${email_address}</p>
                <p><strong>Phone Number:</strong> ${phone_number}</p>
                <br/>
                <p><strong>Embroidery Needs:</strong></p>
                <p>${embroidery_needs.replace(/\n/g, '<br>')}</p>
                ${designFile ? `<p><strong>Design File Attached:</strong> ${designFile.originalname}</p>` : ''}
            `,
            attachments: [], // Array to hold file attachments
        };

        // Add attachment if a file was uploaded
        if (designFile) {
            mailOptions.attachments.push({
                filename: designFile.originalname,
                content: designFile.buffer, // Use the buffer if multer.memoryStorage() was used
                contentType: designFile.mimetype,
            });
        }

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent from ${email_address} (${full_name})`);
        res.status(200).json({ message: 'Email sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});