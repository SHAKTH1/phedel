const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-chatbot', async (req, res) => {
    const { name, productHelp, email, contactNumber } = req.body;  // Correct the destructured field

    // Set up the email transport configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shakthi.amarnath@gmail.com',
            pass: 'runv edds mmlf avmc'  // Handle this securely
        }
    });

    const mailOptions = {
        from: 'shakthi.amarnath@gmail.com',
        to: 'shakthi.amarnath@gmail.com',
        subject: 'Chatbot Form Submission',
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

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
