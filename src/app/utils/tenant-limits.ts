import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface TenantUsage {
  currentUsers: number;
  pendingInvitations: number;
  totalInvitations: number;
  maxUsers: number | null;
  canInvite: boolean;
  remainingSlots: number | null;
}

export async function getTenantUsage(tenantId: number): Promise<TenantUsage> {
  // Get current users in the tenant
  const currentUsers = await prisma.user.count({
    where: { tenantId }
  });

  // Get pending invitations (only count non-expired, non-revoked invitations)
  const pendingInvitations = await prisma.invitation.count({
    where: { 
      tenantId,
      status: 'pending',
      expiresAt: { gt: new Date() } // Only count non-expired invitations
    }
  });

  // Get total invitations (for analytics)
  const totalInvitations = await prisma.invitation.count({
    where: { tenantId }
  });

  // Get tenant info
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { maxUsers: true }
  });

  const maxUsers = tenant?.maxUsers || null;
  const remainingSlots = maxUsers ? maxUsers - currentUsers - pendingInvitations : null;
  const canInvite = maxUsers === null || (currentUsers + pendingInvitations) < maxUsers;


  return {
    currentUsers,
    pendingInvitations,
    totalInvitations,
    maxUsers,
    canInvite,
    remainingSlots
  };
}

export async function canSendInvitation(tenantId: number, email: string): Promise<{ canInvite: boolean; reason?: string }> {
  // Check if user already exists in the tenant
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      tenantId,
    },
  });

  if (existingUser) {
    return { 
      canInvite: false, 
      reason: 'User is already a member of this team' 
    };
  }

  // Check if there's already a pending invitation (not revoked)
  const existingInvitation = await prisma.invitation.findFirst({
    where: {
      email,
      tenantId,
      status: 'pending',
      expiresAt: { gt: new Date() }
    },
  });

  if (existingInvitation) {
    return { 
      canInvite: false, 
      reason: 'An invitation has already been sent to this email' 
    };
  }

  // Check tenant limits
  const usage = await getTenantUsage(tenantId);
  
  if (!usage.canInvite) {
    return { 
      canInvite: false, 
      reason: `Cannot send invitation. Team has ${usage.currentUsers} users and ${usage.pendingInvitations} pending invitations. Maximum allowed: ${usage.maxUsers}` 
    };
  }

  return { canInvite: true };
}

export async function getTenantInvitationStats(tenantId: number) {
  const [usage, invitations] = await Promise.all([
    getTenantUsage(tenantId),
    prisma.invitation.findMany({
      where: { tenantId },
      include: {
        invitedBy: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return {
    usage,
    invitations
  };
} 