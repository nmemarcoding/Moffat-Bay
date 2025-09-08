import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createReservation } from '../services/apiService';

export default function BookingDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room, checkIn, checkOut, guests } = location.state || {};

  const handleConfirm = async () => {
    if (!room || !checkIn || !checkOut || !guests) {
      alert('Missing booking details. Please return to the availability page.');
      return;
    }

    try {
      const reservationPayload = {
        roomId: room.roomId,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: Number(guests),
      };

  const res = await createReservation(reservationPayload);
  const saved = res.data;
  alert('Reservation successful!');
  navigate('/confirmation', { state: { reservation: saved, room } });
    } catch (error) {
      console.error('Reservation error:', error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          alert('Invalid reservation data: ' + (data?.message || 'Check your inputs.'));
        } else if (status === 401) {
          alert('You must be logged in to make a reservation.');
        } else {
          alert('Server error: ' + (data?.message || 'Please try again later.'));
        }
      } else {
        alert('Network error. Please check your connection.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/availability');
  };

  return (
    <>
      <Navbar />
      <main className="pt-[84px]">
        <section className="bg-gradient-to-b from-white/60 to-white/80 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-blue-700 uppercase tracking-wide text-sm font-bold">Reservations</div>
            <h1 className="text-3xl font-extrabold mt-2">Details of Your Stay</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                <div className="h-80 bg-gradient-to-br from-indigo-200 to-sky-200 flex items-center justify-center font-bold text-xl text-slate-700">
                  ROOM STYLE IMAGE
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-extrabold text-blue-700 mb-1">{room?.bedType} Room</h3>
                <p className="text-slate-500 font-bold">{checkIn} – {checkOut}</p>
                <p className="text-slate-500">{guests} Guest{guests > 1 ? 's' : ''}</p>
                <p className="text-2xl font-extrabold mt-2">${(room?.pricePerNight * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))).toFixed(2)}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-lg"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-rose-500 to-red-600 hover:shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
