import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-indigo-900/80 to-purple-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About{' '}
              <span className="text-indigo-300">
                Moffat Bay: A new chapter begins on Joviedsa Island
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Wake to sunrises over the bay, unwind under starlit skies, and
              start a new adventure each day.
              <br />
              Welcome to Moffat Bay Marina & Lodge, a groundbreaking resort and
              marina project on the pristine shores of Joviedsa Island in
              Washington State's San Juan Islands. After six months of
              development, we're nearly ready to welcome our first guests to
              this extraordinary waterfront destination.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story: A Vision Realized on Joviedsa Island
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The Moffat Bay Marina & Lodge project represents a collaborative
                vision between the San Juan Islands First Nations Development
                Committee and forward-thinking developers committed to
                sustainable island tourism.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Six months ago, the First Nations Development Committee approved
                this ambitious resort and marina project, recognizing the
                potential to create a world-class destination that honors the
                island's natural beauty and cultural heritage while providing
                economic opportunities for the local community.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, as construction nears completion, we stand ready to open
                a new chapter in Pacific Northwest hospitality, offering
                visitors an authentic island experience that celebrates the
                unique character of Joviedsa Island and the San Juan Islands
                archipelago.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-400 to-purple-500 h-96 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                Historic Lodge Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values: What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're guided by principles that ensure every guest experiences the
              authentic spirit of Joviedsa Island and the San Juan Islands,
              while respecting the cultural heritage of the First Nations
              communities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sustainability First
              </h3>
              <p className="text-gray-600">
                We're committed to preserving the pristine beauty of Joviedsa
                Island and Moffat Bay through eco-friendly practices, renewable
                energy, and responsible tourism initiatives that protect the
                island's delicate ecosystem.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cultural Partnership
              </h3>
              <p className="text-gray-600">
                We honor our partnership with the San Juan Islands First Nations
                Development Committee, creating authentic experiences that
                celebrate and respect the island's indigenous heritage.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Island Adventure
              </h3>
              <p className="text-gray-600">
                We're committed to offering guests a truly unique island
                experience, with activities and excursions that connect them
                with the natural beauty and cultural heritage of Joviedsa
                Island.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team: The People Behind Your Perfect Island Stay
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our passionate team of hospitality professionals, outdoor
              enthusiasts, and local island experts work together to create
              unforgettable experiences that showcase the magic of Joviedsa
              Island.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">SM</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sarah Moffat
              </h3>
              <p className="text-indigo-600 font-medium mb-2">
                General Manager
              </p>
              <p className="text-gray-600">
                Sarah leads our operations with over 15+ years in hospitality,
                ensuring every aspect of your stay exceeds expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">MC</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mike Chen
              </h3>
              <p className="text-indigo-600 font-medium mb-2">
                Marina Director
              </p>
              <p className="text-gray-600">
                Mike ensures our marina operations run smoothly and helps guests
                plan their perfect day exploring the waters around Joviedsa
                Island.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">ER</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emma Rodriguez
              </h3>
              <p className="text-indigo-600 font-medium mb-2">Head Chef</p>
              <p className="text-gray-600">
                Emma brings the flavors of the San Juan Islands to life at
                Lighthouse Landing, creating memorable dining experiences with
                fresh, seasonal ingredients sourced from local island producers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Local Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community & Local Impact: Honoring Joviedsa Island & First Nations
              Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe in being good stewards of both our natural environment
              and the cultural heritage that makes Joviedsa Island special.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                Through our partnership with the San Juan Islands First Nations
                Development Committee, we support cultural preservation
                initiatives and sustainable tourism practices that honor the
                island's indigenous heritage. Our annual "Island Heritage Day"
                brings together guests, staff, and community members to
                celebrate and preserve the unique cultural traditions of the
                region.
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                We're proud to source ingredients from local island farmers and
                fishermen, supporting the regional economy while providing
                guests with the freshest, most authentic flavors of the San Juan
                Islands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visit Us
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Located in the heart of the Pacific Northwest, Moffat Bay offers
                easy access to pristine wilderness, charming coastal towns, and
                endless outdoor adventures.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-indigo-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    123 Moffat Bay Road, Scenic Valley, WA 98201
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-indigo-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-indigo-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">info@moffatbay.com</span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/availability"
                  className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Book Your Stay
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-400 to-purple-500 h-96 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                Location Map
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
