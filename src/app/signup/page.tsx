import type { Metadata } from 'next';
import SignupFlow from './components/SignupFlow';

export const metadata: Metadata = {
  title: 'Sign Up - Scrum Dashboard',
  description: 'Get started with Scrum Dashboard. Choose your plan and invite your team.',
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-black">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-purple-400 font-display tracking-tight">Get Started with Scrum Dashboard</h1>
            <p className="py-6 text-xl text-gray-300 leading-relaxed">
              Choose your plan, invite your team, and start transforming your Scrum ceremonies.
              All plans include our core features with Jira and Slack integration.
            </p>
            
            {/* Signup Flow Component */}
            <SignupFlow />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400 font-display tracking-tight">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-black shadow-xl border border-gray-800">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-purple-400 font-display">Core Features</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Planning Poker</li>
                  <li>• Retro Tracking</li>
                  <li>• Refinement Management</li>
                  <li>• Team Analytics</li>
                </ul>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="card bg-black shadow-xl border border-gray-800">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-purple-400 font-display">Integrations</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Jira Integration</li>
                  <li>• Slack Notifications</li>
                  <li>• Real-time Updates</li>
                  <li>• API Access</li>
                </ul>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="card bg-black shadow-xl border border-gray-800">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-purple-400 font-display">Support</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Email Support</li>
                  <li>• Documentation</li>
                  <li>• Training Resources</li>
                  <li>• Community Access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400 font-display tracking-tight">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2 font-display">How does the team invitation work?</h3>
              <p className="text-gray-300">After purchase, you'll be able to invite your team members via email. They'll receive a secure signup link to create their accounts.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2 font-display">Can I change my plan later?</h3>
              <p className="text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2 font-display">What happens if I need more seats?</h3>
              <p className="text-gray-300">You can add more seats to your plan at any time. Additional seats will be prorated for the remainder of your billing period.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 