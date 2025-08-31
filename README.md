# Volunteer Finder

A web application that aggregates volunteer opportunities for high school students by scraping various volunteer websites and providing intelligent filtering capabilities.

## Project Structure

```
volunteer-finder/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── database/          # Database schema and migrations
├── docs/              # Documentation
└── scripts/           # Utility scripts
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd volunteer-finder
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Setup environment variables:
```bash
# Copy example environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. Setup database:
```bash
# Create PostgreSQL database
createdb volunteer_finder

# Run migrations
cd backend
npm run migrate
```

5. Start development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Development

See the [PROJECT_PLAN.md](PROJECT_PLAN.md) for detailed implementation roadmap and progress tracking.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Scraping**: Puppeteer, Cheerio
- **Maps**: Google Maps API
- **Deployment**: Vercel (Frontend), Railway (Backend)

## Contributing

1. Check the progress tracking in [PROJECT_PLAN.md](PROJECT_PLAN.md)
2. Pick an unassigned task from the current phase
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
