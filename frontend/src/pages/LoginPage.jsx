import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { googleLogin, loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.state?.from?.pathname || '/dashboard';

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
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-10">
      <form onSubmit={handleEmailLogin} className="glass w-full rounded-3xl p-8">
        <h1 className="font-['Sora'] text-2xl font-bold text-ink">Welcome Back</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to access the species dashboard.</p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border bg-white/80 px-4 py-3"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full rounded-xl border bg-white/80 px-4 py-3"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-left text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
          <select
            className="w-full rounded-xl border bg-white/80 px-4 py-3"
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
          >
            <option value="student">Student (for new Google users)</option>
            <option value="lecturer">Lecturer (for new Google users)</option>
          </select>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button type="submit" className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky to-mint px-5 py-3 font-semibold text-white">
          Login
        </button>

        {googleClientId && (
          <div className="mt-5 flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in was cancelled')} />
          </div>
        )}

        <p className="mt-4 text-sm text-slate-600">
          New here? <Link to="/register" className="font-semibold text-sky-600">Register</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
