/**
 * Generates the HTML content for the verification email.
 */
export function getVerificationEmailTemplate(userName: string, code: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Learn Sync</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f7f9;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            }
            .header {
                background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                padding: 40px 20px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }
            .content {
                padding: 40px 30px;
                line-height: 1.6;
            }
            .content p {
                margin-bottom: 20px;
                font-size: 16px;
            }
            .code-container {
                background-color: #f8fafc;
                border: 2px dashed #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 30px 0;
            }
            .verification-code {
                font-size: 36px;
                font-weight: 800;
                color: #4f46e5;
                letter-spacing: 8px;
                margin: 0;
            }
            .footer {
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #94a3b8;
                border-top: 1px solid #f1f5f9;
            }
            .highlight {
                color: #6366f1;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Learn Sync</h1>
            </div>
            <div class="content">
                <p>Hello <span class="highlight">${userName}</span>,</p>
                <p>Welcome to Learn Sync! We're excited to have you on board. To complete your registration and secure your account, please use the following verification code:</p>
                
                <div class="code-container">
                    <p class="verification-code">${code}</p>
                </div>
                
                <p>This code will expire in <strong>10 minutes</strong>. If you didn't request this email, you can safely ignore it.</p>
                
                <p>Best regards,<br>The Learn Sync Team</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Learn Sync. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
}

/**
 * Generates the HTML content for the password reset email.
 */
export function getPasswordResetEmailTemplate(userName: string, resetLink: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - Learn Sync</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f7f9;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            }
            .header {
                background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
                padding: 40px 20px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }
            .content {
                padding: 40px 30px;
                line-height: 1.6;
            }
            .content p {
                margin-bottom: 20px;
                font-size: 16px;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .action-button {
                display: inline-block;
                background-color: #ef4444;
                color: white;
                font-weight: 600;
                text-decoration: none;
                padding: 14px 30px;
                border-radius: 8px;
                font-size: 16px;
                box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
                transition: background-color 0.2s;
            }
            .action-button:hover {
                background-color: #dc2626;
            }
            .footer {
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #94a3b8;
                border-top: 1px solid #f1f5f9;
            }
            .highlight {
                color: #ef4444;
                font-weight: 600;
            }
            .url-link {
                word-break: break-all;
                font-size: 12px;
                color: #94a3b8;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Learn Sync</h1>
            </div>
            <div class="content">
                <p>Hello <span class="highlight">${userName}</span>,</p>
                <p>We received a request to reset your password for your Learn Sync account. If you didn't make this request, you can simply ignore this email.</p>
                
                <div class="button-container">
                    <a href="${resetLink}" class="action-button">Reset Password</a>
                </div>
                
                <p>This link will expire in <strong>1 hour</strong>.</p>
                
                <p>If the button above doesn't work, copy and paste this link into your browser:</p>
                <p class="url-link">${resetLink}</p>

                <p>Best regards,<br>The Learn Sync Team</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Learn Sync. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
}
