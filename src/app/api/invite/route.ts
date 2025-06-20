import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { generateInvitationToken, INVITATION_EXPIRY_DAYS } from '@/app/utils/invitation';
import { canSendInvitation } from '@/app/utils/tenant-limits';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
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

    // Check if we can send an invitation
    const invitationCheck = await canSendInvitation(currentUser.tenantId, email);
    
    if (!invitationCheck.canInvite) {
      return NextResponse.json(
        { error: invitationCheck.reason },
        { status: 400 }
      );
    }

    // Create the invitation
    const token = generateInvitationToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS);

    const invitation = await prisma.invitation.create({
      data: {
        email,
        token,
        expiresAt,
        tenantId: currentUser.tenantId,
        invitedById: currentUser.id,
      },
    });

    // Send the invitation email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "You've been invited to join Scrum Dashboard",
      text: `You've been invited to join Scrum Dashboard by ${currentUser.email}.`,
      html: `
        <p>You've been invited to join <b>Scrum Dashboard</b> by ${currentUser.email}.</p>
        <p>Click the link below to accept your invitation:</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/accept-invite?token=${token}">Accept Invitation</a></p>
        <p>This invitation will expire in ${INVITATION_EXPIRY_DAYS} days.</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Invitation error:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation. Please try again later.' },
      { status: 500 }
    );
  }
} 