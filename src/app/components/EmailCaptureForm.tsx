'use client';

import { FormEvent, useState } from 'react';

export default function EmailCaptureForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email to confirm.');
        setEmail('');
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className="form-control w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="input input-bordered flex-1 bg-gray-800 text-white border-gray-700 placeholder-gray-400" 
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Get Started'}
        </button>
      </form>
      {message && (
        <label className="label">
          <span className={`label-text-alt ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </span>
        </label>
      )}
      {status !== 'success' && (
        <label className="label">
          <span className="label-text-alt text-gray-400">Free 14-day trial, no credit card required</span>
        </label>
      )}
    </div>
  );
} 