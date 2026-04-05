import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="landing-shell page-enter relative overflow-hidden rounded-[36px] p-8 backdrop-blur-2xl md:p-12">
        <div className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rounded-full bg-sky/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-16 h-40 w-40 rounded-full bg-mint/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-10 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <p className="landing-pill mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              Research-Grade Discovery Platform
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-transparent md:text-6xl" style={{ backgroundImage: 'radial-gradient(circle at top, #0f172a 0%, #0ea5e9 38%, #14b8a6 68%, #f59e0b 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Bacterial Species Visualization
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              SpeciesVision combines image-first discovery, structured scientific metadata, and curated protocols in a polished interface designed for both classroom exploration and lecturer-led management.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="rounded-2xl bg-gradient-to-r from-sky to-mint px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition hover:scale-[1.02]">
                Login
              </Link>
              <Link to="/register" className="landing-secondary-action rounded-2xl px-6 py-3.5 font-semibold transition">
                Register
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['20+', 'Seeded species records'],
                ['2 roles', 'Student and lecturer flows'],
                ['Live data', 'Search, edit, and visualize'],
              ].map(([value, label], index) => (
                <div key={label} className="landing-stat stagger-in rounded-2xl p-4" style={{ animationDelay: `${index * 120}ms` }}>
                  <p className="font-['Sora'] text-2xl font-bold text-slate-900">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="landing-visual panel-hover relative rounded-[32px] p-4">
              <div className="absolute left-6 top-6 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1400&q=80"
                alt="Scientific visualization"
                className="h-full max-h-[420px] w-full rounded-[24px] object-cover opacity-90"
              />
              <div className="landing-overlay absolute inset-x-6 bottom-6 rounded-[24px] p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/70">
                  <span>Microscopy Feed</span>
                  <span className="shimmer-line block h-px w-20 bg-white/30" />
                </div>
                <p className="font-['Sora'] text-xl font-semibold text-white">Species cards, taxonomy, and protocol intelligence in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            title: 'Image-based species visualization',
            text: 'Every record is built around rich visual identity so students can connect species names to memorable imagery immediately.',
          },
          {
            title: 'Scientific discovery information',
            text: 'Discovery year, scientist attribution, habitat, and classification stay readable and structured for academic use.',
          },
          {
            title: 'Educational research platform',
            text: 'Lecturers manage content while students browse, search, compare, and study through a clean research workflow.',
          },
        ].map((item, index) => (
          <article key={item.title} className="glass panel-hover stagger-in rounded-[28px] p-6 text-sm text-slate-600" style={{ animationDelay: `${160 + index * 110}ms` }}>
            <h3 className="mb-2 font-['Sora'] text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="leading-7">{item.text}</p>
          </article>
        ))}
      </section>

      <footer className="mt-12 border-t border-white/60 py-6 text-center text-sm text-slate-500">
        SpeciesVision | Built for scientific exploration and bacterial species learning.
      </footer>
    </main>
  );
}

export default LandingPage;
