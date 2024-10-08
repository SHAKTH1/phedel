require('dotenv').config(); // Load environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Email sending routes
app.post('/submit-chatbot', async (req, res) => {
    const { name, productHelp, email, contactNumber } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.rediffmailpro.com', // Correct Rediffmail SMTP server
        port: 465, // For SSL, 587 for TLS
        secure: true, // Use SSL (true for 465, false for 587 with TLS)
        auth: {
            user: 'support@phedelco.com', // Your Rediffmail email address
            pass: 'admin2014' // Your Rediffmail password
        }
    });
    
    const mailOptions = {
        from: 'support@phedelco.com', // Your Rediffmail email address
        to: 'support@phedelco.com', // Recipient email address (for this case, sending to self)
        subject: 'Product Enquiry',
        text: `Name: ${name}\nProduct Help: ${productHelp.join(', ')}\nEmail: ${email}\nContact: ${contactNumber}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// Email sending route for the contact form
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.rediffmailpro.com', // Correct Rediffmail SMTP server
        port: 465, // For SSL, 587 for TLS
        secure: true, // Use SSL
        auth: {
            user: 'support@phedelco.com', // Your Rediffmail email address
            pass: 'admin2014' // Your Rediffmail password
        }
    });

    const mailOptions = {
        from: 'support@phedelco.com', // Must match the authenticated Rediffmail email address
        replyTo: email, // Use the user's email in the replyTo field
        to: 'support@phedelco.com', // Your Rediffmail email address (self or team)
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});


// Serve the index.html file from the public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Serve the product.html file from the public directory
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/product.html'));
});

// Fallback to index.html for any other routes (keep this at the end)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
