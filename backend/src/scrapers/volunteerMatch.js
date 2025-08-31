const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class VolunteerMatchScraper {
  constructor() {
    this.baseUrl = 'https://www.volunteermatch.org';
    this.searchUrl = 'https://www.volunteermatch.org/search';
  }

  async scrapeOpportunities(location = '', category = '', maxPages = 5) {
    console.log(`🔍 Starting VolunteerMatch scraping for location: ${location}`);
    
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      const opportunities = [];
      
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        console.log(`📄 Scraping page ${pageNum}...`);
        
        const searchParams = new URLSearchParams({
          l: location,
          c: category,
          p: pageNum
        });
        
        const url = `${this.searchUrl}?${searchParams}`;
        
        try {
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
          
          // Wait for results to load
          await page.waitForSelector('.searchItem, .no-results', { timeout: 10000 });
          
          const content = await page.content();
          const $ = cheerio.load(content);
          
          // Check if no results
          if ($('.no-results').length > 0) {
            console.log('No more results found');
            break;
          }
          
          // Extract opportunities from the page
          $('.searchItem').each((index, element) => {
            const opportunity = this.extractOpportunityData($, element);
            if (opportunity) {
              opportunities.push(opportunity);
            }
          });
          
          // Add delay between pages to be respectful
          await this.delay(2000);
          
        } catch (error) {
          console.error(`Error scraping page ${pageNum}:`, error.message);
          continue;
        }
      }
      
      console.log(`✅ Scraped ${opportunities.length} opportunities from VolunteerMatch`);
      return opportunities;
      
    } catch (error) {
      console.error('Error in VolunteerMatch scraper:', error);
      return [];
    } finally {
      await browser.close();
    }
  }

  extractOpportunityData($, element) {
    try {
      const $elem = $(element);
      
      // Extract basic information
      const title = $elem.find('.searchItemTitle a').text().trim();
      const organization = $elem.find('.searchItemOrg').text().trim();
      const description = $elem.find('.searchItemDesc').text().trim();
      const location = $elem.find('.searchItemLocation').text().trim();
      const detailUrl = $elem.find('.searchItemTitle a').attr('href');
      
      // Skip if missing essential data
      if (!title || !organization) {
        return null;
      }
      
      // Parse location
      const locationParts = location.split(',').map(part => part.trim());
      const city = locationParts[0] || '';
      const state = locationParts[1] || '';
      
      // Extract additional details if available
      const requirements = $elem.find('.searchItemReqs').text().trim();
      const timeCommitment = $elem.find('.searchItemTime').text().trim();
      
      const opportunity = {
        title,
        description,
        organization: {
          name: organization
        },
        location: {
          address: location,
          city,
          state,
          isRemote: location.toLowerCase().includes('remote') || location.toLowerCase().includes('virtual')
        },
        requirements,
        timeCommitment,
        applicationUrl: detailUrl ? `${this.baseUrl}${detailUrl}` : '',
        sourceWebsite: 'VolunteerMatch',
        sourceUrl: detailUrl ? `${this.baseUrl}${detailUrl}` : '',
        scrapedAt: new Date().toISOString()
      };
      
      return opportunity;
      
    } catch (error) {
      console.error('Error extracting opportunity data:', error);
      return null;
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to scrape detailed information from individual opportunity pages
  async scrapeOpportunityDetails(opportunityUrl) {
    const browser = await puppeteer.launch({ headless: true });
    
    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      await page.goto(opportunityUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      
      const content = await page.content();
      const $ = cheerio.load(content);
      
      // Extract detailed information
      const details = {
        fullDescription: $('.oppDescription').text().trim(),
        skills: $('.oppSkills li').map((i, el) => $(el).text().trim()).get(),
        schedule: $('.oppSchedule').text().trim(),
        contact: {
          email: $('.contactEmail').text().trim(),
          phone: $('.contactPhone').text().trim()
        },
        ageRequirements: $('.ageReqs').text().trim(),
        applicationDeadline: $('.deadline').text().trim()
      };
      
      return details;
      
    } catch (error) {
      console.error('Error scraping opportunity details:', error);
      return {};
    } finally {
      await browser.close();
    }
  }
}

module.exports = VolunteerMatchScraper;
