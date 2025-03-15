import { Resend } from 'resend'; // or use SendGrid, Postmark, etc.

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailTemplate = 'welcome' | 'reset-password' | 'verify-email' | 'invoice';

const templates: Record<EmailTemplate, (data: any) => { subject: string, html: string }> = {
  'welcome': (user) => ({
    subject: 'Welcome to Our SaaS!',
    html: `
      <h1>Welcome ${user.name}!</h1>
      <p>Thanks for signing up. Here's what you need to know to get started...</p>
    `
  }),
  'reset-password': (data) => ({
    subject: 'Reset Your Password',
    html: `
      <h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${data.resetLink}">Reset Password</a>
    `
  }),
  'verify-email': (data) => ({
    subject: 'Verify Your Email',
    html: `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${data.verifyLink}">Verify Email</a>
    `
  }),
  'invoice': (data) => ({
    subject: `Invoice for ${data.period}`,
    html: `
      <h1>Your Invoice</h1>
      <p>Amount: ${data.amount}</p>
      <p>Due Date: ${data.dueDate}</p>
    `
  })
};

export async function sendEmail(
  to: string,
  template: EmailTemplate,
  data: any
) {
  try {
    const { subject, html } = templates[template](data);
    
    const response = await resend.emails.send({
      from: 'Your SaaS <noreply@yoursaas.com>',
      to,
      subject,
      html
    });

    return { success: true, id: response.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
} 