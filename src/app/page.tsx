import type { Metadata } from 'next';
import EmailCaptureForm from './components/EmailCaptureForm';
import PricingCards from './components/PricingCards';

export const metadata: Metadata = {
  title: 'Scrum Dashboard - Your All-in-One Agile Ceremony Platform',
  description: 'Streamline Planning Poker, Retros, and Refinements with Jira and Slack integration. The complete platform for managing your Scrum ceremonies and team collaboration.',
  keywords: ['Scrum Dashboard', 'Planning Poker', 'Agile Retros', 'Jira Integration', 'Scrum Ceremonies', 'Team Collaboration'],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-black">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-purple-400 font-display tracking-tight">Scrum Dashboard</h1>
            <p className="py-6 text-xl text-gray-300 leading-relaxed">
              Your complete platform for Scrum ceremonies. Run engaging Planning Poker sessions,
              track sprint improvements, and manage refinements - all integrated with Jira and Slack.
              Make data-driven decisions with ceremony analytics and team insights.
            </p>
            
            {/* Email CTA Form */}
            <EmailCaptureForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400 font-display tracking-tight">Powerful Scrum Ceremony Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-black shadow-xl border border-gray-800">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-purple-400 font-display">Smart Planning Poker</h3>
                <p className="text-gray-300">Run efficient estimation sessions with real-time voting, historical estimation analytics, and automatic Jira updates</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="card bg-black shadow-xl border border-gray-800">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-purple-400 font-display">Retro Tracking</h3>
                <p className="text-gray-300">Document and track sprint improvements, assign action items, and maintain a searchable history of team learnings</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="card bg-black shadow-xl border border-gray-800">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-purple-400 font-display">Seamless Integration</h3>
                <p className="text-gray-300">Connect with Jira for issue tracking and Slack for notifications. Assign tasks and track progress across all ceremonies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400 font-display tracking-tight">Everything You Need for Scrum Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 font-display">Refinement Management</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Track backlog refinement sessions</li>
                <li>• Document acceptance criteria</li>
                <li>• Manage story breakdowns</li>
                <li>• Link related Jira issues</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 font-display">Team Analytics</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Planning accuracy insights</li>
                <li>• Sprint improvement tracking</li>
                <li>• Team velocity metrics</li>
                <li>• Historical ceremony data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-400 font-display tracking-tight">Early Access Pricing</h2>
          <p className="text-center mb-12 text-lg text-gray-300">Be among the first to transform your Scrum ceremonies</p>
          <PricingCards />
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white font-display tracking-tight">Level Up Your Scrum Ceremonies</h2>
          <p className="mb-8 text-xl text-gray-200">Join our early access program and help shape the future of agile team collaboration. Integrate with your existing tools and start making data-driven decisions.</p>
          <EmailCaptureForm />
        </div>
      </section>
    </main>
  );
}
