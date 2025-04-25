import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { validateApiKey } from '@/app/lib/api-auth';

// GET - List all records
export async function GET(request: Request) {
  // Check API key
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const records = await prisma.record.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      status: 'success',
      data: records
    });
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch records' },
      { status: 500 }
    );
  }
}

// POST - Create a new record
export async function POST(request: Request) {
  // Check API key
  const authError = validateApiKey(request);
  if (authError) return authError;
  
  try {
    const json = await request.json();
    
    // Validate required fields
    if (!json.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create the record
    const record = await prisma.record.create({
      data: {
        name: json.name,
        description: json.description,
        data: json.data || {}
      }
    });
    
    return NextResponse.json({
      status: 'success',
      message: 'Record created',
      data: record
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json(
      { error: 'Failed to create record' },
      { status: 500 }
    );
  }
} 