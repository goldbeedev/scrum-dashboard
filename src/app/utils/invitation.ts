import { randomBytes } from 'crypto';

export function generateInvitationToken(): string {
  return randomBytes(32).toString('hex');
}

export function isInvitationExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export const INVITATION_EXPIRY_DAYS = 7; // Invitations expire after 7 days 