import nodemailer from 'nodemailer';
import { getVerificationEmailTemplate } from './mail-templates';

/**
 * Configure Nodemailer transporter using environment variables.
 */
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends a verification email to a user.
 * 
 * @param email The recipient's email address.
 * @param code The 6-digit verification code.
 * @param userName The recipient's full name.
 */
export async function sendVerificationEmail(email: string, code: string, userName: string = 'User') {
    try {
        const mailOptions = {
            from: `"Learn Sync" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: email,
            subject: 'Verify Your Email - Learn Sync',
            html: getVerificationEmailTemplate(userName, code),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending verification email:', error);
        // We log the error but don't want to crash the registration flow if email fails.
        // However, we return success: false so the caller can decide what to do.
        return { success: false, error };
    }
}
