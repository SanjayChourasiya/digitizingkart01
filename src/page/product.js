import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaUser, FaQuoteRight, FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Briefcase, Globe, Target, Users, CheckCircle, Settings, BarChart, Rocket, Shield, Lightbulb } from "lucide-react";

const Product = () => {
  const [loading, setLoading] = useState(false);

  const handleContactClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/contact"; // 2 सेकंड के बाद रीडायरेक्ट
    }, 1000);
  };

  const testimonials = [
    { id: 1, name: "John Doe", text: "Taskict transformed the way we manage projects!", company: "CEO, TechCorp", image: "/images.png" },
    { id: 2, name: "Sarah Smith", text: "An amazing tool for productivity and team collaboration.", company: "Manager, DevHub", image: "/images.png" },
    { id: 3, name: "Michael Lee", text: "A must-have for efficient project tracking and execution.", company: "Founder, StartupX", image: "/images.png" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <header className="bg-gray-300 h-[400px] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">Products & Solutions</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
          At Taskict, we provide innovative systems to keep your people, property, operations,
          and information secure.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
          Get Started
        </button>
      </header>

      {/* Products Section */}
      <section className="container mx-auto py-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <img src="/img/service3.jpg" alt="System" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Our Systems</h2>
              <p className="mt-3 text-gray-600">
                Flexible solutions for evolving needs, small to large businesses.
              </p>
              <button className="mt-5 w-full bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 py-3 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <img src="/img/service2.jpg" alt="Hardware" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Our Hardware</h2>
              <p className="mt-3 text-gray-600">
                Innovative design with minimal installation effort and modular structure.
              </p>
              <button className="mt-5 w-full bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 py-3 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <img src="/img/service4.jpg" alt="Solutions" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Our Solutions</h2>
              <p className="mt-3 text-gray-600">
                Seamless, user-friendly electronic security solutions.
              </p>
              <button className="mt-5 w-full bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 py-3 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <img src="/img/service1.jpg" alt="Integrations" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Our Integrations</h2>
              <p className="mt-3 text-gray-600">
                Enhance compatibility with third-party integrations.
              </p>
              <button className="mt-5 w-full bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 py-3 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white text-gray-900 py-20">
        <div className="text-center font-bold text-3xl mb-12">
          <h1>What Clients Say About Us</h1>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <img
                src={testimonial.image}
                onError={(e) => {
                  e.target.src = "/placeholder.png"; // Fallback image if not found
                  e.target.onerror = null;
                }}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 border-4 border-blue-500 object-cover"
              />
              <p className="text-lg italic text-gray-700">“{testimonial.text}”</p>
              <h3 className="mt-4 font-semibold text-xl text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-300 flex items-center justify-center  p-8">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Get in Touch with Us</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          Whether you have questions, need support, or want to learn more about our products,  
          our team is here to help.
        </p>

        {/* Centered Button */}
        <div className="flex justify-center">
          <button
            className={`flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-full shadow-md border-2 border-blue-700 
              hover:bg-white hover:text-blue-700 hover:border-blue-700 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handleContactClick}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Loading...</span>
              </>
            ) : (
              "Contact Us"
            )}
          </button>
        </div>
      </div>
    </section>
 
    </div>
  );
};

export default Product;
