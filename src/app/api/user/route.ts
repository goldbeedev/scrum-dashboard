import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
      include: { tenant: true },
    });

    if (!user) {
      // Create a new tenant for the user
      const tenant = await prisma.tenant.create({
        data: {
          name: `${session.user.name || session.user.email}'s Team`,
          maxUsers: 5, // Default to 5 seats
        },
      });

      // Create the user
      user = await prisma.user.create({
        data: {
          auth0Id: session.user.sub,
          email: session.user.email!,
          name: session.user.name,
          tenantId: tenant.id,
        },
        include: { tenant: true },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json(
      { error: 'Failed to get or create user' },
      { status: 500 }
    );
  }
} 