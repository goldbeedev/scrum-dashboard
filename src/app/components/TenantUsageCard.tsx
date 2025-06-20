'use client';

import { useState, useEffect } from 'react';

interface TenantUsage {
  currentUsers: number;
  pendingInvitations: number;
  totalInvitations: number;
  maxUsers: number | null;
  canInvite: boolean;
  remainingSlots: number | null;
}

interface TenantStats {
  usage: TenantUsage;
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

export default function TenantUsageCard() {
  const [stats, setStats] = useState<TenantStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch('/api/tenant/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error loading tenant stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Team Usage</h2>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Team Usage</h2>
          <p className="text-error">Failed to load team statistics</p>
        </div>
      </div>
    );
  }

  const { usage } = stats;

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Team Usage</h2>
        
        <div className="stats stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title">Current Users</div>
            <div className="stat-value text-primary">{usage.currentUsers}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Pending Invites</div>
            <div className="stat-value text-warning">{usage.pendingInvitations}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Invites</div>
            <div className="stat-value text-info">{usage.totalInvitations}</div>
          </div>
          
          {usage.maxUsers && (
            <div className="stat">
              <div className="stat-title">Plan Limit</div>
              <div className="stat-value text-success">{usage.maxUsers}</div>
            </div>
          )}
        </div>

        {usage.maxUsers && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Usage</span>
              <span className="text-sm">
                {usage.currentUsers + usage.pendingInvitations} / {usage.maxUsers}
              </span>
            </div>
            <progress 
              className="progress progress-primary w-full" 
              value={usage.currentUsers + usage.pendingInvitations} 
              max={usage.maxUsers}
            ></progress>
            
            {usage.remainingSlots !== null && (
              <p className="text-sm text-gray-600 mt-2">
                {usage.remainingSlots > 0 
                  ? `${usage.remainingSlots} slots remaining`
                  : 'Plan limit reached'
                }
              </p>
            )}
          </div>
        )}

        {usage.maxUsers === null && (
          <p className="text-sm text-gray-600 mt-2">
            No user limit set for this team
          </p>
        )}

        <div className="card-actions justify-end mt-4">
          <a href="/signup?step=invite" className="btn btn-primary btn-sm">
            Invite Team Members
          </a>
        </div>
      </div>
    </div>
  );
} 