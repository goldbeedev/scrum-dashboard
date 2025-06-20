import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { getTenantInvitationStats } from '@/app/utils/tenant-limits';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user and their tenant
    const currentUser = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
      include: { tenant: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get tenant statistics
    const stats = await getTenantInvitationStats(currentUser.tenantId);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Tenant stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get tenant statistics' },
      { status: 500 }
    );
  }
} 