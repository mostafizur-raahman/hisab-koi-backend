require("dotenv").config(); // Import dotenv

const { createTransport } = require("nodemailer");

class NodeMailer {
    constructor({ Fault }) {
        // this.systemConfigRepository = systemConfigRepository;
        this.Fault = Fault;

        // Load SMTP credentials from environment variables
        this.SMTP = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        };

        this.transporter = null; // Initialize transporter as null
    }

    init = async () => {
        try {
            if (!this.transporter) {
                this.transporter = createTransport({
                    host: this.SMTP.host,
                    port: this.SMTP.port,
                    secure: false, // Use `false` when using TLS over port 587
                    auth: {
                        user: this.SMTP.auth.user,
                        pass: this.SMTP.auth.pass,
                    },
                });
            }
        } catch (error) {
            throw new this.Fault(
                "Internal Server Error during SMTP initialization",
                500
            );
        }
    };

    sendEmail = async ({ to, body, subject }) => {
        try {
            await this.init(); // Ensure transporter is initialized

            const info = await this.transporter.sendMail({
                from: this.SMTP.auth.user, // Sender's email
                to: to.join(", "), // List of recipients
                subject: subject,
                html: body, // Email body in HTML format
            });

            return info; // Return the info object containing message ID and more
        } catch (err) {
            const errorMessage =
                err?.message || `Email send failed to ${to.join(", ")}`;
            throw new this.Fault(errorMessage, 400);
        }
    };
}

module.exports = NodeMailer;
