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
      <h1 className="mb-5 font-['Sora'] text-2xl font-bold">Statistics Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      {stats && (
        <>
          <section className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="glass rounded-2xl p-5">
              <p className="text-sm text-slate-500">Total Species</p>
              <h2 className="font-['Sora'] text-3xl font-bold">{stats.totalSpecies}</h2>
            </article>
          </section>
          <Charts stats={stats} />
        </>
      )}
    </main>
  );
}

export default StatisticsDashboard;
