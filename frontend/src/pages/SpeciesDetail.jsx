import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSpeciesById } from '../services/speciesService';
import { getSpeciesImageUrl } from '../utils/speciesImageMap';

function SpeciesDetail() {
  const { id } = useParams();
  const [species, setSpecies] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const { data } = await getSpeciesById(id);
        setSpecies(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load species details');
      }
    };

    loadSpecies();
  }, [id]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      <Navbar />
      {error && <p className="text-red-500">{error}</p>}

      {species && (
        <article className="glass page-enter grid gap-8 rounded-3xl p-7 md:grid-cols-2">
          <img src={getSpeciesImageUrl(species)} alt={species.scientific_name} className="h-80 w-full rounded-2xl object-cover" />
          <div className="space-y-3">
            <h1 className="font-['Sora'] text-3xl font-bold text-ink">{species.scientific_name}</h1>
            <p className="text-slate-600">{species.description}</p>
            <p><strong>Year Discovered:</strong> {species.year_found}</p>
            <p><strong>Scientist:</strong> {species.scientist_name}</p>
            <p><strong>Habitat:</strong> {species.habitat}</p>
            <p><strong>Classification:</strong> {species.classification}</p>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-700">Species Protocol</p>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">{species.protocol}</pre>
            </div>
            <Link to="/dashboard" className="inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Back to Dashboard
            </Link>
          </div>
        </article>
      )}
    </main>
  );
}

export default SpeciesDetail;
