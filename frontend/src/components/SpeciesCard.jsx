import { Link } from 'react-router-dom';
import { getSpeciesImageUrl } from '../utils/speciesImageMap';

function SpeciesCard({ species }) {
  const protocolPreview = (species.protocol || '').split('\n').filter(Boolean).slice(0, 2).join(' ');
  const imageUrl = getSpeciesImageUrl(species);

  return (
    <Link
      to={`/species/${species.id}`}
      className="group glass panel-hover page-enter overflow-hidden rounded-[30px]"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={species.scientific_name}
          className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.26em] text-white/70">Species Record</p>
            <h3 className="font-['Sora'] text-xl font-bold text-white">{species.scientific_name}</h3>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-right backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Year</p>
            <p className="font-['Sora'] text-lg font-bold text-white">{species.year_found}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p
          className="text-sm leading-7 text-slate-600"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {species.description}
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-white/65 p-3 text-slate-500">
            <p className="mb-1 uppercase tracking-[0.18em] text-slate-400">Scientist</p>
            <p className="line-clamp-2 text-sm font-semibold text-slate-800">{species.scientist_name}</p>
          </div>
          <div className="rounded-2xl bg-white/65 p-3 text-slate-500">
            <p className="mb-1 uppercase tracking-[0.18em] text-slate-400">Habitat</p>
            <p className="line-clamp-2 text-sm font-semibold text-slate-800">{species.habitat}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-slate-950/5 to-sky/10 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Species Protocol</p>
          <p className="text-xs leading-6 text-slate-700">{protocolPreview || 'Protocol not available.'}</p>
        </div>
      </div>
    </Link>
  );
}

export default SpeciesCard;
