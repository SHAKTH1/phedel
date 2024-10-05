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
        service: 'gmail',
        auth: {
            user: 'shakthi.amarnath@gmail.com', // Your email address
            pass: 'leot sigm nvur fgou' // Your email app password (not your actual email password)
        }
    });

    const mailOptions = {
        from: 'shakthi.amarnath@gmail.com', // Your email address
        to: 'shakthi.amarnath@gmail.com', // Recipient email address
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
