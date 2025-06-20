import type { Metadata } from 'next';
import EmailCaptureForm from './components/EmailCaptureForm';
import PricingCards from './components/PricingCards';

export const metadata: Metadata = {
  title: 'Scrum Dashboard - Your All-in-One Agile Ceremony Platform',
  description: 'Transform your agile ceremonies with Scrum Dashboard. Streamline Planning Poker, Retros, and Refinements with Jira and Slack integration. The complete platform for managing your Scrum ceremonies and team collaboration.',
  keywords: ['Scrum Dashboard', 'Planning Poker', 'Agile Retros', 'Jira Integration', 'Scrum Ceremonies', 'Team Collaboration'],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content font-sans">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] hero-gradient">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-primary font-display tracking-tight">Scrum Dashboard</h1>
            <p className="py-6 text-xl text-muted leading-relaxed">
              Your complete platform for Scrum ceremonies. Run engaging Planning Poker sessions,
              track sprint improvements, and manage refinements - all integrated with Jira and Slack.
              The Scrum Dashboard that helps you make data-driven decisions with ceremony analytics and team insights.
            </p>
            
            {/* Email CTA Form */}
            <EmailCaptureForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary font-display tracking-tight">Powerful Scrum Ceremony Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card card-dark">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-primary font-display">Smart Planning Poker</h3>
                <p className="text-muted">Run efficient estimation sessions with real-time voting, historical estimation analytics, and automatic Jira updates</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="card card-dark">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-primary font-display">Retro Tracking</h3>
                <p className="text-muted">Document and track sprint improvements, assign action items, and maintain a searchable history of team learnings</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="card card-dark">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl text-primary font-display">Seamless Integration</h3>
                <p className="text-muted">Your Scrum Dashboard connects seamlessly with Jira for issue tracking and Slack for notifications. Assign tasks and track progress across all ceremonies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary font-display tracking-tight">Everything You Need for Scrum Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 card-dark rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4 font-display">Refinement Management</h3>
              <ul className="space-y-3 text-muted">
                <li>• Track backlog refinement sessions</li>
                <li>• Document acceptance criteria</li>
                <li>• Manage story breakdowns</li>
                <li>• Link related Jira issues</li>
              </ul>
            </div>
            <div className="p-6 card-dark rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4 font-display">Team Analytics</h3>
              <ul className="space-y-3 text-muted">
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
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-secondary font-display tracking-tight">Early Access Pricing</h2>
          <p className="text-center mb-12 text-lg text-muted">Be among the first to experience the most intuitive Scrum Dashboard for your team</p>
          <PricingCards />
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-base-content font-display tracking-tight">Level Up Your Scrum Ceremonies</h2>
          <p className="mb-8 text-xl text-muted">Join the Scrum Dashboard beta and help shape the future of agile team collaboration. Integrate with your existing tools and start making data-driven decisions.</p>
          <EmailCaptureForm />
        </div>
      </section>
    </main>
  );
}
