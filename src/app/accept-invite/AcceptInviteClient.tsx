'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export default function AcceptInviteClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { user, isLoading } = useUser();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'auth'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const acceptInvite = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('Invalid invitation link');
        return;
      }

      // If user is not logged in, show auth button
      if (!user && !isLoading) {
        setStatus('auth');
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
          // If the error is about being already a member, show a different message
          if (data.error === 'You are already a member of this team') {
            setStatus('error');
            setErrorMessage('This invitation has already been used. Please sign in with your account.');
            return;
          }
          throw new Error(data.error || 'Failed to accept invitation');
        }
        
        setStatus('success');
        // Redirect to profile page after 3 seconds
        setTimeout(() => {
          router.push('/profile');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to accept invitation. Please try again.');
      }
    };

    if (!isLoading) {
      acceptInvite();
    }
  }, [token, user, isLoading, router]);

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

  if (status === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Welcome to Scrum Dashboard!</h1>
          <p className="text-gray-300 mb-8">
            Please sign up or sign in with Auth0 to accept your invitation.
          </p>
          <div className="space-y-4">
            {user && (
              <a
                href="/api/auth/logout"
                className="block text-gray-400 hover:text-gray-300 mb-4"
              >
                Sign out from current account ({user.email})
              </a>
            )}
            <a
              href={`/api/auth/login?screen_hint=signup&returnTo=/accept-invite?token=${token}`}
              className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Sign up with Auth0
            </a>
          </div>
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
          <div className="space-y-4">
            {user && (
              <a
                href="/api/auth/logout"
                className="block text-gray-400 hover:text-gray-300 mb-4"
              >
                Sign out from current account ({user.email})
              </a>
            )}
            <a
              href="/"
              className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Return to Home
            </a>
          </div>
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
            Your invitation has been accepted. You will be redirected to your profile in a few seconds...
          </p>
          <a
            href="/profile"
            className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Go to Profile
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