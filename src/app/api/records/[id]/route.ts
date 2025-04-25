import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { validateApiKey } from '@/app/lib/api-auth';

// GET - Retrieve a specific record
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check API key
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const record = await prisma.record.findUnique({
      where: { id: params.id }
    });
    
    if (!record) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      data: record
    });
  } catch (error) {
    console.error('Error fetching record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch record' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific record
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check API key
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const json = await request.json();
    
    // Check if record exists
    const existingRecord = await prisma.record.findUnique({
      where: { id: params.id }
    });
    
    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
    
    // Update the record
    const updatedRecord = await prisma.record.update({
      where: { id: params.id },
      data: {
        name: json.name ?? existingRecord.name,
        description: json.description ?? existingRecord.description,
        data: json.data ?? existingRecord.data
      }
    });
    
    return NextResponse.json({
      status: 'success',
      message: 'Record updated',
      data: updatedRecord
    });
  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json(
      { error: 'Failed to update record' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific record
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check API key
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    // Check if record exists
    const existingRecord = await prisma.record.findUnique({
      where: { id: params.id }
    });
    
    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
    
    // Delete the record
    await prisma.record.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({
      status: 'success',
      message: 'Record deleted'
    });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json(
      { error: 'Failed to delete record' },
      { status: 500 }
    );
  }
} 