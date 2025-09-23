import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-slate-50 border-t border-slate-200 mt-24">
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Moffat Bay Marina & Lodge</h3>
        <p className="text-slate-600 mb-4 text-sm">Join our mailing list to receive updates and special discounts.</p>
        <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2 mb-3 max-w-md">
          <input type="email" required placeholder="Enter your email" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
          <button type="submit" className="rounded-lg bg-gradient-to-r from-blue-700 to-sky-500 px-4 py-2 text-white font-bold text-sm shadow hover:opacity-90">Subscribe</button>
        </form>
        <p className="text-xs text-slate-500">© 2025 Moffat Bay Lodge</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Learn More</h4>
        <ul className="space-y-2 text-sm">
          <li><Link className="text-blue-700 hover:underline" to="/#about">About Us</Link></li>
          <li><Link className="text-blue-700 hover:underline" to="/availability">Accommodations</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Useful</h4>
        <ul className="space-y-2 text-sm">
          <li><Link className="text-blue-700 hover:underline" to="/">Home</Link></li>
          <li><Link className="text-blue-700 hover:underline" to="/availability">Reservations</Link></li>
          <li><Link className="text-blue-700 hover:underline" to="/login">Login</Link></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
