import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/apiService';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/attractions', label: 'Attractions' },
  { to: '/availability', label: 'Availability' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

const ADMIN_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/admin/search', label: 'Admin Search' },
];

const USER_INFO_KEY = 'userInfo';

const readUser = () => {
  const raw = localStorage.getItem(USER_INFO_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user once and subscribe to auth change events + cross-tab storage events
  useEffect(() => {
    const refreshUser = () => setUser(readUser());
    refreshUser();

    window.addEventListener('auth-user-updated', refreshUser);
    window.addEventListener('storage', refreshUser);

    return () => {
      window.removeEventListener('auth-user-updated', refreshUser);
      window.removeEventListener('storage', refreshUser);
    };
  }, []);

  // Close mobile menu & refresh user on route change (covers interceptor timing)
  useEffect(() => {
    setOpen(false);
    setUser(readUser());
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const toggleMenu = useCallback(() => setOpen(o => !o), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  const displayName = useMemo(
    () => (user?.firstName ? user.firstName : user?.email),
    [user]
  );

  return (
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/70 border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-extrabold text-xl tracking-tight bg-gradient-to-br from-sky-500 to-cyan-500 bg-clip-text text-transparent"
          onClick={closeMenu}
        >
          Moffat Bay Marina &amp; Lodge
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex list-none gap-5 text-sm font-semibold">
            {(user?.isAdmin ? ADMIN_LINKS : NAV_LINKS).map(l => (
              <li key={l.to}>
                {l.to.startsWith('/#') ? (
                  <a
                    href={l.to}
                    onClick={e => {
                      e.preventDefault();
                      closeMenu();
                      window.location.assign(l.to);
                    }}
                    className="text-slate-800/80 hover:text-indigo-600 transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    className="text-slate-800/80 hover:text-indigo-600 transition-colors"
                    to={l.to}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-slate-700">Hi, {displayName}</span>
                {user?.isAdmin ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition ml-4"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/my-reservations"
                      className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
                    >
                      My Reservations
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition ml-4"
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-block bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-bold text-sm rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-300 hover:border-slate-400 bg-white/60 backdrop-blur-sm transition"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-slate-800 transition ${
                  open ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-slate-800 transition ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-slate-800 transition ${
                  open ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'px-6 pb-6 max-h-[650px]' : 'px-0 pb-0 max-h-0'
        }`}
      >
        <ul
          className={`flex flex-col gap-4 text-sm font-semibold bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl transition-opacity duration-200 ${
            open ? 'p-6 opacity-100' : 'p-0 opacity-0'
          }`}
        >
          {(user?.isAdmin ? ADMIN_LINKS : NAV_LINKS).map(l => (
            <li key={l.to}>
              {l.to.startsWith('/#') ? (
                <a
                  onClick={() => {
                    closeMenu();
                    window.location.assign(l.to);
                  }}
                  className="block text-slate-800/80 hover:text-indigo-600"
                  href={l.to}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  onClick={closeMenu}
                  className="block text-slate-800/80 hover:text-indigo-600"
                  to={l.to}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}

          {user ? (
            <li className="pt-2 border-t border-slate-200">
              <div className="flex flex-col gap-3">
                <Link
                  onClick={() => {
                    closeMenu();
                  }}
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600"
                  to="/my-reservations"
                >
                  My Reservations
                </Link>
                <span className="text-slate-700 text-sm">
                  Signed in as{' '}
                  <span className="font-semibold">{displayName}</span>
                </span>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="w-full rounded-full bg-slate-800 text-white text-xs font-semibold py-2.5 hover:bg-slate-700 transition"
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li className="flex flex-col gap-3 pt-2 border-t border-slate-200">
              <Link
                onClick={closeMenu}
                className="w-full text-center rounded-full bg-slate-800 text-white text-sm font-semibold py-2.5 hover:bg-slate-700 transition"
                to="/login"
              >
                Login
              </Link>
              <Link
                onClick={closeMenu}
                className="w-full text-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-bold py-2.5 shadow hover:shadow-lg"
                to="/register"
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
