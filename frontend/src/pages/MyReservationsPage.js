import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getMyReservations } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openMap, setOpenMap] = useState({});
  const [sortField, setSortField] = useState('checkIn');
  const [sortDir, setSortDir] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await getMyReservations();
        setReservations(res.data || []);
      } catch (err) {
        console.error('Failed to load reservations', err);
        // if unauthorized, redirect to login
        if (err?.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  const sortedReservations = useMemo(() => {
    const arr = Array.isArray(reservations) ? [...reservations] : [];
    const field = sortField;
    arr.sort((a, b) => {
      let va = a?.[field];
      let vb = b?.[field];

      if (field === 'checkIn' || field === 'checkOut') {
        va = new Date(va).getTime() || 0;
        vb = new Date(vb).getTime() || 0;
      } else if (field === 'roomNumber' || field === 'guests' || field === 'reservationId') {
        va = Number(va) || 0;
        vb = Number(vb) || 0;
      } else {
        va = (va ?? '').toString().toLowerCase();
        vb = (vb ?? '').toString().toLowerCase();
      }

      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [reservations, sortField, sortDir]);

  return (
    <div>
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-white/70 to-white/90 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="uppercase text-blue-700 tracking-widest font-bold text-sm">Reservations</div>
            <h1 className="text-3xl font-extrabold mt-2">My Reservations</h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your reservations...</p>
              </div>
            ) : reservations.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 mt-6 text-center">
                <p className="text-slate-600">You have no reservations yet.</p>
                <button
                  onClick={() => navigate('/availability')}
                  className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold shadow"
                >
                  Book a Stay
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mt-6 gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600">Sort by:</label>
                    <select
                      value={sortField}
                      onChange={e => setSortField(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="checkIn">Check In</option>
                      <option value="checkOut">Check Out</option>
                      <option value="roomNumber">Room Number</option>
                      <option value="guests">Guests</option>
                      <option value="reservationId">Reservation ID</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
                      className="px-3 py-2 bg-gray-100 rounded-md text-sm"
                    >
                      {sortDir === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-2">
                  {sortedReservations.map(r => (
                    <div key={r.reservationId} className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm text-slate-500 font-semibold">Reservation #{r.reservationId}</div>
                          <div className="text-xl font-extrabold text-blue-700 mt-1">{r.bedType || 'Room'} {r.roomNumber ? `— Room ${r.roomNumber}` : ''}</div>
                          <div className="text-slate-500 mt-2">{r.checkIn} – {r.checkOut}</div>
                          <div className="text-slate-500">Guests: {r.guests}</div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={() => setOpenMap(prev => ({ ...prev, [r.reservationId]: !prev[r.reservationId] }))}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold"
                          >
                            {openMap[r.reservationId] ? 'Hide' : 'Details'}
                          </button>
                        </div>
                      </div>

                      {openMap[r.reservationId] && (
                        <div className="mt-4 border-t pt-4 text-sm text-slate-600">
                          <div><strong>Room ID:</strong> {r.roomId ?? '—'}</div>
                          <div><strong>Bed Type:</strong> {r.bedType ?? '—'}</div>
                          <div><strong>Room Number:</strong> {r.roomNumber ?? '—'}</div>
                          <div><strong>Guests:</strong> {r.guests}</div>
                          <div><strong>Check In:</strong> {r.checkIn}</div>
                          <div><strong>Check Out:</strong> {r.checkOut}</div>
                          <div>
                            <strong>Nights:</strong>{' '}
                            {(() => {
                              try {
                                const inD = new Date(r.checkIn);
                                const outD = new Date(r.checkOut);
                                const diff = Math.round((outD - inD) / (1000 * 60 * 60 * 24));
                                return diff > 0 ? diff : 0;
                              } catch (e) {
                                return '—';
                              }
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
