export const forgotPasswordTemplate = (userName: string, url: string) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            color: #ea580c;
        }
        .content {
            text-align: center;
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
        }
        .reset-btn {
            display: inline-block;
            background-color: #ea580c;
            color: #ffffff !important;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>

        <div class="content">
            <p>Hi ${userName},</p>
            <p>We received a request to reset your password for your Cybershop account. Please click the button below to reset your password.</p>
            <a href="${url}" class="reset-btn">Reset Password</a>
            <p>This link will be valid for 20 minutes only. If you did not request a password reset, please ignore this email.</p>
        </div>

        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Cybershop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

    `;
}