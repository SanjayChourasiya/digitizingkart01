// App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import React from "react";

import Home from "./page/home";
import About from "../src/page/about";
import Contact from "../src/page/Contact";
import Blog from "../src/page/blog";
import Loader from "../src/page/Loder";
import Product from "../src/page/product";
import SingleProductPage from "../src/page/Productpage";

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Router>
      <div className="h-screen bg-gray-100">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Navbar */}
            <header className="bg-gray-200 shadow sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <div className="text-2xl font-extrabold text-black">
                  Stitch<span className="text-[#4B4FCA]">Craft</span>
                </div>
                <nav className="space-x-8 hidden md:block font-semibold">
                  {["Home", "Products", "Pricing", "Testimonials", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-[#5C5F7C] hover:text-[#4B4FCA] transition"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
                <button className="bg-[#4B4FCA] text-white px-6 py-2 rounded-full shadow hover:bg-[#3B3FBA] transition-transform transform hover:scale-105">
                  Get a Quote
                </button>
              </div>
            </header>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:productName" element={<SingleProductPage />} />
            </Routes>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
                <div>
                  <h2 className="text-2xl font-bold">Diziting Kart</h2>
                  <p className="mt-3 text-gray-400">
                    Empowering local businesses and customers with a seamless shopping experience. Shop local, shop smart with Diziting Kart!
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Categories</h3>
                  <ul className="mt-3 space-y-2">
                    <li><a href="#" className="hover:text-gray-300 transition">Groceries</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Home Essentials</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Fashion</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Electronics</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Seller Services</h3>
                  <ul className="mt-3 space-y-2">
                    <li><a href="#" className="hover:text-gray-300 transition">Sell on Diziting Kart</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Vendor Support</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Seller Dashboard</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Promote Your Products</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Quick Links</h3>
                  <ul className="mt-3 space-y-2">
                    <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">About Us</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Shop</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Follow Us</h3>
                  <div className="mt-4 flex space-x-4">
                    <a href="#" className="hover:text-gray-400 transition"><FaFacebook size={24} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><FaTwitter size={24} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><FaInstagram size={24} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><FaLinkedin size={24} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><FaYoutube size={24} /></a>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center text-gray-400 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Diziting Kart. All rights reserved.
              </div>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
