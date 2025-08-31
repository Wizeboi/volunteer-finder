'use client'

import { Filters } from '@/types/opportunity'

interface FilterSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const categories = [
  'Education & Tutoring',
  'Environment & Conservation',
  'Community Development',
  'Healthcare & Wellness',
  'Animal Welfare',
  'Arts & Culture',
  'Technology & Innovation',
  'Senior Services',
  'Youth Development',
  'Food & Nutrition'
]

const timeCommitments = [
  'One-time event',
  'Weekly commitment',
  'Monthly commitment',
  'Flexible scheduling',
  'Summer only',
  'Weekend only'
]

const skillOptions = [
  'Tutoring',
  'Public Speaking',
  'Web Development',
  'Graphic Design',
  'Photography',
  'Writing',
  'Event Planning',
  'Social Media',
  'Foreign Languages',
  'Music',
  'Sports Coaching',
  'Fundraising'
]

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill]
    
    updateFilter('skills', newSkills)
  }

  const clearFilters = () => {
    onFiltersChange({
      location: '',
      category: '',
      timeCommitment: '',
      skills: []
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            placeholder="City or State"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Time Commitment Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Commitment
          </label>
          <select
            value={filters.timeCommitment}
            onChange={(e) => updateFilter('timeCommitment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any Time Commitment</option>
            {timeCommitments.map(commitment => (
              <option key={commitment} value={commitment}>
                {commitment}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills ({filters.skills.length} selected)
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {skillOptions.map(skill => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
