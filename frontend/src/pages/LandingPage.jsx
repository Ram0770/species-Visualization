import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="glass page-enter grid items-center gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="mb-3 inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600">
            Educational Research Platform
          </p>
          <h1 className="font-['Sora'] text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Bacterial Species Vision
          </h1>
          <p className="mt-4 text-slate-600">
            Web-Based Species and Space Protocol Visualization System with image-centric bacterial species discovery.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/login" className="rounded-xl bg-gradient-to-r from-sky to-mint px-5 py-3 font-semibold text-white">
              Login
            </Link>
            <Link to="/register" className="rounded-xl border border-slate-200 bg-white/80 px-5 py-3 font-semibold text-slate-700">
              Register
            </Link>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1400&q=80"
          alt="Scientific visualization"
          className="h-full max-h-[360px] w-full rounded-2xl object-cover"
        />
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          'Image-based species visualization',
          'Scientific discovery information',
          'Educational research platform for students and lecturers',
        ].map((item) => (
          <article key={item} className="glass rounded-2xl p-5 text-sm text-slate-600">
            <h3 className="mb-2 font-['Sora'] text-base font-bold text-slate-800">Feature</h3>
            <p>{item}</p>
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
