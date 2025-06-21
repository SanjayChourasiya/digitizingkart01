import React, { useState } from "react";
import { Mail, Phone, Users, FileText, User, MessageCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function ContactPage() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "fd0af42c-c6cb-43b3-8ae4-e8d6a8e1551f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      toast.success("Form submitted successfully!");
    } else {
      setResult(data.message);
      toast.error("Form submission failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-10 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-6xl w-full grid md:grid-cols-3 gap-8 bg-white shadow-lg rounded-xl p-8">
        <div className="md:col-span-1 space-y-6 bg-indigo-100 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-black">Help & Support</h2>
          <p className="text-gray-700 text-sm">Have a question or issue? Contact us:</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-800 text-sm">Taskict@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-800 text-sm">Taskictsupport@k3ytech.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-800 text-sm">Careers@taskict.com</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mt-6">Corporate Office</h3>
          <p className="text-gray-700 text-sm">
            TASKICT PVT LTD
            <br /> Office No.2, Building No.3, Golders Green,
            <br /> Holy Cross Road, Borivali West,
            <br /> Mumbai, Maharashtra 400103, India.
          </p>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="text-gray-800 text-sm">+91 9876543210 / +91 9876543210</span>
          </div>
        </div>
        <div className="md:col-span-2 p-6 space-y-6 bg-white rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900">Hi, How can we help You?</h2>
          <p className="text-gray-700 text-center text-sm">
            For any other queries or information, please write to us here and we will contact you.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" />
                <input type="text" name="name" placeholder="Enter your name" required className="pl-10 p-3 border rounded-lg w-full" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" />
                <input type="email" name="email" placeholder="Enter your email" required className="pl-10 p-3 border rounded-lg w-full" />
              </div>
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-500" />
              <input type="tel" name="mobile" placeholder="Enter your mobile number" required className="pl-10 p-3 border rounded-lg w-full" />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 text-gray-500" />
              <textarea name="message" placeholder="Enter your message" maxLength="500" className="pl-10 p-3 border rounded-lg w-full h-32" required></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
