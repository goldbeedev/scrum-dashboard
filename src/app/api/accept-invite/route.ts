import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { isInvitationExpired } from '@/app/utils/invitation';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid invitation token' },
        { status: 400 }
      );
    }

    // Find the invitation
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: { tenant: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invalid invitation' },
        { status: 400 }
      );
    }

    if (invitation.status === 'revoked') {
      return NextResponse.json(
        { error: 'This invitation has been revoked' },
        { status: 400 }
      );
    }

    if (invitation.status === 'accepted') {
      return NextResponse.json(
        { error: 'Invitation has already been used' },
        { status: 400 }
      );
    }

    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: 'Invitation is no longer valid' },
        { status: 400 }
      );
    }

    if (isInvitationExpired(invitation.expiresAt)) {
      return NextResponse.json(
        { error: 'Invitation has expired' },
        { status: 400 }
      );
    }

    // Verify that the email matches the invitation
    if (session.user.email?.toLowerCase() !== invitation.email.toLowerCase()) {
      return NextResponse.json(
        { error: 'This invitation was sent to a different email address' },
        { status: 400 }
      );
    }

    // Check if user exists in our database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { auth0Id: session.user.sub },
          { email: session.user.email }
        ]
      },
    });

    if (existingUser) {
      // If user exists but not in this tenant, add them
      if (existingUser.tenantId !== invitation.tenantId) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { tenantId: invitation.tenantId },
        });
      } else {
        return NextResponse.json(
          { error: 'You are already a member of this team' },
          { status: 400 }
        );
      }
    } else {
      // Create new user in the tenant
      await prisma.user.create({
        data: {
          auth0Id: session.user.sub,
          email: session.user.email!,
          name: session.user.name,
          tenantId: invitation.tenantId,
        },
      });
    }

    // Update invitation status
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: 'accepted' },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Invitation accepted successfully'
    });
  } catch (error) {
    console.error('Accept invitation error:', error);
    return NextResponse.json(
      { error: 'Failed to accept invitation. Please try again later.' },
      { status: 500 }
    );
  }
} 