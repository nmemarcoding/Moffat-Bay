import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation, room } = location.state || {};

  useEffect(() => {
    if (!reservation) {
      // No reservation data: go back to availability
      navigate('/availability');
    }
  }, [reservation, navigate]);

  if (!reservation) return null;

  const nights = (() => {
    const inD = new Date(reservation.checkIn);
    const outD = new Date(reservation.checkOut);
    if (isNaN(inD) || isNaN(outD)) return 1;
    const diff = Math.round((outD - inD) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  })();

  const pricePerNight = Number(room?.pricePerNight) || 0;
  const total = pricePerNight ? (pricePerNight * nights).toFixed(2) : '—';

  return (
    <>
      <Navbar />
      <main className="pt-[84px]">
        <section className="bg-gradient-to-b from-white/60 to-white/80 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8">
              <h1 className="text-3xl font-extrabold text-blue-700">Reservation Confirmed</h1>
              <p className="text-slate-600 mt-2">Thank you — your reservation has been created.</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-700">Reservation Details</h3>
                  <div className="mt-2 text-slate-600">
                    <div><strong>Confirmation ID:</strong> {reservation.reservationId}</div>
                    <div><strong>Room Number:</strong> {room?.roomNumber ?? '—'}</div>
                    <div><strong>Room Type:</strong> {room?.bedType ?? '—'}</div>
                    <div><strong>Check In:</strong> {reservation.checkIn}</div>
                    <div><strong>Check Out:</strong> {reservation.checkOut}</div>
                    <div><strong>Guests:</strong> {reservation.guests}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-700">Payment & Pricing</h3>
                  <div className="mt-2 text-slate-600">
                    <div><strong>Nights:</strong> {nights}</div>
                    <div><strong>Price per night:</strong> {room ? (room.pricePerNight ? `$${room.pricePerNight.toFixed(2)}` : '—') : '—'}</div>
                    <div className="text-2xl font-extrabold mt-3">Total: ${total}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/availability')}
                  className="ml-3 px-5 py-3 rounded-lg bg-white border border-gray-200 text-slate-700 font-bold"
                >
                  Book Another
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
