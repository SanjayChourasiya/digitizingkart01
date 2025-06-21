import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

// --- QuoteForm Component (Included directly) ---
const QuoteForm = () => {
  const [fileName, setFileName] = useState("Upload Design (optional)");
  const [formStatus, setFormStatus] = useState(""); // To display success/error messages

  // State to hold all form data
  const formDataInitialState = {
    full_name: "",
    email_address: "",
    phone_number: "",
    embroidery_needs: "",
  };
  const [formData, setFormData] = useState(formDataInitialState);

  // Handle changes for text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, design_file: file }));
    } else {
      setFileName("Upload Design (optional)");
      setFormData((prev) => ({ ...prev, design_file: null }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission

    setFormStatus("Sending your request..."); // Provide immediate feedback to the user

    // Create a FormData object to send text inputs and the file
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    try {
      // IMPORTANT: Replace this URL with the actual address of your backend server when deployed.
      // For local development, 'http://localhost:5000/api/send-email' is correct.
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        body: dataToSend, // FormData correctly handles content-type for files
      });

      if (response.ok) {
        setFormStatus("Request sent successfully! We'll get back to you soon.");
        setFormData(formDataInitialState); // Clear the form fields
        setFileName("Upload Design (optional)"); // Reset file input text
      } else {
        const errorData = await response.json(); // Attempt to parse error message from backend
        setFormStatus(`Failed to send request: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("An unexpected error occurred. Please try again later.");
    }
  };

  return (
      <form className="space-y-4 " onSubmit={handleSubmit}>
        {/* Input fields with name, value, and onChange handler */}
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="w-full p-3 border border-[#D1D5FA] rounded focus:ring-2 focus:ring-[#4B4FCA]"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email_address"
          placeholder="Email Address"
          className="w-full p-3 border border-[#D1D5FA] rounded focus:ring-2 focus:ring-[#4B4FCA]"
          value={formData.email_address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          className="w-full p-3 border border-[#D1D5FA] rounded focus:ring-2 focus:ring-[#4B4FCA]"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <textarea
          name="embroidery_needs"
          placeholder="Tell us your embroidery needs..."
          rows="4"
          className="w-full p-3 border border-[#D1D5FA] rounded focus:ring-2 focus:ring-[#4B4FCA]"
          value={formData.embroidery_needs}
          onChange={handleChange}
          required
        ></textarea>

        {/* File Upload Input */}
        <div className="relative border border-[#D1D5FA] rounded p-3 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-[#4B4FCA] hover:bg-gray-50 transition">
          <input
            type="file"
            id="file-upload"
            name="design_file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
            // Optional: Add 'accept' to restrict file types, e.g., accept=".jpg,.jpeg,.png,.pdf"
          />
          <label htmlFor="file-upload" className="text-gray-600 truncate mr-2">
            {fileName}
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#4B4FCA]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-[#4B4FCA] text-white py-3 rounded hover:bg-[#3B3FBA] transition font-semibold"
        >
          Submit Request
        </motion.button>

        {/* Display form submission status */}
        {formStatus && (
          <p className={`mt-4 text-center text-sm font-semibold ${formStatus.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
            {formStatus}
          </p>
        )}
      </form>
  );
};

// --- RequestQuoteModal Component (Included directly) ---
const RequestQuoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Request a <span className="text-[#4B4FCA]">Quote</span>
        </h2>
        <QuoteForm /> {/* Uses the QuoteForm component defined above */}  
      </motion.div>
    </motion.div>
  );
};

// --- Static Data (kept for completeness) ---
const partners = [
  { id: 1, name: "Partner 1", bg: "bg-red-300" },
  { id: 2, name: "Partner 2", bg: "bg-blue-300" },
  { id: 3, name: "Partner 3", bg: "bg-green-300" },
  { id: 4, name: "Partner 4", bg: "bg-yellow-300" },
  { id: 5, name: "Partner 5", bg: "bg-purple-300" },
  { id: 6, name: "Partner 6", bg: "bg-indigo-300" },
];

const products = [
  {
    name: "Shirts",
    category: "Apparel",
    image: "/img/shopping.png",
    rating: 4,
    discount: 20,
    price: 999.99,
  },
  {
    name: "Sweatshirts",
    category: "Apparel",
    image: "/img/swetshirt.png",
    rating: 5,
    price: 999.99,
  },
  {
    name: "Caps",
    category: "Accessories",
    image: "/img/image.png",
    rating: 3,
    discount: 15,
    price: 999.99,
  },
  {
    name: "jacket",
    category: "Accessories",
    image: "/img/jacket.png",
    rating: 4,
    price: 999.99,
  },
  {
    name: "Hoodie",
    category: "Business",
    image: "/img/hoodie.png",
    rating: 5,
    discount: 10,
    price: 999.99,
  },
  {
    name: "Shirt",
    category: "Business",
    image: "/img/shopping.png",
    rating: 4,
    price: 999.99,
  },
];

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    text: "Stichkart transformed the way we manage projects!",
    company: "CEO, TechCorp",
    image: "/img/review.jpeg",
  },
  {
    id: 2,
    name: "Sarah Smith",
    text: "An amazing tool for productivity and team collaboration.",
    company: "Manager, DevHub",
    image: "/img/review.jpeg",
  },
  {
    id: 3,
    name: "Michael Lee",
    text: "A must-have for efficient project tracking and execution.",
    company: "Founder, StartupX",
    image: "/img/review.jpeg",
  },
];

const faqs = [
  {
    question: "What is the mission of Diziting Kart?",
    answer:
      "Diziting Kart aims to bridge the gap between local sellers and customers by offering a hyper-local online marketplace for everyday essentials.",
  },
  {
    question: "How does Diziting Kart support local businesses?",
    answer:
      "We provide an easy-to-use platform for local vendors to showcase and sell their products, reaching a wider audience and boosting their sales.",
  },
  {
    question: "How can customers benefit from using Diziting Kart?",
    answer:
      "Customers can shop conveniently for a wide variety of products from trusted local vendors, supporting their community and enjoying quick delivery.",
  },
  {
    question: "Is there a fee for sellers to join Diziting Kart?",
    answer:
    "Diziting Kart offers flexible plans for sellers, including a free option to start selling and premium plans with added promotional features.",
  },
];

// --- FAQSection Component (Included directly) ---
function FAQSection() {
  const [openIndexes, setOpenIndexes] = useState({});
  const toggleFAQ = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
      </div>
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-20 px-4">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg shadow-md bg-gray-50">
              <button
                className="w-full flex justify-between items-center p-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-xl">{openIndexes[index] ? "−" : "+"}</span>
              </button>
              {openIndexes[index] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 text-gray-700 bg-white rounded-b-lg"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/img/faq.png"
            alt="FAQ Illustration"
            className="max-w-full h-fit rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

// --- PartnerSlider Component (Included directly) ---
function PartnerSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 2;
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 30);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="text-4xl font-extrabold text-[#2C2E55] text-center mb-8">
        <h1>Trusted Partner</h1>
      </div>
      <div
        ref={containerRef}
        className="overflow-hidden flex whitespace-nowrap w-full px-4"
      >
        <motion.div className="flex gap-6" style={{ minWidth: "max-content" }}>
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className={`flex-none w-40 h-40 flex justify-center items-center ${partner.bg} p-6 rounded-lg shadow-md`}
            >
              <h1 className="text-lg font-semibold">{partner.name}</h1>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- ClientTestimonials Component (Included directly) ---
function ClientTestimonials() {
  return (
    <section className="py-16 bg-white text-gray-900">
      <motion.div
        className="text-center font-bold text-3xl mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1>What Clients Say About Us</h1>
      </motion.div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4 border-4 border-blue-500 object-cover"
            />
            <p className="text-lg italic text-gray-700">“{testimonial.text}”</p>
            <h3 className="mt-4 font-semibold text-xl text-gray-900">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600">{testimonial.company}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// --- Main Home Component ---
function Home() {
  const categories = ["All Products", "Apparel", "Accessories", "Business"];
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Banner */}
      <section id="home" className="relative h-[650px]">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/banner.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center md:grid md:grid-cols-2 gap-60 items-center">
          <motion.div
            className="text-black"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight mb-5">
              Custom <span className="text-[#4B4FCA]">Embroidery</span> for
              Your Brand
            </h1>
            <p className="text-lg font-medium mb-8">
              Elevate your apparel with our high-quality embroidery — perfect
              for businesses, events, and personal branding.
            </p>
            <div className="space-x-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#4B4FCA] hover:bg-[#3B3FBA] px-8 py-3 rounded-full text-white font-semibold shadow transition"
                onClick={openModal}
              >
                Explore Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border-2 border-[#4B4FCA] text-[#4B4FCA] px-8 py-3 rounded-full hover:bg-[#4B4FCA] hover:text-white transition font-semibold"
                onClick={openModal}
              >
                View Pricing
              </motion.button>
            </div>
          </motion.div>
          {/* Form remains in the hero section */}
          <motion.div
            className="relative w-full max-w-md mx-auto md:mx-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-8 border ">
              <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Request a <span className="text-[#4B4FCA]">Quote</span>
              </h2>
              <QuoteForm /> {/* Uses the QuoteForm component defined in this file */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner */}
      <PartnerSlider />

      {/* Products */}
    <section className="py-12 bg-gray-50">
  <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>

  {/* Category Buttons */}
  <div className="flex justify-center gap-4 mb-8 flex-wrap">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${
          selectedCategory === category
            ? "bg-blue-600 text-white shadow-md"
            : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        }`}
      >
        {category}
      </button>
    ))}
  </div>

  {/* Product Cards */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    {filteredProducts.map((product, index) => (
      <Link
        key={product.name}
        to={`/product/${encodeURIComponent(product.name)}`}
        className="block h-full"
      >
        <motion.div
          className="bg-white p-4 rounded-xl shadow relative flex flex-col h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Discount Label */}
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
              {product.discount}% OFF
            </span>
          )}

          {/* Image */}
          <div className="flex-grow flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded mb-4"
            />
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center my-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline mb-3">
            {product.originalPrice && product.discount ? (
              <>
                <span className="text-xl font-bold text-gray-900 mr-2">
                  $
                  {(
                    product.originalPrice *
                    (1 - product.discount / 100)
                  ).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-auto w-full gap-2">
            <button className="flex-1 bg-[#4B4FCA] text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700">
              View details
            </button>
            <button
              className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900"
              onClick={(e) => {
                e.preventDefault(); // prevent Link trigger
                openModal();
              }}
            >
              Get Quote
            </button>
          </div>
        </motion.div>
      </Link>
    ))}
  </div>
</section>

      {/* Pricing */}
      <section id="pricing" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-extrabold text-[#2C2E55] mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Pricing
          </motion.h2>
          <motion.p
            className="mb-16 text-[#5C5F7C] max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transparent, flexible pricing crafted for every need.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Basic",
                price: "$49",
                features: ["10 items", "Single color", "5-day delivery"],
              },
              {
                title: "Standard",
                price: "$99",
                features: ["25 items", "Multi-color", "3-day delivery"],
              },
              {
                title: "Premium",
                price: "$149",
                features: ["50 items", "Full customization", "2-day delivery"],
              },
            ].map(({ title, price, features }, idx) => (
              <motion.div
                key={title}
                className="bg-[#F9FAFF] rounded-3xl shadow-lg p-8 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-[#2C2E55] mb-4">
                  {title}
                </h3>
                <div className="text-4xl font-extrabold text-[#4B4FCA] mb-6">
                  {price}
                </div>
                <ul className="text-left text-[#5C5F7C] space-y-3 mb-8">
                  {features.map((f, i) => (
                    <li key={i}>✅ {f}</li>
                  ))}
                </ul>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#4B4FCA] text-white py-3 rounded-full hover:bg-[#3B3FBA] transition font-semibold"
                  onClick={openModal}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <ClientTestimonials />

      {/* FAQs */}
      <FAQSection />

      {/* Request Quote Modal */}
      <AnimatePresence>
        {isModalOpen && <RequestQuoteModal isOpen={isModalOpen} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

export default Home;