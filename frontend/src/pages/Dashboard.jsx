import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SpeciesCard from '../components/SpeciesCard';
import { getSpecies } from '../services/speciesService';

function Dashboard() {
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await getSpecies(search);
        setSpecies(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load species');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-6">
      <Navbar />
      <section className="page-enter">
        <div className="mb-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass rounded-[32px] p-6">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">Species Discovery Hub</p>
            <h1 className="font-['Sora'] text-3xl font-bold text-slate-950 md:text-4xl">Browse the bacterial collection like a modern research archive.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Search records by organism, researcher, or discovery year, then move directly into detailed species intelligence and protocol context.
            </p>
          </div>
          <div className="glass rounded-[32px] p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500">Dashboard Snapshot</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/65 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Visible records</p>
                <p className="mt-2 font-['Sora'] text-3xl font-bold text-slate-900">{species.length}</p>
              </div>
              <div className="rounded-2xl bg-white/65 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Query</p>
                <p className="mt-2 truncate font-['Sora'] text-lg font-bold text-slate-900">{search || 'All species'}</p>
              </div>
            </div>
          </div>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {loading && <div className="glass rounded-2xl p-5 text-slate-500">Loading species...</div>}
        {error && <div className="glass rounded-2xl border-red-200 p-5 text-red-500">{error}</div>}

        {!loading && !species.length && (
          <div className="glass rounded-2xl p-8 text-center text-slate-500">No species found for your query.</div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {species.map((item, index) => (
            <div key={item.id} className="stagger-in" style={{ animationDelay: `${index * 70}ms` }}>
              <SpeciesCard species={item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
