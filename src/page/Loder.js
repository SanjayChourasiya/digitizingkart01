export default function TLoader() {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="relative w-16 h-16">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-700 w-4 h-16 animate-bounce"></div>
          {/* Horizontal Line */}
          <div className="absolute top-0 left-0 bg-blue-700 w-16 h-4 animate-pulse"></div>
        </div>
      </div>
    );
  }
  