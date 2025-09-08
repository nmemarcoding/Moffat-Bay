import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableRooms } from '../services/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AvailabilityPage() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getAvailableRooms(checkIn, checkOut, guests);
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-white/70 to-white/90 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="uppercase text-blue-700 tracking-widest font-bold text-sm">Reservations</div>
            <h1 className="text-3xl font-extrabold mt-2">Book Your Stay With Us</h1>

            <form className="grid gap-4 bg-white border border-gray-200 rounded-xl p-6 shadow-md mt-6 md:grid-cols-2 lg:grid-cols-5 lg:items-end" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-500">Check In</span>
                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-slate-50" type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-500">Check Out</span>
                <input className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-slate-50" type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-500">Guests</span>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-slate-50" value={guests} onChange={e => setGuests(parseInt(e.target.value))}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </label>
              <button className="col-span-full lg:col-auto px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold shadow-md hover:shadow-lg" type="submit">Search</button>
            </form>

            <p className="text-slate-500 mt-4">Choose from our most-loved room types.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {rooms.map(room => (
                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition" key={room.roomId}>
                  <div className="h-[180px] bg-gradient-to-r from-indigo-200 to-sky-200 flex items-center justify-center font-bold">IMAGE</div>
                  <div className="p-5">
                    <div className="text-slate-500 text-sm font-bold tracking-wide">Up to {room.maxGuests} Guest{room.maxGuests > 1 ? 's' : ''}</div>
                    <div className="text-blue-700 font-extrabold text-lg mt-1">{room.bedType} Room</div>
                    <div className="font-bold mt-1">${room.pricePerNight.toFixed(2)} / night</div>
                    <button
                      className="inline-block mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold shadow"
                      onClick={() => navigate('/booking-details', {
                        state: {
                          room,
                          checkIn,
                          checkOut,
                          guests
                        }
                      })}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
