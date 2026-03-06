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
        <SearchBar value={search} onChange={setSearch} />

        {loading && <p className="text-slate-500">Loading species...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !species.length && (
          <div className="glass rounded-2xl p-8 text-center text-slate-500">No species found for your query.</div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {species.map((item) => (
            <SpeciesCard key={item.id} species={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
