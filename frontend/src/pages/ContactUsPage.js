import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactForm } from '../services/apiService';

const ContactUsPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", text: "Please fill all required fields (*)" });
      return;
    }
    try {
      setSubmitting(true);
      await submitContactForm(form);
      setStatus({ type: "success", text: "Thank you! Your message has been sent." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err?.message || "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-indigo-900/80 to-purple-900/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Contact <span className="text-indigo-300">Moffat Bay Lodge</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Have a question, feedback, or booking inquiry? We’d love to hear
            from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl shadow-lg p-8">
            {status.text && (
              <div
                className={`mb-6 p-4 rounded-lg text-center font-medium ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.text}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={6}
                  className="w-full border rounded-lg p-3 resize-y"
                />
              </div>

              <button
                disabled={submitting}
                className="w-full md:w-auto px-6 py-3 rounded-lg shadow bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Lodge Contact Info */}
          <div className="mt-12 text-center text-gray-700 space-y-2">
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Email:</strong> info@moffatbay.com</p>
            <p><strong>Address:</strong> 123 Moffat Bay Road, Scenic Valley, WA 98201</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;