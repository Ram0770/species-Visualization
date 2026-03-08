import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass sticky top-4 z-20 mx-auto mb-8 flex w-full max-w-7xl items-center justify-between rounded-2xl px-6 py-4">
      <Link to="/dashboard" className="font-['Sora'] text-xl font-bold text-ink">
        Bacterial Species Vision
      </Link>
      <nav className="flex items-center gap-3 text-sm font-semibold">
        <Link to="/dashboard" className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white/80">
          Home
        </Link>
        {user?.role === 'lecturer' && (
          <>
            <Link to="/species/add" className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white/80">
              Add Species
            </Link>
            <Link to="/species/edit" className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white/80">
              Edit Species
            </Link>
          </>
        )}
        <Link to="/statistics" className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white/80">
          Statistics
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-gradient-to-r from-sky to-mint px-4 py-2 text-white shadow-lg shadow-sky-200 transition hover:scale-[1.02]"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
