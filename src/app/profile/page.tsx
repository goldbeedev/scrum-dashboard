"use client"

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import TenantUsageCard from '../components/TenantUsageCard';

export default withPageAuthRequired(function ProfilePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">
    <span className="loading loading-spinner loading-lg"></span>
  </div>;
  
  if (error) return <div className="alert alert-error">Error loading user data</div>;
  if (!user) return <div className="alert alert-error">No user found</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section with Avatar */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.picture || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                   alt="Profile" />
            </div>
          </div>
          <h2 className="card-title text-2xl">{user.name}</h2>
          <p className="text-base-content/70">{user.email}</p>
        </div>
      </div>

      {/* Team Usage Card */}
      <div className="mb-6">
        <TenantUsageCard />
      </div>

      {/* Stats */}
      <div className="stats shadow w-full mb-6">
        <div className="stat">
          <div className="stat-title">Orders</div>
          <div className="stat-value">12</div>
        </div>
        <div className="stat">
          <div className="stat-title">Reviews</div>
          <div className="stat-value">4</div>
        </div>
        <div className="stat">
          <div className="stat-title">Points</div>
          <div className="stat-value">240</div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder={user.name || "Enter your name"} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder={user.email || "Enter your email"} className="input input-bordered w-full" disabled />
              </div>
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Security</h2>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input type="password" placeholder="Enter current password" className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input type="password" placeholder="Enter new password" className="input input-bordered w-full" />
              </div>
              <button className="btn btn-secondary">Change Password</button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card bg-base-200 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title text-error">Danger Zone</h2>
          <p className="text-base-content/70 mb-4">These actions cannot be undone.</p>
          <div className="space-y-2">
            <button className="btn btn-outline btn-error">Delete Account</button>
            <a href="/api/auth/logout" className="btn btn-outline btn-warning">Sign Out</a>
          </div>
        </div>
      </div>
    </div>
  );
});
