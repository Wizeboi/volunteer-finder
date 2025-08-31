# Volunteer Finder - Static Website

A fast, static website that helps high school students find volunteer opportunities. Built with Next.js and automatically updated with fresh data.

## 🌟 Features

### For Students:
- **Fast Search**: Instant client-side filtering
- **Smart Filters**: Location, category, skills, time commitment
- **Mobile Optimized**: Works perfectly on phones
- **Always Updated**: Fresh data scraped daily
- **No Registration**: Start searching immediately

### For Developers:
- **Zero Maintenance**: Static site, no servers
- **Free Hosting**: Deploy on Vercel for free
- **Auto Updates**: GitHub Actions scrape data daily
- **SEO Optimized**: Pre-rendered HTML pages
- **Performance**: Lightning fast loading

## 🚀 Quick Start

### Development
```bash
cd website
npm install
npm run dev
```

### Build Static Site
```bash
npm run scrape  # Generate data
npm run build   # Build static site
npm run export  # Export for deployment
```

### Deploy to Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploys on every push
4. GitHub Actions update data daily

## 📊 Data Sources

The site automatically scrapes volunteer opportunities from:
- VolunteerMatch.org
- JustServe.org
- Idealist.org (planned)
- Local community organizations (planned)

## 🏗️ Architecture

### Build-Time Data Generation
```
GitHub Actions (Daily) → Scrape Websites → Generate JSON → Commit Data → Vercel Deploy
```

### Client-Side Features
- **Search**: Real-time text search
- **Filters**: Location, category, skills, time
- **Responsive**: Mobile-first design
- **Fast**: Pre-generated static pages

### No Backend Required
- Data stored as static JSON files
- Client-side JavaScript handles filtering
- CDN delivery for global performance
- No database or server costs

## 🔧 Configuration

### Environment Variables (Optional)
```bash
# For enhanced scraping (not required for basic functionality)
GOOGLE_MAPS_API_KEY=your_key_here
```

### Automatic Updates
The site updates automatically via GitHub Actions:
- Runs daily at 6 AM UTC
- Scrapes fresh volunteer data
- Commits new data to repository
- Triggers Vercel redeploy

## 📁 Project Structure

```
website/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── types/           # TypeScript types
│   └── data/            # Generated data files (git ignored)
├── scripts/
│   └── scrape-data.js   # Build-time scraping
├── .github/workflows/   # GitHub Actions
└── public/              # Static assets
```

## 🚀 Deployment Options

### Vercel (Recommended)
- Connect GitHub repository
- Automatic deployments
- Free for personal projects
- Built-in CDN and optimization

### Netlify
- Drag & drop `out/` folder
- Or connect GitHub repository
- Free tier available

### GitHub Pages
- Push `out/` folder to `gh-pages` branch
- Enable GitHub Pages in repository settings

### Any Static Host
- Build site: `npm run build && npm run export`
- Upload `out/` folder to any web host

## 🎯 Benefits Over Web Application

### Cost Savings
- **$0/month hosting** (vs $10-50/month for servers)
- **No database costs** (vs $25-100/month)
- **No monitoring fees** (vs $20-50/month)

### Performance
- **Instant loading** (pre-generated pages)
- **Works offline** (cached content)
- **Global CDN** (fast worldwide)

### Maintenance
- **Zero server maintenance**
- **Automatic security updates**
- **No database management**
- **Self-healing deployments**

## 📈 Analytics & Monitoring

### Built-in Features
- Real-time error tracking
- Performance monitoring
- Deployment status
- Traffic analytics (via Vercel)

### Optional Integrations
- Google Analytics
- Plausible (privacy-focused)
- Hotjar for user behavior

## 🔄 Data Update Process

1. **Daily Automation**: GitHub Actions runs scraping script
2. **Data Generation**: Creates fresh JSON files
3. **Git Commit**: Commits new data to repository
4. **Auto Deploy**: Vercel detects changes and redeploys
5. **Cache Invalidation**: Users get fresh data within minutes

## 🛠️ Customization

### Add New Data Sources
1. Create scraper in `scripts/scrape-data.js`
2. Add to `scrapeAllSources()` method
3. Deploy - automatic updates begin

### Modify Filters
1. Update `FilterSidebar.tsx` component
2. Add filter logic in main page
3. Deploy changes

### Styling Changes
1. Modify Tailwind classes
2. Update `tailwind.config.ts` for custom colors
3. Changes apply immediately

This static approach gives you all the benefits of a dynamic application with the simplicity, speed, and cost-effectiveness of a static website!
