import { Link } from 'react-router-dom';

function SpeciesCard({ species }) {
  const protocolPreview = (species.protocol || '').split('\n').filter(Boolean).slice(0, 2).join(' ');

  return (
    <Link
      to={`/species/${species.id}`}
      className="group glass page-enter overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1"
    >
      <img
        src={species.image_url || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80'}
        alt={species.scientific_name}
        className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="space-y-3 p-5">
        <h3 className="font-['Sora'] text-lg font-bold text-ink">{species.scientific_name}</h3>
        <p
          className="text-sm text-slate-600"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {species.description}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
          <span>Year: {species.year_found}</span>
          <span className="text-right">Scientist: {species.scientist_name}</span>
        </div>
        <div className="rounded-xl bg-white/60 p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Species Protocol</p>
          <p className="text-xs text-slate-700">{protocolPreview || 'Protocol not available.'}</p>
        </div>
      </div>
    </Link>
  );
}

export default SpeciesCard;
