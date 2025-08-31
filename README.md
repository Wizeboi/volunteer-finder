# Volunteer Finder - Static Website

A fast, static website that helps high school students find volunteer opportunities. Built with Next.js and automatically updated with fresh data daily.

## 🌟 What This Is

A **production-ready static website** that:
- ✅ **Costs $0/month** to run and maintain
- ✅ **Updates automatically** with fresh volunteer data daily  
- ✅ **Requires zero maintenance** - completely hands-off
- ✅ **Professional quality** - fast, mobile-optimized, SEO-friendly
- ✅ **Ready to deploy** in 5 minutes

## 📁 Project Structure

```
volunteer-finder/
├── website/           # 🎯 Complete Next.js static website
│   ├── src/app/      # Main website pages
│   ├── src/components/ # UI components  
│   ├── scripts/      # Build-time data scraping
│   └── .github/      # Automatic daily updates
├── frontend/          # 📦 Legacy React app (not needed)
├── backend/           # 📦 Legacy backend (not needed)
└── docs/             # 📖 Documentation
```

## 🚀 Quick Deploy (5 Minutes)

### Option 1: Vercel (Recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → "New Project"
3. Import your repository
4. Set root directory to `website/`
5. Deploy! 🎉

### Option 2: Local Preview
```bash
cd website
npm install
npm run dev
# Visit http://localhost:3000
```

## 🔄 How It Works

1. **Daily at 6 AM UTC**: GitHub Actions automatically scrape volunteer websites
2. **Fresh Data Generated**: Creates JSON files with latest opportunities  
3. **Auto-Deployment**: Website rebuilds and deploys with new data
4. **Students Get Fresh Opportunities**: Zero maintenance required

## 🎯 Perfect For

- **Students**: Finding volunteer opportunities for college applications
- **Developers**: Learning modern web development with real impact
- **Organizations**: Cost-effective way to help students find volunteer work

## 📊 Tech Stack

- **Framework**: Next.js (Static Site Generation)
- **Styling**: Tailwind CSS  
- **Data**: Build-time scraped JSON
- **Deployment**: Vercel (free)
- **Updates**: GitHub Actions (automated)

## 📈 What Students Will See

- **Instant Search**: Real-time filtering of volunteer opportunities
- **Smart Filters**: Location, category, skills, time commitment
- **Mobile Perfect**: Responsive design for any device  
- **Direct Applications**: Links to apply at volunteer organizations
- **Always Fresh**: Updated daily with new opportunities

## 📖 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed deployment instructions
- **[website/README.md](website/README.md)** - Technical documentation
- **[PROJECT_PLAN.md](PROJECT_PLAN.md)** - Project overview and status

## 🎉 Ready to Launch!

Your volunteer finder website is **complete and ready for production**. No additional coding required - just deploy and help students find amazing volunteer opportunities!
