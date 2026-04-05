import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import ThemeToggle from '../components/ThemeToggle';
import { googleLogin, loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l18 18" />
        <path d="M10.6 10.7a3 3 0 0 0 4 4" />
        <path d="M9.4 5.5A10.7 10.7 0 0 1 12 5c5 0 8.7 3.4 10 7-0.4 1-1 2-1.8 2.9" />
        <path d="M6.2 6.3C4.7 7.5 3.6 9.1 3 12c1.3 3.6 5 7 10 7 1.7 0 3.2-.4 4.5-1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LoginPage() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.state?.from?.pathname || '/dashboard';
  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'lecturer', label: 'Lecturer' },
  ];

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const { data } = await loginUser(form);
      login(data);
      navigate(to, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError('');
      const { data } = await googleLogin({ credential: credentialResponse.credential, role: form.role });
      login(data);
      navigate(to, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-6 py-10 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="glass page-enter rounded-[34px] p-8 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-[20px] border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/90"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
        <p className="section-kicker mb-3">SpeciesVision</p>
        <h1 className="text-4xl font-bold leading-tight text-slate-950">Login</h1>
        <p className="mt-4 text-sm leading-8 text-slate-600">
          Sign in with your registered email, password, and role to continue into the species dashboard.
        </p>

        <div className="mt-8 space-y-4">
          <div className="metric-tile rounded-[24px] p-4">
            <p className="text-lg font-semibold text-slate-900">Student</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">Can browse species records, search the collection, and open detailed pages.</p>
          </div>
          <div className="metric-tile rounded-[24px] p-4">
            <p className="text-lg font-semibold text-slate-900">Lecturer</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">Can manage species data, update content, upload images, and access editing tools.</p>
          </div>
        </div>
      </section>

      <form onSubmit={handleEmailLogin} className="glass page-enter rounded-[34px] p-8 md:p-10">
        <h2 className="text-3xl font-bold text-slate-950">Access your account</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">Enter your credentials below.</p>

        <div className="mt-8 space-y-4">
          <div className="field-shell rounded-[24px] px-4 py-3">
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="field-input"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="field-shell rounded-[24px] px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs uppercase tracking-[0.22em] text-slate-500">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-800"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="field-input"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>

          <CustomSelect
            label="Role"
            value={form.role}
            options={roleOptions}
            onChange={(nextRole) => setForm((prev) => ({ ...prev, role: nextRole }))}
          />
        </div>

        {error && <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-[24px] bg-slate-950 px-5 py-4 text-base font-semibold text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] transition hover:bg-slate-900"
        >
          Login
        </button>

        {googleClientId && (
          <div className="mt-5 flex justify-center rounded-[24px] border border-slate-200 bg-white/65 p-4">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in was cancelled')} />
          </div>
        )}

        <p className="mt-6 text-sm text-slate-600">
          <Link to="/" className="mr-4 font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
            Landing page
          </Link>
          New here?{' '}
          <Link to="/register" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
