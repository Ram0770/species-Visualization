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
      {error && <div className="glass rounded-2xl border-red-200 p-5 text-red-500">{error}</div>}

      {species && (
        <article className="glass page-enter grid gap-8 rounded-[34px] p-7 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[28px]">
            <img src={getSpeciesImageUrl(species)} alt={species.scientific_name} className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/70">Species Snapshot</p>
              <p className="font-['Sora'] text-2xl font-bold text-white">{species.scientific_name}</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500">Detailed Species Profile</p>
              <h1 className="font-['Sora'] text-3xl font-bold text-ink md:text-4xl">{species.scientific_name}</h1>
              <p className="mt-4 text-sm leading-8 text-slate-600 md:text-base">{species.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Year Discovered</p>
                <p className="mt-2 font-['Sora'] text-2xl font-bold text-slate-900">{species.year_found}</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Scientist</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{species.scientist_name}</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Habitat</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{species.habitat}</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Classification</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{species.classification}</p>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/70 p-5">
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-700">Species Protocol</p>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">{species.protocol}</pre>
            </div>

            <Link to="/dashboard" className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Back to Dashboard
            </Link>
          </div>
        </article>
      )}
    </main>
  );
}

export default SpeciesDetail;
