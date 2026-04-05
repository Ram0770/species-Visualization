import { useEffect, useState } from 'react';
import Charts from '../components/Charts';
import Navbar from '../components/Navbar';
import { getSpeciesStats } from '../services/speciesService';

function StatisticsDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await getSpeciesStats();
        setStats(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load statistics');
      }
    };

    loadStats();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-6">
      <Navbar />

      <section className="mb-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass rounded-[32px] p-6">
          <p className="section-kicker mb-3">Analytics Suite</p>
          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">Visualize how the species archive is growing and who shaped it.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            The statistics area now reads more like a polished insight surface, with clearer spacing and chart framing that better fits the rest of the dashboard.
          </p>
        </div>
        <div className="ink-panel rounded-[32px] p-6 text-white">
          <div className="relative z-10">
            <p className="section-kicker mb-3 text-white/50">Quick Insight</p>
            <p className="text-lg font-semibold">Track discovery trends, top contributors, and archive growth without leaving the main workflow.</p>
          </div>
        </div>
      </section>

      {error && <div className="glass mb-6 rounded-[28px] border-rose-200 p-5 text-rose-600">{error}</div>}

      {stats && (
        <>
          <section className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="metric-tile rounded-[28px] p-5">
              <p className="section-kicker mb-2">Total Species</p>
              <h2 className="text-4xl font-bold text-slate-950">{stats.totalSpecies}</h2>
              <p className="mt-2 text-sm text-slate-500">Records currently visible in the archive.</p>
            </article>
            <article className="metric-tile rounded-[28px] p-5">
              <p className="section-kicker mb-2">Distinct Years</p>
              <h2 className="text-4xl font-bold text-slate-950">{stats.perYear.length}</h2>
              <p className="mt-2 text-sm text-slate-500">Discovery years represented in the database.</p>
            </article>
            <article className="metric-tile rounded-[28px] p-5">
              <p className="section-kicker mb-2">Top Scientists</p>
              <h2 className="text-4xl font-bold text-slate-950">{stats.topScientists.length}</h2>
              <p className="mt-2 text-sm text-slate-500">Contributors shown in the current ranking.</p>
            </article>
            <article className="metric-tile rounded-[28px] p-5">
              <p className="section-kicker mb-2">Recent Entries</p>
              <h2 className="text-4xl font-bold text-slate-950">{stats.recentlyAdded.length}</h2>
              <p className="mt-2 text-sm text-slate-500">Latest additions highlighted in the timeline.</p>
            </article>
          </section>
          <Charts stats={stats} />
        </>
      )}
    </main>
  );
}

export default StatisticsDashboard;
