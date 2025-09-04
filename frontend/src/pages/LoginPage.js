import React, { useState } from 'react';
import { login } from '../services/apiService';
import { useNavigate, Link } from 'react-router-dom';

const initialState = { email: '', password: '' };

const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Valid email required';
    if (form.password.length < 8) e.password = 'Password min 8 chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setApiError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-36 pb-10 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Sign In</h1>
          <p className="text-slate-600 text-sm md:text-base">Access your Moffat Bay Marina & Lodge account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">Email *</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 text-sm md:text-base bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.email ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
            {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-800 mb-2">Password *</label>
            <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 text-sm md:text-base bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.password ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
            {errors.password && <p className="mt-2 text-xs font-medium text-red-600">{errors.password}</p>}
          </div>
          {apiError && <p className="text-sm font-medium text-red-600 -mt-2">{apiError}</p>}
          <button type="submit" disabled={submitting} className="w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-lg py-3 shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-slate-600">Need an account? <Link to="/register" className="font-semibold text-indigo-600 hover:underline">Create one</Link></div>
      </div>
    </div>
  );
};

export default LoginPage;
