import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass page-enter sticky top-4 z-20 mx-auto mb-8 flex w-full max-w-7xl flex-col gap-4 rounded-[30px] px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <Link to="/dashboard" className="flex items-center gap-4">
        <div className="floating-orb flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky via-cyan-300 to-mint text-sm font-extrabold text-white shadow-lg shadow-sky-200">
          SV
        </div>
        <div>
          <p className="font-['Sora'] text-xl font-bold text-ink">Bacterial Species Visualization</p>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Research Dashboard</p>
        </div>
      </Link>
      <nav className="flex w-full flex-wrap items-center gap-2 text-sm font-semibold lg:w-auto lg:justify-end">
        <Link to="/dashboard" className="rounded-2xl px-4 py-2.5 text-slate-700 transition hover:bg-white/80">
          Home
        </Link>
        {user?.role === 'lecturer' && (
          <>
            <Link to="/species/add" className="rounded-2xl px-4 py-2.5 text-slate-700 transition hover:bg-white/80">
              Add Species
            </Link>
            <Link to="/species/edit" className="rounded-2xl px-4 py-2.5 text-slate-700 transition hover:bg-white/80">
              Edit Species
            </Link>
          </>
        )}
        <Link to="/statistics" className="rounded-2xl px-4 py-2.5 text-slate-700 transition hover:bg-white/80">
          Statistics
        </Link>
        <ThemeToggle />
        <div className="mx-2 hidden h-8 w-px bg-slate-200 lg:block" />
        <div className="rounded-2xl bg-slate-900/5 px-4 py-2 text-left">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{user?.role}</p>
          <p className="max-w-32 truncate text-sm text-slate-700">{user?.fullName}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-2xl bg-gradient-to-r from-sky to-mint px-5 py-2.5 text-white shadow-lg shadow-sky-200 transition hover:scale-[1.02]"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
