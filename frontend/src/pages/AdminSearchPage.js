import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/apiService';

export default function AdminSearchPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const doSearch = async (e) => {
    e?.preventDefault();
    setError(null);
    setReservations([]);
    setHasSearched(true);

    if (!email && !phone) {
      setError('Provide email or phone to search');
      return;
    }

    setLoading(true);
    try {
      const params = {};
      if (phone) params.phone = phone;
      else params.email = email;

      const res = await api.get('/reservations/admin/search', { params });
      setReservations(res.data || []);
    } catch (err) {
      console.error('Admin search failed', err);
      // Friendly error text: prefer server message, then error.error, then stringify
      const resp = err?.response?.data;
      let msg = 'Search failed';
      if (typeof resp === 'string') msg = resp;
      else if (resp && typeof resp === 'object') {
        // Common Spring Boot error structure: { timestamp, status, error, message, path }
        msg = resp.message || resp.error || JSON.stringify(resp);
      } else if (err?.message) msg = err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-white/70 to-white/90 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="uppercase text-blue-700 tracking-widest font-bold text-sm">Admin</div>
            <h1 className="text-3xl font-extrabold mt-2">Search Reservations</h1>

            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mt-6">
              <form onSubmit={doSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="col-span-2">
                  <label className="text-sm text-slate-600">Email</label>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-600">Phone</label>
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="000-000-0000"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="col-span-3 flex items-center gap-3 mt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold shadow"
                    disabled={loading}
                  >
                    {loading ? 'Searching…' : 'Search'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEmail(''); setPhone(''); setReservations([]); setError(null); }}
                    className="px-4 py-2 rounded-md bg-gray-100"
                  >
                    Reset
                  </button>
                </div>
              </form>

              {error && <div className="mt-4 text-red-600">{String(error)}</div>}

              <div className="mt-6">
                {reservations.length === 0 && !loading ? (
                  <div className="text-slate-600">
                    {error ? null : (
                      <>
                        {hasSearched ? (
                          <>No results{email ? ` for email "${email}"` : ''}{phone ? ` for phone "${phone}"` : ''}.</>
                        ) : (
                          null
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {reservations.map(r => (
                      <div key={r.reservationId} className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-slate-500">Reservation #{r.reservationId}</div>
                            <div className="text-lg font-bold text-blue-700">{r.bedType || 'Room'} — Room {r.roomNumber}</div>
                            <div className="text-slate-500">{r.checkIn} – {r.checkOut}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-600">Guests: {r.guests}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
