import { NextResponse } from 'next/server';

// Get the test API key from environment variables
const TEST_API_KEY = process.env.TEST_API_KEY || 'test_api_key_12345';

/**
 * Middleware to validate API key
 * @param request The incoming request
 * @returns Response with error or null if valid
 */
export const validateApiKey = (request: Request): Response | null => {
  const apiKey = request.headers.get('x-api-key');
  
  // Check if API key exists
  if (!apiKey) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'API key is required', 
        message: 'Please provide an API key using the x-api-key header'
      }),
      { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
  
  // Validate API key
  if (apiKey !== TEST_API_KEY) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Invalid API key',
        message: 'The provided API key is invalid'
      }),
      { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
  
  // API key is valid
  return null;
} 