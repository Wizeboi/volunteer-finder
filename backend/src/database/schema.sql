-- Enable PostGIS extension for location data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(50),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Opportunity categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Volunteer opportunities
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    
    -- Location information
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'United States',
    location GEOGRAPHY(POINT, 4326), -- PostGIS geography type
    is_remote BOOLEAN DEFAULT FALSE,
    
    -- Requirements and details
    requirements TEXT,
    age_min INTEGER,
    age_max INTEGER,
    time_commitment VARCHAR(100), -- 'one-time', 'weekly', 'monthly', 'flexible'
    hours_per_week INTEGER,
    start_date DATE,
    end_date DATE,
    application_deadline DATE,
    
    -- Contact and application
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    application_url VARCHAR(1000),
    application_instructions TEXT,
    
    -- Metadata
    source_website VARCHAR(255),
    source_url VARCHAR(1000),
    scraped_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for opportunity skills
CREATE TABLE opportunity_skills (
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (opportunity_id, skill_id)
);

-- Users table (for future user accounts)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    school VARCHAR(255),
    grade_level VARCHAR(20),
    
    -- User location
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    location GEOGRAPHY(POINT, 4326),
    
    -- Preferences
    max_distance_miles INTEGER DEFAULT 25,
    available_hours_per_week INTEGER,
    preferred_days JSONB, -- Array of preferred days of week
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User interests (many-to-many with categories)
CREATE TABLE user_interests (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, category_id)
);

-- User skills (many-to-many with skills)
CREATE TABLE user_skills (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
    PRIMARY KEY (user_id, skill_id)
);

-- Saved opportunities
CREATE TABLE saved_opportunities (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, opportunity_id)
);

-- Applications tracking
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'applied', -- applied, accepted, rejected, completed
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    hours_completed INTEGER DEFAULT 0,
    notes TEXT
);

-- Indexes for performance
CREATE INDEX idx_opportunities_location ON opportunities USING GIST(location);
CREATE INDEX idx_opportunities_category ON opportunities(category_id);
CREATE INDEX idx_opportunities_organization ON opportunities(organization_id);
CREATE INDEX idx_opportunities_active ON opportunities(is_active);
CREATE INDEX idx_opportunities_dates ON opportunities(start_date, end_date);
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Insert initial categories
INSERT INTO categories (name, description, icon) VALUES
('Education & Tutoring', 'Help students learn and succeed academically', 'book'),
('Environment & Conservation', 'Protect and preserve our natural environment', 'leaf'),
('Community Development', 'Strengthen and improve local communities', 'users'),
('Healthcare & Wellness', 'Support health and wellbeing initiatives', 'heart'),
('Animal Welfare', 'Care for and protect animals', 'paw'),
('Arts & Culture', 'Promote creativity and cultural awareness', 'palette'),
('Technology & Innovation', 'Use tech skills to solve problems', 'computer'),
('Senior Services', 'Support and assist elderly community members', 'user-check'),
('Youth Development', 'Mentor and guide younger students', 'smile'),
('Food & Nutrition', 'Address hunger and promote healthy eating', 'utensils');

-- Insert initial skills
INSERT INTO skills (name, category) VALUES
('Tutoring', 'Education'),
('Public Speaking', 'Communication'),
('Web Development', 'Technology'),
('Graphic Design', 'Creative'),
('Data Entry', 'Administrative'),
('Photography', 'Creative'),
('Writing', 'Communication'),
('Event Planning', 'Organizational'),
('Social Media', 'Technology'),
('Foreign Languages', 'Communication'),
('Music', 'Creative'),
('Sports Coaching', 'Physical'),
('Fundraising', 'Organizational'),
('Research', 'Analytical'),
('Customer Service', 'Communication');
