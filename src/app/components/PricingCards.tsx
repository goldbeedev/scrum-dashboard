'use client';

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Team Plan */}
      <div className="card bg-gray-900 shadow-xl border border-gray-800">
        <div className="card-body items-center text-center">
          <h3 className="card-title text-2xl text-purple-400 font-display">Team</h3>
          <div className="my-4">
            <div className="mb-2">
              <span className="text-xl line-through text-gray-500 font-display">$15</span>
              <span className="text-xl text-gray-500">/user/month</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-white font-display">$12</span>
              <span className="text-xl text-gray-400">/user/month</span>
              <span className="px-2 py-1 bg-opacity-20 bg-purple-500 border border-purple-400 rounded-md text-purple-400 text-xs font-medium">EARLY ACCESS</span>
            </div>
          </div>
          <ul className="space-y-2 min-h-[200px] mb-4 text-gray-300">
            <li>✓ Planning Poker Sessions</li>
            <li>✓ Basic Retro Tools</li>
            <li>✓ Refinement Tracking</li>
            <li>✓ Basic Jira Integration</li>
            <li>✓ Up to 15 Team Members</li>
          </ul>
          <div className="card-actions flex-col gap-2">
            <button 
              onClick={() => window.location.href = '#signup'} 
              className="btn bg-purple-600 hover:bg-purple-700 text-white border-none btn-wide font-display"
            >
              Start Free Trial
            </button>
            <span className="text-sm text-gray-400">Lock in early access pricing forever</span>
          </div>
        </div>
      </div>

      {/* Scale Plan - Most Popular */}
      <div className="card bg-gradient-to-b from-blue-900 to-purple-900 shadow-xl scale-105 border border-purple-500">
        <div className="card-body items-center text-center">
          <div className="badge bg-purple-500 border-none text-white mb-2 font-display">MOST POPULAR</div>
          <h3 className="card-title text-2xl text-white font-display">Scale</h3>
          <div className="my-4">
            <div className="mb-2">
              <span className="text-xl line-through text-gray-300 font-display">$24</span>
              <span className="text-xl text-gray-300">/user/month</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-white font-display">$19</span>
              <span className="text-xl text-gray-200">/user/month</span>
              <span className="px-2 py-1 bg-opacity-20 bg-blue-500 border border-blue-400 rounded-md text-blue-400 text-xs font-medium">EARLY ACCESS</span>
            </div>
          </div>
          <ul className="space-y-2 min-h-[200px] mb-4 text-gray-200">
            <li>✓ Everything in Team, plus:</li>
            <li>✓ Advanced Analytics Dashboard</li>
            <li>✓ Historical Data & Insights</li>
            <li>✓ Full Jira & Slack Integration</li>
            <li>✓ Custom Workflow Templates</li>
            <li>✓ Unlimited Team Members</li>
          </ul>
          <div className="card-actions flex-col gap-2">
            <button 
              onClick={() => window.location.href = '#signup'} 
              className="btn bg-blue-500 hover:bg-blue-600 text-white border-none btn-wide font-display"
            >
              Start Free Trial
            </button>
            <span className="text-sm text-gray-200">Lock in early access pricing forever</span>
          </div>
        </div>
      </div>

      {/* Enterprise Plan */}
      <div className="card bg-gray-900 shadow-xl border border-gray-800">
        <div className="card-body items-center text-center">
          <h3 className="card-title text-2xl text-purple-400 font-display">Enterprise</h3>
          <div className="my-4">
            <span className="text-4xl font-bold text-white font-display">Custom</span>
            <span className="text-xl text-gray-400"></span>
          </div>
          <ul className="space-y-2 min-h-[200px] mb-4 text-gray-300">
            <li>✓ Everything in Scale, plus:</li>
            <li>✓ SSO & Advanced Security</li>
            <li>✓ Custom API Access</li>
            <li>✓ Dedicated Support Manager</li>
            <li>✓ Custom Integrations</li>
            <li>✓ SLA Guarantee</li>
          </ul>
          <div className="card-actions flex-col gap-2">
            <button 
              onClick={() => window.location.href = '/contact'} 
              className="btn bg-purple-600 hover:bg-purple-700 text-white border-none btn-wide font-display"
            >
              Contact Sales
            </button>
            <span className="text-sm text-gray-400">Special early access enterprise benefits</span>
          </div>
        </div>
      </div>
    </div>
  );
} 