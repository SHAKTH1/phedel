const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));


app.post('/submit-chatbot', async (req, res) => {
    const { name, productHelp, email, contactNumber } = req.body;  // Correct the destructured field

    // Set up the email transport configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'santoshoff4@gmail.com',
            pass: 'neqx hgka egfa qeni'  // Handle this securely
        }
    });

    const mailOptions = {
        from: 'santoshoff4@gmail.com',
        to: 'santoshoff4@gmail.com',
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

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback to index.html for any routes not handled
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
