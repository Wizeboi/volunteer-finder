const fs = require('fs').promises
const path = require('path')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

class StaticDataGenerator {
  constructor() {
    this.opportunities = []
    this.dataDir = path.join(__dirname, '..', 'src', 'data')
  }

  async scrapeAllSources() {
    console.log('🚀 Starting static data generation...')
    
    try {
      // Ensure data directory exists
      await fs.mkdir(this.dataDir, { recursive: true })
      
      // Scrape from multiple sources
      const sources = [
        this.scrapeVolunteerMatch(),
        this.scrapeJustServe(),
        // Add more scrapers as needed
      ]
      
      const results = await Promise.allSettled(sources)
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          this.opportunities.push(...result.value)
          console.log(`✅ Source ${index + 1}: ${result.value.length} opportunities`)
        } else {
          console.error(`❌ Source ${index + 1} failed:`, result.reason.message)
        }
      })
      
      // Process and save data
      await this.processData()
      await this.generateStaticFiles()
      
      console.log(`🎉 Static data generation complete! ${this.opportunities.length} total opportunities`)
      
    } catch (error) {
      console.error('❌ Error during static data generation:', error)
      process.exit(1)
    }
  }

  async scrapeVolunteerMatch() {
    console.log('📊 Scraping VolunteerMatch...')
    
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const opportunities = []
    
    try {
      const page = await browser.newPage()
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
      
      // Search for opportunities suitable for high school students
      const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Remote']
      
      for (const location of locations) {
        try {
          const searchUrl = `https://www.volunteermatch.org/search?l=${encodeURIComponent(location)}&k=high+school`
          await page.goto(searchUrl, { waitUntil: 'networkidle0', timeout: 30000 })
          
          // Wait for results or no results message
          await page.waitForSelector('.searchItem, .no-results', { timeout: 10000 })
          
          const content = await page.content()
          const $ = cheerio.load(content)
          
          $('.searchItem').each((index, element) => {
            const opportunity = this.extractVolunteerMatchData($, element)
            if (opportunity) {
              opportunities.push(opportunity)
            }
          })
          
          // Be respectful with delays
          await this.delay(2000)
          
        } catch (error) {
          console.warn(`Warning: Could not scrape ${location}:`, error.message)
        }
      }
      
    } catch (error) {
      console.error('Error scraping VolunteerMatch:', error.message)
    } finally {
      await browser.close()
    }
    
    return opportunities
  }

  async scrapeJustServe() {
    console.log('📊 Scraping JustServe...')
    
    // Mock data for now - replace with actual scraping logic
    return [
      {
        id: 'js-1',
        title: 'Community Garden Volunteer',
        description: 'Help maintain community gardens and teach sustainable gardening practices to local families.',
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
        applicationUrl: 'https://justserve.org/apply/garden-volunteer',
        sourceWebsite: 'JustServe',
        sourceUrl: 'https://justserve.org/opportunities/garden-volunteer',
        scrapedAt: new Date().toISOString()
      },
      {
        id: 'js-2',
        title: 'Youth Mentorship Program',
        description: 'Mentor elementary school students in reading and basic math skills.',
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
        applicationUrl: 'https://justserve.org/apply/youth-mentor',
        sourceWebsite: 'JustServe',
        sourceUrl: 'https://justserve.org/opportunities/youth-mentor',
        scrapedAt: new Date().toISOString()
      }
    ]
  }

  extractVolunteerMatchData($, element) {
    try {
      const $elem = $(element)
      
      const title = $elem.find('.searchItemTitle a').text().trim()
      const organization = $elem.find('.searchItemOrg').text().trim()
      const description = $elem.find('.searchItemDesc').text().trim()
      const location = $elem.find('.searchItemLocation').text().trim()
      const detailUrl = $elem.find('.searchItemTitle a').attr('href')
      
      if (!title || !organization) {
        return null
      }
      
      const locationParts = location.split(',').map(part => part.trim())
      const city = locationParts[0] || ''
      const state = locationParts[1] || ''
      
      return {
        id: `vm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        description,
        organization: {
          name: organization,
          verified: false
        },
        location: {
          address: location,
          city,
          state,
          isRemote: location.toLowerCase().includes('remote') || location.toLowerCase().includes('virtual')
        },
        category: this.categorizeOpportunity(title, description),
        skills: this.extractSkills(title, description),
        requirements: $elem.find('.searchItemReqs').text().trim() || 'Requirements not specified',
        timeCommitment: $elem.find('.searchItemTime').text().trim() || 'Flexible scheduling',
        applicationUrl: detailUrl ? `https://www.volunteermatch.org${detailUrl}` : '',
        sourceWebsite: 'VolunteerMatch',
        sourceUrl: detailUrl ? `https://www.volunteermatch.org${detailUrl}` : '',
        scrapedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error extracting VolunteerMatch data:', error)
      return null
    }
  }

  categorizeOpportunity(title, description) {
    const text = (title + ' ' + description).toLowerCase()
    
    if (text.includes('tutor') || text.includes('education') || text.includes('teach') || text.includes('school')) {
      return 'Education & Tutoring'
    }
    if (text.includes('environment') || text.includes('garden') || text.includes('clean') || text.includes('nature')) {
      return 'Environment & Conservation'
    }
    if (text.includes('food') || text.includes('kitchen') || text.includes('meal') || text.includes('hunger')) {
      return 'Food & Nutrition'
    }
    if (text.includes('animal') || text.includes('pet') || text.includes('shelter')) {
      return 'Animal Welfare'
    }
    if (text.includes('senior') || text.includes('elderly') || text.includes('nursing')) {
      return 'Senior Services'
    }
    if (text.includes('health') || text.includes('medical') || text.includes('hospital')) {
      return 'Healthcare & Wellness'
    }
    if (text.includes('art') || text.includes('music') || text.includes('culture') || text.includes('creative')) {
      return 'Arts & Culture'
    }
    if (text.includes('tech') || text.includes('computer') || text.includes('web') || text.includes('digital')) {
      return 'Technology & Innovation'
    }
    if (text.includes('youth') || text.includes('child') || text.includes('kids') || text.includes('mentor')) {
      return 'Youth Development'
    }
    
    return 'Community Development'
  }

  extractSkills(title, description) {
    const text = (title + ' ' + description).toLowerCase()
    const skills = []
    
    const skillMap = {
      'tutoring': ['tutor', 'teach', 'education'],
      'writing': ['write', 'writing', 'journalism'],
      'public speaking': ['speak', 'presentation', 'communication'],
      'event planning': ['event', 'planning', 'organize'],
      'photography': ['photo', 'camera', 'photography'],
      'social media': ['social media', 'facebook', 'instagram', 'twitter'],
      'web development': ['web', 'website', 'programming', 'coding'],
      'graphic design': ['design', 'graphic', 'visual'],
      'fundraising': ['fundrais', 'donation', 'money'],
      'physical work': ['physical', 'manual', 'lifting', 'outdoor'],
      'customer service': ['customer', 'service', 'reception'],
      'research': ['research', 'data', 'analysis']
    }
    
    for (const [skill, keywords] of Object.entries(skillMap)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        skills.push(skill.charAt(0).toUpperCase() + skill.slice(1))
      }
    }
    
    return skills.length > 0 ? skills : ['General Volunteering']
  }

  async processData() {
    console.log('🔄 Processing scraped data...')
    
    // Remove duplicates based on title and organization
    const uniqueOpportunities = []
    const seen = new Set()
    
    for (const opp of this.opportunities) {
      const key = `${opp.title.toLowerCase()}-${opp.organization.name.toLowerCase()}`
      if (!seen.has(key)) {
        seen.add(key)
        uniqueOpportunities.push(opp)
      }
    }
    
    this.opportunities = uniqueOpportunities
    console.log(`✨ Removed duplicates: ${uniqueOpportunities.length} unique opportunities`)
  }

  async generateStaticFiles() {
    console.log('💾 Generating static data files...')
    
    // Generate main opportunities file
    await fs.writeFile(
      path.join(this.dataDir, 'opportunities.json'),
      JSON.stringify(this.opportunities, null, 2)
    )
    
    // Generate TypeScript file that can be imported
    const tsContent = `// Auto-generated at build time
import { Opportunity } from '@/types/opportunity'

export const opportunities: Opportunity[] = ${JSON.stringify(this.opportunities, null, 2)}

export const categories = ${JSON.stringify(this.getCategories(), null, 2)}

export const locations = ${JSON.stringify(this.getLocations(), null, 2)}

export const skills = ${JSON.stringify(this.getSkills(), null, 2)}

export const lastUpdated = "${new Date().toISOString()}"
`
    
    await fs.writeFile(
      path.join(this.dataDir, 'opportunities.ts'),
      tsContent
    )
    
    // Generate summary stats
    const stats = {
      totalOpportunities: this.opportunities.length,
      categoryCounts: this.getCategoryCounts(),
      locationCounts: this.getLocationCounts(),
      lastUpdated: new Date().toISOString()
    }
    
    await fs.writeFile(
      path.join(this.dataDir, 'stats.json'),
      JSON.stringify(stats, null, 2)
    )
    
    console.log('✅ Static files generated successfully!')
  }

  getCategories() {
    return [...new Set(this.opportunities.map(opp => opp.category))].sort()
  }

  getLocations() {
    return [...new Set(this.opportunities.map(opp => `${opp.location.city}, ${opp.location.state}`))].sort()
  }

  getSkills() {
    const allSkills = this.opportunities.flatMap(opp => opp.skills)
    return [...new Set(allSkills)].sort()
  }

  getCategoryCounts() {
    const counts = {}
    this.opportunities.forEach(opp => {
      counts[opp.category] = (counts[opp.category] || 0) + 1
    })
    return counts
  }

  getLocationCounts() {
    const counts = {}
    this.opportunities.forEach(opp => {
      const location = `${opp.location.city}, ${opp.location.state}`
      counts[location] = (counts[location] || 0) + 1
    })
    return counts
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Run the scraper if this file is executed directly
if (require.main === module) {
  const generator = new StaticDataGenerator()
  generator.scrapeAllSources()
}

module.exports = StaticDataGenerator
