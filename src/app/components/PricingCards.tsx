'use client';

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Beta Access */}
      <div className="card bg-gradient-to-b from-blue-900 to-purple-900 shadow-xl scale-105 border border-purple-500">
        <div className="card-body items-center text-center">
          <div className="badge bg-blue-500 border-none text-white mb-2 font-display">COMING SOON</div>
          <h3 className="card-title text-2xl text-white font-display">Basic Plan</h3>
          <div className="my-4">
            <div className="mb-1">
              <span className="text-xl line-through text-gray-400 font-display">$9</span>
              <span className="text-xl text-gray-400">/user/month</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-white font-display">$7</span>
              <span className="text-xl text-gray-200">/user/month</span>
              <span className="px-2 py-1 bg-opacity-20 bg-blue-500 border border-blue-400 rounded-md text-blue-400 text-xs font-medium">BETA PRICE</span>
            </div>
          </div>
          <ul className="space-y-2 min-h-[200px] mb-4 text-gray-200">
            <li className="font-semibold text-blue-400 mb-2">Core Features:</li>
            <li>✓ Sprint Management</li>
            <li>✓ Planning Poker</li>
            <li>✓ Basic Retro Tools</li>
            <li>✓ Core Jira Integration</li>
            <li>✓ Basic Analytics</li>
            <li className="font-semibold text-blue-400 mt-4">Beta Benefits:</li>
            <li>✓ Early Access to Core Features</li>
            <li>✓ Shape Product Development</li>
            <li>✓ Lock in $7/user Price Forever*</li>
          </ul>
          <div className="card-actions flex-col gap-2">
            <button 
              onClick={() => {
                const element = document.getElementById('signup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="btn bg-blue-500 hover:bg-blue-600 text-white border-none btn-wide font-display"
            >
              Join Beta Waitlist
            </button>
            <span className="text-sm text-gray-200">Launching Q2 2024 - Limited Spots</span>
            <span className="text-xs text-gray-400 mt-2">*Price locked as long as you stay on Basic Plan</span>
          </div>
        </div>
      </div>

      {/* Team Plan - Future */}
      <div className="card bg-opacity-50 bg-gray-900 shadow-xl border border-gray-800">
        <div className="card-body items-center text-center opacity-75">
          <div className="badge bg-gray-700 border-none text-white mb-2 font-display">POST-BETA</div>
          <h3 className="card-title text-2xl text-purple-400 font-display">Team</h3>
          <div className="my-4">
            <div className="mb-1">
              <span className="text-xl line-through text-gray-400 font-display">$15</span>
              <span className="text-xl text-gray-400">/user/month</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-white font-display">$12</span>
              <span className="text-xl text-gray-400">/user/month</span>
            </div>
          </div>
          <ul className="space-y-2 min-h-[200px] mb-4 text-gray-300">
            <li>✓ Everything in Basic, plus:</li>
            <li>✓ Advanced Analytics</li>
            <li>✓ Slack Integration</li>
            <li>✓ Custom Templates</li>
            <li>✓ API Access</li>
            <li>✓ Priority Support</li>
          </ul>
          <div className="card-actions flex-col gap-2">
            <button 
              onClick={() => {
                const element = document.getElementById('signup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-wide font-display"
            >
              Get Updates
            </button>
            <span className="text-sm text-gray-400">Available after beta</span>
          </div>
        </div>
      </div>

      {/* Enterprise Plan - Future */}
      <div className="card bg-opacity-50 bg-gray-900 shadow-xl border border-gray-800">
        <div className="card-body items-center text-center opacity-75">
          <div className="badge bg-gray-700 border-none text-white mb-2 font-display">POST-BETA</div>
          <h3 className="card-title text-2xl text-purple-400 font-display">Enterprise</h3>
          <div className="my-4">
            <span className="text-4xl font-bold text-white font-display">Custom</span>
          </div>
          <ul className="space-y-2 min-h-[200px] mb-4 text-gray-300">
            <li>✓ Everything in Team, plus:</li>
            <li>✓ SSO & Advanced Security</li>
            <li>✓ Custom Integrations</li>
            <li>✓ Dedicated Support</li>
            <li>✓ Custom API Access</li>
            <li>✓ SLA Guarantee</li>
          </ul>
          <div className="card-actions flex-col gap-2">
            <button 
              onClick={() => {
                const element = document.getElementById('signup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-wide font-display"
            >
              Get Updates
            </button>
            <span className="text-sm text-gray-400">Available after beta</span>
          </div>
        </div>
      </div>
    </div>
  );
} 