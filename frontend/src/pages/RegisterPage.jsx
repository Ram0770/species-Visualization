import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

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
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-10">
      <form onSubmit={handleSubmit} className="glass w-full rounded-3xl p-8">
        <h1 className="font-['Sora'] text-2xl font-bold text-ink">Create Account</h1>
        <p className="mt-1 text-sm text-slate-500">Register as a student or lecturer.</p>

        <div className="mt-6 space-y-4">
          <input className="w-full rounded-xl border bg-white/80 px-4 py-3" placeholder="Full Name" onChange={(e) => onChange('fullName', e.target.value)} required />
          <input className="w-full rounded-xl border bg-white/80 px-4 py-3" placeholder="Email ID" type="email" onChange={(e) => onChange('email', e.target.value)} required />
          <select className="w-full rounded-xl border bg-white/80 px-4 py-3" onChange={(e) => onChange('role', e.target.value)} value={form.role}>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
          </select>
          <input
            className="w-full rounded-xl border bg-white/80 px-4 py-3"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => onChange('password', e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-left text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
          <input
            className="w-full rounded-xl border bg-white/80 px-4 py-3"
            placeholder="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="text-left text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            {showConfirmPassword ? 'Hide password' : 'Show password'}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button type="submit" className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky to-mint px-5 py-3 font-semibold text-white">
          Register
        </button>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-sky-600">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
