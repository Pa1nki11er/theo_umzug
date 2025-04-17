import nodemailer from "nodemailer";

const emailController = async (req, res) => {
    try {
        let { userEmail, subject, text, userName } = req.body.data;
        text = `User ${userName}, E-Mail: ${userEmail} has sent a message: ${text}`; // Append user email to the text
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_APP_PASS  
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject,
            text
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

export default emailController;