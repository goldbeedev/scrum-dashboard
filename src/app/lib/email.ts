// Email utility for handling transactional emails
// This will be implemented later when we add user accounts
export type EmailTemplate = 'welcome' | 'reset-password' | 'verify-email' | 'invoice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendEmail(to: string, template: EmailTemplate, data: any = {}) {
  // This is a placeholder for future implementation
  // We'll implement this when we add user accounts and transactional emails
  console.log('Email would be sent:', { to, template, data });
  
  return { success: true };
} 