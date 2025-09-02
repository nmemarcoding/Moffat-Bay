import React, { useState } from 'react';
import { register } from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';

const initial = { firstName: '', lastName: '', email: '', telephone: '', password: '', confirmPassword: '' };

const strength = (pwd) => {
  if (!pwd) return { label: '', cls: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { label: 'Weak password', cls: 'weak' };
  if (score === 3 || score === 4) return { label: 'Medium strength', cls: 'medium' };
  return { label: 'Strong password', cls: 'strong' };
};

const RegisterPage = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (form.firstName.trim().length < 2) e.firstName = 'First name min 2 chars';
    if (form.lastName.trim().length < 2) e.lastName = 'Last name min 2 chars';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Valid email required';
    if (!/[0-9]/.test(form.telephone.replace(/\D/g,'')) || form.telephone.replace(/\D/g,'').length < 10) e.telephone = 'Valid telephone required';
    if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password)) e.password = 'Password requirements not met';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords must match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        telephone: form.telephone,
        isAdmin: false
      });
      navigate('/login');
    } catch (err) {
      const res = err?.response;
      let msg = res?.data;
      if (msg == null) msg = 'Registration failed';
      if (typeof msg !== 'string') msg = msg.message || msg.error || 'Registration failed';
      if (/^email already exists$/i.test(msg)) {
        setErrors(prev => ({ ...prev, email: msg }));
      } else if (/email/i.test(msg) && /(exist|taken|registered)/i.test(msg)) {
        setErrors(prev => ({ ...prev, email: msg }));
      } else {
        setApiError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const pwdStrength = strength(form.password);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-36 pb-10 bg-gradient-to-br from-slate-100 to-slate-200" id="registration">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-3">Create Your Account</h1>
          <p className="text-slate-600 text-sm md:text-base">Join Moffat Bay Marina & Lodge and start your adventure today</p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-slate-800 mb-2">First Name *</label>
              <input id="firstName" name="firstName" type="text" minLength={2} maxLength={50} required value={form.firstName} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 bg-slate-50 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.firstName ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
              {errors.firstName && <p className="mt-2 text-xs font-medium text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-slate-800 mb-2">Last Name *</label>
              <input id="lastName" name="lastName" type="text" minLength={2} maxLength={50} required value={form.lastName} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 bg-slate-50 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.lastName ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
              {errors.lastName && <p className="mt-2 text-xs font-medium text-red-600">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">Email Address (Username) *</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 bg-slate-50 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.email ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
            <p className="mt-2 text-xs text-slate-500">This will be your username for logging in</p>
            {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-semibold text-slate-800 mb-2">Telephone *</label>
            <input id="telephone" name="telephone" type="tel" required value={form.telephone} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 bg-slate-50 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.telephone ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
            <p className="mt-2 text-xs text-slate-500">Format: (555) 123-4567 or +1-555-123-4567</p>
            {errors.telephone && <p className="mt-2 text-xs font-medium text-red-600">{errors.telephone}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-800 mb-2">Password *</label>
            <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 bg-slate-50 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.password ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
            <p className="mt-2 text-xs text-slate-500">Minimum 8 characters with at least one uppercase, one lowercase, and one number</p>
            {pwdStrength.label && (
              <div className={`mt-3 text-xs font-medium rounded-lg px-3 py-2 border flex items-center justify-between ${pwdStrength.cls === 'weak' ? 'bg-red-50 text-red-600 border-red-200' : pwdStrength.cls === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>{pwdStrength.label}</div>
            )}
            {errors.password && <p className="mt-2 text-xs font-medium text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-800 mb-2">Confirm Password *</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} className={`w-full rounded-xl border-2 px-4 py-3 bg-slate-50 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-sky-200 transition ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200 focus:border-sky-400'}`} />
            {errors.confirmPassword && <p className="mt-2 text-xs font-medium text-red-600">{errors.confirmPassword}</p>}
          </div>
          {apiError && <p className="text-sm font-medium text-red-600">{apiError}</p>}
          <button type="submit" disabled={submitting} className="w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-lg py-3 shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed">{submitting ? 'Creating...' : 'Create Account'}</button>
        </form>
        <div className="text-center mt-8 text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Sign in here</Link></div>
      </div>
    </div>
  );
};

export default RegisterPage;
