'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter, useSearchParams } from 'next/navigation';
import ConfirmDialog from '../../components/ConfirmDialog';

type Step = 'auth' | 'plan' | 'payment' | 'invite';

interface TenantStats {
  usage: {
    currentUsers: number;
    pendingInvitations: number;
    totalInvitations: number;
    maxUsers: number | null;
    canInvite: boolean;
    remainingSlots: number | null;
  };
  invitations: Array<{
    id: number;
    email: string;
    status: string;
    createdAt: string;
    invitedBy: {
      name: string | null;
      email: string;
    };
  }>;
}

export default function SignupFlow() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>('auth');
  const [selectedPlan, setSelectedPlan] = useState<number>(5); // Default to 5 seats
  const [customSeats, setCustomSeats] = useState<number>(25); // Default custom seats
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [isSendingInvite, setIsSendingInvite] = useState<boolean>(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<boolean>(false);
  const [tenantStats, setTenantStats] = useState<TenantStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(false);
  const [revokingInvitation, setRevokingInvitation] = useState<number | null>(null);
  const [revokeError, setRevokeError] = useState<string | null>(null);
  const [revokeSuccess, setRevokeSuccess] = useState<string | null>(null);
  const [showRevokeDialog, setShowRevokeDialog] = useState<boolean>(false);
  const [invitationToRevoke, setInvitationToRevoke] = useState<{ id: number; email: string } | null>(null);
  const { user, isLoading } = useUser();
  const router = useRouter();

  const BASE_PRICE = 19; // Beta price per seat
  const BULK_DISCOUNT_THRESHOLD = 20; // Start bulk discount at 20 seats
  const BULK_DISCOUNT_PERCENTAGE = 15; // 15% discount for bulk orders

  useEffect(() => {
    const step = searchParams.get('step');
    if (step === 'invite') {
      setCurrentStep('invite');
    } else if (user && currentStep === 'auth') {
      setCurrentStep('plan');
    }
  }, [user, currentStep, searchParams]);

  useEffect(() => {
    const initializeUser = async () => {
      if (user && !isLoading) {
        try {
          // Ensure user exists in database
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error('Failed to initialize user');
          }
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
    };

    initializeUser();
  }, [user, isLoading]);

  useEffect(() => {
    const loadTenantStats = async () => {
      if (currentStep === 'invite' && user) {
        setIsLoadingStats(true);
        try {
          const response = await fetch('/api/tenant/stats');
          if (response.ok) {
            const stats = await response.json();
            setTenantStats(stats);
          }
        } catch (error) {
          console.error('Error loading tenant stats:', error);
        } finally {
          setIsLoadingStats(false);
        }
      }
    };

    loadTenantStats();
  }, [currentStep, user]);

  const calculatePrice = (seats: number) => {
    const baseTotal = seats * BASE_PRICE;
    if (seats >= BULK_DISCOUNT_THRESHOLD) {
      const discount = (baseTotal * BULK_DISCOUNT_PERCENTAGE) / 100;
      return Math.round(baseTotal - discount);
    }
    return baseTotal;
  };

  const calculatePerSeatPrice = (seats: number) => {
    const total = calculatePrice(seats);
    return (total / seats).toFixed(1);
  };

  const handlePlanSelect = (seats: number) => {
    setSelectedPlan(seats);
    setCurrentStep('payment');
  };

  const handleCustomSeats = (seats: number) => {
    setCustomSeats(seats);
    setSelectedPlan(seats);
  };

  const handlePaymentComplete = () => {
    setCurrentStep('invite');
  };

  const handleSendInvite = async () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      setInviteError('Please enter a valid email address');
      return;
    }

    // Check if we can send an invitation
    if (tenantStats && !tenantStats.usage.canInvite) {
      setInviteError(`Cannot send invitation. Team has ${tenantStats.usage.currentUsers} users and ${tenantStats.usage.pendingInvitations} pending invitations. Maximum allowed: ${tenantStats.usage.maxUsers}`);
      return;
    }

    setIsSendingInvite(true);
    setInviteError(null);
    setInviteSuccess(false);

    try {
      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inviteEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invitation');
      }

      setInviteSuccess(true);
      setInviteEmail('');
      
      // Refresh tenant stats
      const statsResponse = await fetch('/api/tenant/stats');
      if (statsResponse.ok) {
        const stats = await statsResponse.json();
        setTenantStats(stats);
      }
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : 'Failed to send invitation');
    } finally {
      setIsSendingInvite(false);
    }
  };

  const handleRevokeInvitation = async (invitationId: number) => {
    setRevokingInvitation(invitationId);
    setRevokeError(null);
    setRevokeSuccess(null);

    try {
      const response = await fetch('/api/invite/revoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invitationId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to revoke invitation');
      }

      // Show success message
      setRevokeSuccess('Invitation revoked successfully. Slot has been freed up.');

      // Refresh tenant stats
      const statsResponse = await fetch('/api/tenant/stats');
      if (statsResponse.ok) {
        const stats = await statsResponse.json();
        setTenantStats(stats);
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setRevokeSuccess(null);
      }, 3000);
    } catch (error) {
      setRevokeError(error instanceof Error ? error.message : 'Failed to revoke invitation');
    } finally {
      setRevokingInvitation(null);
    }
  };

  const openRevokeDialog = (invitation: { id: number; email: string }) => {
    setInvitationToRevoke(invitation);
    setShowRevokeDialog(true);
  };

  const closeRevokeDialog = () => {
    setShowRevokeDialog(false);
    setInvitationToRevoke(null);
  };

  const confirmRevoke = async () => {
    if (invitationToRevoke) {
      await handleRevokeInvitation(invitationToRevoke.id);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user && currentStep === 'auth') {
    return (
      <div className="mt-8">
        <a
          href="/api/auth/login"
          className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Sign in with Auth0
        </a>
      </div>
    );
  }

  if (currentStep === 'plan') {
    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400 text-center">Choose Your Plan</h2>
        <p className="text-gray-300 text-center">Lock in our beta price of $19/user/month forever*</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Small Team */}
          <div className={`h-full flex flex-col justify-between p-6 rounded-lg border-2 transition-all ${
            selectedPlan === 5
              ? 'border-purple-500 bg-purple-900/30 shadow-lg scale-105'
              : 'border-gray-700 hover:border-purple-500 bg-gray-900/60 hover:scale-105'
          }`}> 
            <div>
              <h3 className="text-xl font-semibold text-purple-400 text-center">Small Team</h3>
              <p className="text-3xl font-bold text-white mt-4 text-center">5 Seats</p>
              <p className="text-2xl font-bold text-white mt-2 text-center">${calculatePrice(5)}/month</p>
              <p className="text-gray-400 mt-1 text-center">${calculatePerSeatPrice(5)} per seat</p>
            </div>
            <button
              onClick={() => handlePlanSelect(5)}
              className="w-full mt-8 btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Select Plan
            </button>
          </div>
          {/* Growing Team */}
          <div className={`h-full flex flex-col justify-between p-6 rounded-lg border-2 transition-all ${
            selectedPlan === 10
              ? 'border-purple-500 bg-purple-900/30 shadow-lg scale-105'
              : 'border-gray-700 hover:border-purple-500 bg-gray-900/60 hover:scale-105'
          }`}>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 text-center">Growing Team</h3>
              <p className="text-3xl font-bold text-white mt-4 text-center">10 Seats</p>
              <p className="text-2xl font-bold text-white mt-2 text-center">${calculatePrice(10)}/month</p>
              <p className="text-gray-400 mt-1 text-center">${calculatePerSeatPrice(10)} per seat</p>
            </div>
            <button
              onClick={() => handlePlanSelect(10)}
              className="w-full mt-8 btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Select Plan
            </button>
          </div>
          {/* Bulk Discount */}
          <div className={`h-full flex flex-col justify-between p-6 rounded-lg border-2 transition-all ${
            selectedPlan === 20
              ? 'border-purple-500 bg-purple-900/30 shadow-lg scale-105'
              : 'border-gray-700 hover:border-purple-500 bg-gray-900/60 hover:scale-105'
          }`}>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-purple-400">Bulk Discount</h3>
                <span className="px-2 py-1 bg-blue-500/20 border border-blue-400 rounded-md text-blue-400 text-xs font-medium">{BULK_DISCOUNT_PERCENTAGE}% OFF</span>
              </div>
              <p className="text-3xl font-bold text-white mt-2 text-center">20 Seats</p>
              <p className="text-2xl font-bold text-white mt-2 text-center">${calculatePrice(20)}/month</p>
              <p className="text-gray-400 mt-1 text-center">${calculatePerSeatPrice(20)} per seat</p>
            </div>
            <button
              onClick={() => handlePlanSelect(20)}
              className="w-full mt-8 btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Select Plan
            </button>
          </div>
          {/* Custom Plan */}
          <div className={`h-full flex flex-col justify-between p-6 rounded-lg border-2 transition-all ${
            selectedPlan === customSeats
              ? 'border-purple-500 bg-purple-900/30 shadow-lg scale-105'
              : 'border-gray-700 hover:border-purple-500 bg-gray-900/60 hover:scale-105'
          }`}>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 text-center">Custom Plan</h3>
              <div className="flex justify-center mt-4 mb-2">
                <input
                  type="number"
                  min="1"
                  value={customSeats}
                  onChange={(e) => handleCustomSeats(parseInt(e.target.value) || 1)}
                  className="w-24 text-center px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-lg"
                />
              </div>
              <p className="text-2xl font-bold text-white mt-2 text-center">${calculatePrice(customSeats)}/month</p>
              <p className="text-gray-400 mt-1 text-center">${calculatePerSeatPrice(customSeats)} per seat</p>
              {customSeats >= BULK_DISCOUNT_THRESHOLD && (
                <p className="text-blue-400 mt-1 text-center text-sm">Includes {BULK_DISCOUNT_PERCENTAGE}% bulk discount</p>
              )}
            </div>
            <button
              onClick={() => handlePlanSelect(customSeats)}
              className="w-full mt-8 btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Select Custom Plan
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4 text-center">*Price locked as long as you stay on the Basic Plan</p>
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold text-blue-400">Complete Your Purchase</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <span className="text-gray-300">Selected Plan:</span>
            <span className="text-white font-semibold">{selectedPlan} Seats</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-300">Price per seat:</span>
            <span className="text-white font-semibold">
              ${calculatePerSeatPrice(selectedPlan)}/month
            </span>
          </div>
          {selectedPlan >= BULK_DISCOUNT_THRESHOLD && (
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Bulk discount ({BULK_DISCOUNT_PERCENTAGE}%):</span>
              <span className="text-green-400 font-semibold">
                -${Math.round((selectedPlan * BASE_PRICE * BULK_DISCOUNT_PERCENTAGE) / 100)}
              </span>
            </div>
          )}
          <div className="flex justify-between mb-6">
            <span className="text-gray-300">Total:</span>
            <span className="text-white font-semibold">
              ${calculatePrice(selectedPlan)}/month
            </span>
          </div>
          <button
            onClick={() => router.push(`/hosted-checkout?seats=${selectedPlan}`)}
            className="w-full btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'invite') {
    return (
      <>
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-blue-400">Invite Your Team</h2>
          
          {/* Team Usage Stats */}
          {isLoadingStats ? (
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="animate-pulse text-gray-400">Loading team stats...</div>
            </div>
          ) : tenantStats && (
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{tenantStats.usage.currentUsers}</div>
                  <div className="text-sm text-gray-400">Current Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{tenantStats.usage.pendingInvitations}</div>
                  <div className="text-sm text-gray-400">Pending Invites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{tenantStats.usage.totalInvitations}</div>
                  <div className="text-sm text-gray-400">Total Invites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {tenantStats.usage.remainingSlots !== null ? tenantStats.usage.remainingSlots : '∞'}
                  </div>
                  <div className="text-sm text-gray-400">Remaining Slots</div>
                </div>
              </div>
              {tenantStats.usage.maxUsers && (
                <div className="mt-3 text-center">
                  <div className="text-sm text-gray-400">
                    Plan limit: {tenantStats.usage.maxUsers} users
                  </div>
                  {!tenantStats.usage.canInvite && (
                    <div className="text-red-400 text-sm mt-1">
                      You've reached your plan limit
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Invitation Form */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter team member's email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  disabled={tenantStats ? !tenantStats.usage.canInvite : false}
                />
                <button 
                  onClick={handleSendInvite}
                  disabled={isSendingInvite || (tenantStats ? !tenantStats.usage.canInvite : false)}
                  className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingInvite ? 'Sending...' : 'Invite'}
                </button>
              </div>
              {inviteError && (
                <div className="text-red-400 text-sm">{inviteError}</div>
              )}
              {inviteSuccess && (
                <div className="text-green-400 text-sm">Invitation sent successfully!</div>
              )}
              <div className="text-sm text-gray-400">
                Team members will receive an email with instructions to create their account.
              </div>
            </div>
          </div>

          {/* Recent Invitations */}
          {tenantStats && tenantStats.invitations.length > 0 && (
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Recent Invitations</h3>
              {revokeError && (
                <div className="text-red-400 text-sm mb-4">{revokeError}</div>
              )}
              {revokeSuccess && (
                <div className="text-green-400 text-sm mb-4">{revokeSuccess}</div>
              )}
              <div className="space-y-3">
                {tenantStats.invitations.slice(0, 5).map((invitation) => (
                  <div key={invitation.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-white">{invitation.email}</div>
                      <div className="text-sm text-gray-400">
                        Invited by {invitation.invitedBy.name || invitation.invitedBy.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        invitation.status === 'pending' 
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400'
                          : invitation.status === 'accepted'
                          ? 'bg-green-500/20 text-green-400 border border-green-400'
                          : invitation.status === 'revoked'
                          ? 'bg-red-500/20 text-red-400 border border-red-400'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-400'
                      }`}>
                        {invitation.status}
                      </span>
                      <div className="text-xs text-gray-400">
                        {new Date(invitation.createdAt).toLocaleDateString()}
                      </div>
                      {invitation.status === 'pending' && (
                        <button
                          onClick={() => openRevokeDialog({ id: invitation.id, email: invitation.email })}
                          disabled={revokingInvitation === invitation.id}
                          className="btn btn-xs btn-error text-white"
                          title="Revoke invitation"
                        >
                          {revokingInvitation === invitation.id ? (
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            'Revoke'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showRevokeDialog}
          onClose={closeRevokeDialog}
          onConfirm={confirmRevoke}
          title="Revoke Invitation"
          message={`Are you sure you want to revoke the invitation sent to ${invitationToRevoke?.email}? This action cannot be undone.`}
          confirmText="Revoke"
          cancelText="Cancel"
          confirmButtonClass="btn-error"
        />
      </>
    );
  }

  return null;
} 