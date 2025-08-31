import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                🤝 Volunteer Finder
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Meaningful Volunteer Opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover volunteer opportunities perfect for high school students. 
            Filter by location, skills, and interests to find the perfect way to give back to your community.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter your location..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Search Opportunities
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location-Based</h3>
            <p className="text-gray-600">Find opportunities near you with our distance-based filtering.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Matching</h3>
            <p className="text-gray-600">Match your skills and interests with the perfect volunteer role.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">Find opportunities that fit your busy high school schedule.</p>
          </div>
        </div>

        {/* Status */}
        <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🚧 Coming Soon!</h3>
          <p className="text-blue-700">
            We're building an amazing platform to help high school students find volunteer opportunities. 
            Stay tuned for updates!
          </p>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-medium">
              Backend API: ✅ Ready | Database: ✅ Ready | Scraping: 🔄 In Progress
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
