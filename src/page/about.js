import React, { useState } from "react";
import { Briefcase, Globe, Target, Users, CheckCircle, Settings, BarChart, Rocket, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

function About() {
  const [loading, setLoading] = useState(false);

  const handleContactClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/contact"; // Redirect after 2 seconds
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-6">
      <div className="max-w-7xl w-full bg-white shadow-2xl rounded-3xl p-12 space-y-12">
        <motion.h1
          className="text-5xl font-extrabold text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Taskict
        </motion.h1>

        <motion.p className="text-lg text-center text-gray-700 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Taskict is a global leader in digital task management and productivity solutions. We empower businesses and individuals
          with cutting-edge technology to streamline workflow, enhance collaboration, and maximize efficiency.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={Globe} title="Our Vision" text="Revolutionizing productivity with intuitive and scalable solutions, making workflow management effortless worldwide." />
          <FeatureCard icon={Target} title="Our Mission" text="Empowering businesses with smart tools to optimize productivity, automate workflows, and drive success." />
          <FeatureCard icon={Users} title="Our Values" text="We believe in innovation, transparency, and user-centric solutions that create a seamless experience for everyone." />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center">Why Choose Taskict?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <AdvantageCard icon={CheckCircle} title="Efficiency" text="Automate tasks, reduce manual efforts, and improve productivity effortlessly." />
          <AdvantageCard icon={Settings} title="Customization" text="Tailor Taskict to your specific needs with flexible settings and personalized dashboards." />
          <AdvantageCard icon={Briefcase} title="Business Growth" text="Optimize team collaboration and workflow to scale your business with confidence." />
          <AdvantageCard icon={BarChart} title="Data Insights" text="Gain valuable analytics to track performance and make data-driven decisions." />
          <AdvantageCard icon={Rocket} title="Innovation" text="Experience cutting-edge features designed to take productivity to the next level." />
          <AdvantageCard icon={Shield} title="Security" text="Your data is protected with enterprise-grade security and encryption protocols." />
        </div>

        <motion.p className="text-xl font-semibold text-center text-gray-900 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Join Taskict today and transform the way you work. <br /> Innovation starts here!
        </motion.p>

        {/* Contact Us Button with Loader */}
        <div className="flex justify-center items-center">
          <button
            className={`flex items-center justify-center gap-2 bg-blue-700 text-white py-2 px-6 rounded-full shadow-md border-2 border-blue-700 
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
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, text }) => (
  <motion.div
    className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-14 h-14 text-indigo-700" />
    <h3 className="text-2xl font-semibold mt-4 text-gray-900">{title}</h3>
    <p className="text-gray-700 mt-2">{text}</p>
  </motion.div>
);

const AdvantageCard = ({ icon: Icon, title, text }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4 border-l-8 border-indigo-600 transform transition duration-300 hover:scale-102"
    whileHover={{ scale: 1.02 }}
  >
    <Icon className="w-12 h-12 text-indigo-700" />
    <div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </div>
  </motion.div>
);

export default About;
