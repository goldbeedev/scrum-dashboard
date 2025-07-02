import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { invitationId } = await request.json();
    
    if (!invitationId || typeof invitationId !== 'number') {
      return NextResponse.json(
        { error: 'Please provide a valid invitation ID' },
        { status: 400 }
      );
    }

    // Get the current user and their tenant
    const currentUser = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
      include: { tenant: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the invitation and verify it belongs to the user's tenant
    const invitation = await prisma.invitation.findFirst({
      where: {
        id: invitationId,
        tenantId: currentUser.tenantId,
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found or you do not have permission to revoke it' },
        { status: 404 }
      );
    }

    // Only allow revoking pending invitations
    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: 'Only pending invitations can be revoked' },
        { status: 400 }
      );
    }

    // Update the invitation status to 'revoked'
    const updatedInvitation = await prisma.invitation.update({
      where: { id: invitationId },
      data: { status: 'revoked' },
    });

    return NextResponse.json({
      success: true,
      message: 'Invitation revoked successfully',
      invitation: updatedInvitation
    });
  } catch (error) {
    console.error('Revoke invitation error:', error);
    return NextResponse.json(
      { error: 'Failed to revoke invitation. Please try again later.' },
      { status: 500 }
    );
  }
} 