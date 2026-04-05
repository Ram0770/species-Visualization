import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import ThemeToggle from '../components/ThemeToggle';
import { registerUser } from '../services/authService';

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

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    role: 'student',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'lecturer', label: 'Lecturer' },
  ];

  const onChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!form.fullName || !form.email || !form.role || !form.password || !form.confirmPassword) {
      return 'All fields are required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Please enter a valid email';
    }
    if (form.password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    try {
      setError('');
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
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
        <h1 className="text-4xl font-bold leading-tight text-slate-950">Register</h1>
        <p className="mt-4 text-sm leading-8 text-slate-600">
          Create a student or lecturer account to access the species platform.
        </p>

        <div className="mt-8 space-y-4">
          <div className="metric-tile rounded-[24px] p-4">
            <p className="text-lg font-semibold text-slate-900">Student account</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">For browsing species information, searching records, and opening detailed species pages.</p>
          </div>
          <div className="metric-tile rounded-[24px] p-4">
            <p className="text-lg font-semibold text-slate-900">Lecturer account</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">For adding species, editing records, uploading images, and managing the collection.</p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="glass page-enter rounded-[34px] p-8 md:p-10">
        <h2 className="text-3xl font-bold text-slate-950">Create your account</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">Fill in the required details below.</p>

        <div className="mt-8 grid gap-4">
          <div className="field-shell rounded-[24px] px-4 py-3">
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Full name</label>
            <input className="field-input" placeholder="Enter your full name" onChange={(e) => onChange('fullName', e.target.value)} required />
          </div>

          <div className="field-shell rounded-[24px] px-4 py-3">
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Email</label>
            <input className="field-input" placeholder="Enter your email" type="email" onChange={(e) => onChange('email', e.target.value)} required />
          </div>

          <CustomSelect label="Role" value={form.role} options={roleOptions} onChange={(nextRole) => onChange('role', nextRole)} />

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
              className="field-input"
              placeholder="Create a password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => onChange('password', e.target.value)}
              required
            />
          </div>

          <div className="field-shell rounded-[24px] px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs uppercase tracking-[0.22em] text-slate-500">Confirm password</label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-800"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            <input
              className="field-input"
              placeholder="Re-enter your password"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-[24px] bg-slate-950 px-5 py-4 text-base font-semibold text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] transition hover:bg-slate-900"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-slate-600">
          <Link to="/" className="mr-4 font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
            Landing page
          </Link>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
