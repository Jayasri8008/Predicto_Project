import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileHeader from '../components/ProfileHeader';
import ExperienceCard from '../components/ExperienceCard';

export default function Profile() {
  const { user } = useAuth();

  // Example / fallback data for presentation
  const stats = { projects: 12, followers: 340 };

  const skills = ['React', 'Tailwind CSS', 'TypeScript', 'UI Design', 'Accessibility'];

  const experiences = [
    {
      role: 'Senior Product Designer',
      company: 'Acme Corp',
      range: '2022 — Present',
      location: 'Remote',
      summary: 'Led product design for core ML-powered insights and improved onboarding conversion by 28%.'
    },
    {
      role: 'Frontend Engineer',
      company: 'Startup X',
      range: '2019 — 2022',
      location: 'Bengaluru, India',
      summary: 'Built a scalable component library and improved performance across the web app.'
    }
  ];

  const recentProjects = [
    { id: 1, title: 'AI Estimator', summary: 'End-to-end estimator UI and integrations' },
    { id: 2, title: 'Analytics Dashboard', summary: 'Custom charts and export features' }
  ];

  return (
    <main className="pt-28 pb-12 bg-white bg-gray-900">
      <ProfileHeader user={user || { name: 'Guest User', email: 'guest@predicto.ai' }} stats={stats} />

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 text-white">About</h3>
            <p className="mt-3 text-gray-600 text-gray-300">{user?.bio || 'No bio provided yet. Add a short intro that summarizes your experience, focus areas and what you bring to the table.'}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 text-white">Experience</h3>
            <div className="grid gap-4">
              {experiences.map((e, i) => (
                <ExperienceCard key={i} item={e} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 text-white">Recent Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {recentProjects.map(p => (
                <div key={p.id} className="card p-4">
                  <h4 className="font-semibold text-gray-900 text-white">{p.title}</h4>
                  <p className="text-sm text-gray-600 text-gray-300 mt-2">{p.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="card p-4">
            <h4 className="font-semibold text-gray-900 text-white">Skills</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="text-xs px-3 py-1 bg-brand-100 bg-brand-900 text-brand-700 text-brand-300 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-semibold text-gray-900 text-white">Contact</h4>
            <div className="mt-3 text-sm text-gray-600 text-gray-300 space-y-2">
              <div><strong className="text-gray-900 text-white">Email:</strong> {user?.email}</div>
              <div><strong className="text-gray-900 text-white">Location:</strong> {user?.location || 'Not specified'}</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
