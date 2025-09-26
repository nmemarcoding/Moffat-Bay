import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ATTRACTIONS = [
  {
    id: 'hiking',
    title: 'Hiking',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    desc: 'Explore scenic trails and breathtaking views along the Pacific Northwest coast.',
    distance: '1–5 miles from the lodge',
    rates: 'Free',
    times: 'Open daily, sunrise to sunset',
  },
  {
    id: 'kayaking',
    title: 'Kayaking',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    desc: 'Paddle across calm waters and experience the beauty of Moffat Bay up close.',
    distance: '0.5 miles from the lodge',
    rates: '$25 per hour',
    times: '8:00 AM – 6:00 PM daily',
  },
  {
    id: 'whale',
    title: 'Whale Watching',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    desc: 'Embark on an unforgettable journey to see orcas, humpbacks, and other marine life.',
    distance: '2 miles from the lodge',
    rates: '$75 per adult, $50 per child',
    times: '10:00 AM & 2:00 PM tours daily',
  },
  {
    id: 'scuba',
    title: 'Scuba Diving',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    desc: 'Dive beneath the surface to explore vibrant underwater ecosystems and marine habitats.',
    distance: '3 miles from the lodge',
    rates: '$120 per dive, equipment included',
    times: '9:00 AM – 5:00 PM, appointments required',
  },
];

const Attractions = () => {
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') setOpenItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (openItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [openItem]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-800">
      <Navbar />

      <section id="home" className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Explore Our Attractions
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Discover exciting activities around Moffat Bay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/availability"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </a>
              <a
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome to Moffat Bay
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Nestled along the stunning Pacific Northwest coast, Moffat Bay
            Marina &amp; Lodge offers adventure, relaxation, and family-friendly
            activities for everyone. From hiking trails to scenic kayaking
            routes, our attractions make for an unforgettable stay.
          </p>
        </section>

        <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ATTRACTIONS.map(a => (
            <article
              key={a.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transform hover:scale-105 transition"
              onClick={() => setOpenItem(a)}
              aria-label={`Open details for ${a.title}`}
            >
              <img
                src={a.img}
                alt={a.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-indigo-600 font-semibold">{a.title}</h3>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 bg-white rounded-xl py-12 text-center shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ready to Explore Moffat Bay?
          </h2>
          <a
            href="/availability"
            className="inline-block mt-4 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition"
          >
            Book Your Stay Now
          </a>
        </section>
      </main>

      <Footer />

      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={e => {
            if (e.target === e.currentTarget) setOpenItem(null);
          }}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-auto">
            <div className="relative">
              <button
                onClick={() => setOpenItem(null)}
                className="absolute right-3 top-3 text-slate-700 text-xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={openItem.img}
                alt={openItem.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-sky-700 text-2xl font-semibold">
                {openItem.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{openItem.desc}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <strong>Distance:</strong>
                  <div className="text-slate-700">{openItem.distance}</div>
                </div>
                <div>
                  <strong>Rates:</strong>
                  <div className="text-slate-700">{openItem.rates}</div>
                </div>
                <div>
                  <strong>Times:</strong>
                  <div className="text-slate-700">{openItem.times}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attractions;
