export interface Opportunity {
  id: string
  title: string
  description: string
  organization: {
    name: string
    website?: string
    verified?: boolean
  }
  location: {
    address: string
    city: string
    state: string
    zipCode?: string
    isRemote: boolean
    coordinates?: {
      lat: number
      lng: number
    }
  }
  category: string
  skills: string[]
  requirements: string
  timeCommitment: string
  hoursPerWeek?: number
  ageRequirements?: {
    min: number
    max: number
  }
  startDate?: string
  endDate?: string
  applicationDeadline?: string
  applicationUrl: string
  contactEmail?: string
  contactPhone?: string
  sourceWebsite: string
  sourceUrl: string
  scrapedAt: string
  tags?: string[]
}

export interface Filters {
  location: string
  category: string
  timeCommitment: string
  skills: string[]
  maxDistance?: number
  ageRange?: {
    min: number
    max: number
  }
}
