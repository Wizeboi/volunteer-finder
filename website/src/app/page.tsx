'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import OpportunityCard from '@/components/OpportunityCard'
import FilterSidebar from '@/components/FilterSidebar'
import { Opportunity } from '@/types/opportunity'

// Import build-time generated data
let opportunities: Opportunity[] = []
let lastUpdated = ''

try {
  // This file is generated at build time by our scraping script
  const data = require('@/data/opportunities.ts')
  opportunities = data.opportunities || []
  lastUpdated = data.lastUpdated || ''
} catch (error) {
  console.log('No data file found - running in development mode')
  // Mock data for development
  opportunities = [
    {
      id: 'demo-1',
      title: 'Community Garden Volunteer',
      description: 'Help maintain community gardens and teach sustainable gardening practices to local families. This is a great opportunity for students interested in environmental science.',
      organization: {
        name: 'Green Community Initiative',
        verified: true
      },
      location: {
        address: 'Community Garden, Main St',
        city: 'Springfield',
        state: 'IL',
        isRemote: false
      },
      category: 'Environment & Conservation',
      skills: ['Gardening', 'Teaching', 'Physical Work'],
      requirements: 'Must be 14 or older. No experience required.',
      timeCommitment: 'Weekly commitment',
      applicationUrl: 'https://example.com/apply/garden-volunteer',
      sourceWebsite: 'Demo',
      sourceUrl: 'https://example.com/opportunities/garden-volunteer',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'demo-2',
      title: 'Youth Tutoring Program',
      description: 'Tutor elementary school students in reading and basic math skills. Help bridge the educational gap in underserved communities.',
      organization: {
        name: 'Reading Partners',
        verified: true
      },
      location: {
        address: 'Lincoln Elementary School',
        city: 'Springfield',
        state: 'IL',
        isRemote: false
      },
      category: 'Education & Tutoring',
      skills: ['Tutoring', 'Mentoring', 'Patience'],
      requirements: 'High school students welcome. Background check required.',
      timeCommitment: 'Weekly commitment',
      applicationUrl: 'https://example.com/apply/youth-tutor',
      sourceWebsite: 'Demo',
      sourceUrl: 'https://example.com/opportunities/youth-tutor',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'demo-3',
      title: 'Animal Shelter Assistant',
      description: 'Assist with animal care, cleaning kennels, and helping with adoption events. Perfect for animal lovers!',
      organization: {
        name: 'Happy Paws Animal Shelter',
        verified: false
      },
      location: {
        address: 'Animal Shelter, Oak Ave',
        city: 'Springfield',
        state: 'IL',
        isRemote: false
      },
      category: 'Animal Welfare',
      skills: ['Animal Care', 'Physical Work', 'Compassion'],
      requirements: 'Ages 16+. Must attend orientation session.',
      timeCommitment: 'Flexible scheduling',
      applicationUrl: 'https://example.com/apply/animal-shelter',
      sourceWebsite: 'Demo',
      sourceUrl: 'https://example.com/opportunities/animal-shelter',
      scrapedAt: new Date().toISOString()
    }
  ]
}

export default function HomePage() {
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(opportunities)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    timeCommitment: '',
    skills: [] as string[]
  })

  useEffect(() => {
    // Client-side filtering logic
    let filtered = opportunities

    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.location) {
      filtered = filtered.filter(opp => 
        opp.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        opp.location.state.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter(opp => opp.category === filters.category)
    }

    if (filters.timeCommitment) {
      filtered = filtered.filter(opp => opp.timeCommitment === filters.timeCommitment)
    }

    setFilteredOpportunities(filtered)
  }, [searchTerm, filters])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                🤝 Volunteer Finder
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredOpportunities.length} opportunities found
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Volunteer Opportunity
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Discover meaningful ways to give back to your community. 
            Perfect for high school students building their college applications.
          </p>
          
          <SearchBar onSearch={setSearchTerm} />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </aside>

          {/* Opportunities Grid */}
          <section className="lg:w-3/4">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {opportunities.length === 0 ? 'Building Database...' : 'No Opportunities Found'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {opportunities.length === 0 
                    ? 'We\'re currently scraping volunteer websites to build our database of opportunities. Check back soon!'
                    : 'Try adjusting your search criteria or filters to find more opportunities.'
                  }
                </p>
                {opportunities.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                    <h4 className="font-semibold text-blue-900 mb-2">🚧 Coming Soon!</h4>
                    <p className="text-blue-700 text-sm">
                      Our scraping system will automatically gather opportunities from:
                    </p>
                    <ul className="text-blue-700 text-sm mt-2 space-y-1">
                      <li>• VolunteerMatch.org</li>
                      <li>• JustServe.org</li>
                      <li>• Idealist.org</li>
                      <li>• Local community organizations</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredOpportunities.map((opportunity, index) => (
                  <OpportunityCard key={index} opportunity={opportunity} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🤝 Volunteer Finder</h3>
              <p className="text-gray-300">
                Helping high school students find meaningful volunteer opportunities 
                to make a difference in their communities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Location-based search</li>
                <li>Skill matching</li>
                <li>Flexible scheduling</li>
                <li>Multiple categories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-gray-300">
                <li>VolunteerMatch</li>
                <li>JustServe</li>
                <li>Idealist</li>
                <li>Local Organizations</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>Updated daily with fresh opportunities • Built for students, by students</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
