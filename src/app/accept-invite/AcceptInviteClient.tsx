'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AcceptInviteClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { user, isLoading } = useUser();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const acceptInvite = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('Invalid invitation link');
        return;
      }

      try {
        const response = await fetch('/api/accept-invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to accept invitation');
        }
        
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to accept invitation. Please try again.');
      }
    };

    if (!isLoading) {
      acceptInvite();
    }
  }, [token, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-300 mb-8">{errorMessage}</p>
          <a
            href="/"
            className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-green-500 text-4xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-white mb-4">Welcome to Scrum Dashboard!</h1>
          <p className="text-gray-300 mb-8">
            Your invitation has been accepted. You can now access your team's dashboard.
          </p>
          <a
            href="/dashboard"
            className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-300">Processing your invitation...</p>
      </div>
    </div>
  );
} 