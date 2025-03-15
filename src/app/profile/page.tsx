"use client"

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

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
      <div className="grid gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Personal Information</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" defaultValue={user.name || ''} className="input input-bordered w-full" />
              
              <label className="label mt-4">
                <span className="label-text">Email</span>
              </label>
              <input type="email" defaultValue={user.email || ''} className="input input-bordered w-full" />
              
              <label className="label mt-4">
                <span className="label-text">Phone</span>
              </label>
              <input type="tel" placeholder="+1 (555) 123-4567" className="input input-bordered w-full" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Shipping Address</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea className="textarea textarea-bordered h-24" placeholder="123 Main St, Apt 4B"></textarea>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Preferences</h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email Notifications</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">SMS Updates</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Newsletter</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 mb-6 flex justify-center">
        <button className="btn btn-primary w-48">Save Changes</button>
      </div>
    </div>
  );
});
