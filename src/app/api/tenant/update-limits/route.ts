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

    const { maxUsers } = await request.json();
    
    if (!maxUsers || typeof maxUsers !== 'number' || maxUsers < 1) {
      return NextResponse.json(
        { error: 'Please provide a valid number of users' },
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

    // Update the tenant's maxUsers
    const updatedTenant = await prisma.tenant.update({
      where: { id: currentUser.tenantId },
      data: { maxUsers },
      include: { users: true },
    });

    return NextResponse.json({
      success: true,
      tenant: updatedTenant,
      message: `Team limit updated to ${maxUsers} users`
    });
  } catch (error) {
    console.error('Update tenant limits error:', error);
    return NextResponse.json(
      { error: 'Failed to update team limits' },
      { status: 500 }
    );
  }
} 