import React from "react";

const blogs = [
  {
    id: 1,
    title: "Future of ICT in 2025",
    description: "How cloud computing is revolutionizing businesses worldwide.",
    image: "../img/cloud.jpg",
    date: "March 16, 2025",
  },
  {
    id: 2,
    title: "Cloud Computing Innovations",
    description: "How cloud computing is revolutionizing businesses worldwide.",
    image: "../img/cloud1.jpg",

    date: "March 10, 2025",
  },
  {
    id: 3,
    title: "AI in Cybersecurity",
    description: "The role of artificial intelligence in securing digital landscapes.",
    image: "../img/cloud3.jpg",

    date: "March 5, 2025",
  },
  {
    id: 4,
    title: "AI in Cybersecurity",
    description: "The role of artificial intelligence in securing digital landscapes.",
    image: "../img/cloud3.jpg",

    date: "March 5, 2025",
  },
  {
    id: 5,
    title: "AI in Cybersecurity",
    description: "The role of artificial intelligence in securing digital landscapes.",
    image: "../img/cloud1.jpg",

    date: "March 5, 2025",
  },
  
  {
    id: 6,
    title: "AI in Cybersecurity",
    description: "The role of artificial intelligence in securing digital landscapes.",
    image: "../img/cloud.jpg",

    date: "March 5, 2025",
  },
  
  {
    id: 6,
    title: "AI in Cybersecurity",
    description: "The role of artificial intelligence in securing digital landscapes.",
    image: "../img/cloud.jpg",

    date: "March 5, 2025",
  },
  {
    id: 5,
    title: "AI in Cybersecurity",
    description: "The role of artificial intelligence in securing digital landscapes.",
    image: "../img/cloud1.jpg",

    date: "March 5, 2025",
  },
  
  {
    id: 2,
    title: "Cloud Computing Innovations",
    description: "How cloud computing is revolutionizing businesses worldwide.",
    image: "../img/cloud1.jpg",

    date: "March 10, 2025",
  },

];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Taskict Blog</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-600">{blog.date}</p>
                <p className="mt-2 text-gray-700">{blog.description}</p>
                <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// export default BlogPage;