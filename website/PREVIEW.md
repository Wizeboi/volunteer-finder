# 🌐 Preview Your Volunteer Finder Website

## Quick Preview Options

### Option 1: Local Development Server (Recommended)

1. **Install Dependencies**:
   ```bash
   cd website
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Your Browser**:
   ```
   http://localhost:3000
   ```

### Option 2: Build and Preview Static Site

1. **Install and Build**:
   ```bash
   cd website
   npm install
   npm run build
   npm start
   ```

2. **View at**: `http://localhost:3000`

## What You'll See

### 🏠 **Homepage Features**
- **Beautiful Hero Section** with blue gradient background
- **Search Bar** that works in real-time
- **Filter Sidebar** with categories, location, skills
- **Opportunity Cards** showing 3 demo volunteer positions:
  - Community Garden Volunteer (Environment)
  - Youth Tutoring Program (Education) 
  - Animal Shelter Assistant (Animal Welfare)

### 📱 **Mobile-Responsive Design**
- Perfect layout on phones, tablets, and desktop
- Touch-friendly buttons and navigation
- Collapsible filters on mobile

### ⚡ **Interactive Features**
- **Real-time Search** - Type to filter opportunities instantly
- **Smart Filters** - Filter by location, category, time commitment, skills
- **Direct Applications** - Click "Apply Now" to visit opportunity pages
- **Responsive Cards** - Hover effects and clean layouts

### 🎨 **Design Elements**
- **Modern UI** with Tailwind CSS styling
- **Professional Color Scheme** - Blue primary, clean grays
- **Accessible Design** - Proper contrast and navigation
- **Fast Loading** - Optimized static assets

## Preview Screenshots

### Desktop View:
```
🤝 Volunteer Finder                    [Get Started]
=====================================
    Find Your Perfect Volunteer Opportunity
    
    [Search opportunities, organizations...] [Search]
    
┌─────────────────┐  ┌─────────────────────────────┐
│    Filters      │  │     Opportunity Cards       │
│                 │  │                             │
│ 📍 Location     │  │ 🌱 Community Garden         │
│ 📂 Category     │  │    Green Initiative         │
│ ⏰ Time         │  │    Springfield, IL          │
│ 🎯 Skills       │  │    [Apply Now]              │
│                 │  │                             │
└─────────────────┘  └─────────────────────────────┘
```

### Mobile View:
```
    🤝 Volunteer Finder
    ==================
    Find Perfect Opportunities
    
    [Search here...]
    [Show Filters ▼]
    
    ┌─────────────────────┐
    │ 🌱 Community Garden │
    │ Green Initiative    │
    │ Springfield, IL     │
    │ [Apply Now]         │
    └─────────────────────┘
```

## Live Demo Data

The preview includes 3 sample opportunities to show functionality:

1. **Community Garden Volunteer**
   - Category: Environment & Conservation
   - Skills: Gardening, Teaching, Physical Work
   - Time: Weekly commitment

2. **Youth Tutoring Program** 
   - Category: Education & Tutoring
   - Skills: Tutoring, Mentoring, Patience
   - Time: Weekly commitment

3. **Animal Shelter Assistant**
   - Category: Animal Welfare  
   - Skills: Animal Care, Physical Work, Compassion
   - Time: Flexible scheduling

## Testing the Features

### ✅ Search Functionality
- Type "garden" → Shows garden opportunity
- Type "tutor" → Shows tutoring opportunity
- Type "animal" → Shows shelter opportunity

### ✅ Filter Testing
- **Location**: Type "Springfield" → Shows local opportunities
- **Category**: Select "Education & Tutoring" → Shows tutoring
- **Skills**: Check "Animal Care" → Shows shelter opportunity

### ✅ Responsive Design
- Resize browser window to see mobile layout
- Test on phone/tablet for touch experience

## Production vs Preview

### In Preview (Development):
- Shows 3 demo opportunities
- Fast local development server
- Hot reloading for code changes

### In Production (After Deployment):
- Real scraped data from volunteer websites
- Hundreds of actual opportunities
- Daily automatic updates
- Global CDN delivery

## Next Steps After Preview

1. **Like what you see?** → Deploy to Vercel for free
2. **Want changes?** → Customize components and styling  
3. **Ready for real data?** → Enable scraping and deploy
4. **Share with others?** → Get your live URL and spread the word

Your volunteer finder website is ready to help students discover amazing opportunities! 🚀
