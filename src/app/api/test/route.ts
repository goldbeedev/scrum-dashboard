import { NextResponse } from 'next/server';

// Hard-coded API key for testing only
// In production, use a proper API key system
const TEST_API_KEY = 'test_api_key_12345';

export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  
  // Basic authentication check
  if (apiKey !== TEST_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized. Invalid API key.' },
      { status: 401 }
    );
  }
  
  // Provide test data if key is valid
  return NextResponse.json({
    status: 'success',
    message: 'API test successful',
    data: {
      projects: [
        { id: 1, name: 'Test Project 1', status: 'active' },
        { id: 2, name: 'Test Project 2', status: 'completed' },
        { id: 3, name: 'Test Project 3', status: 'pending' }
      ],
      timestamp: new Date().toISOString()
    }
  });
} 