# Supabase Database Setup Guide

## 🚀 Quick Setup for Real Cloud Database

### 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with GitHub/Google

### 2. Create New Project
1. Click "New Project"
2. Choose organization
3. Set project name: `portfolio`
4. Set database password (save it!)
5. Choose region closest to you
6. Click "Create new project"

### 3. Get Your Credentials
1. In your project dashboard, go to Settings → API
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxxxxx.supabase.co`)
   - **anon public** API key

### 4. Update Supabase Configuration
Edit `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL' // Replace with your URL
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY' // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 5. Create Database Table
1. In Supabase dashboard, go to **Table Editor**
2. Click "Create a new table"
3. Set table name: `projects`
4. Add these columns:

| Column | Type | Required | Default |
|--------|------|----------|---------|
| id | int8 | ✅ | Auto increment |
| name | text | ✅ | |
| problem_statement | text | ✅ | |
| tech_stack | text | ✅ | |
| image_url | text | ✅ | |
| live_url | text | ❌ | |
| github_url | text | ✅ | |
| project_type | text | ✅ | |
| order_index | int8 | ✅ | |
| created_at | timestamptz | ❌ | now() |
| updated_at | timestamptz | ❌ | now() |

5. For `project_type`, set **Check constraint**: `project_type IN ('web', 'mobile')`
6. Click **Save**

### 6. Insert Sample Data
Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO projects (name, problem_statement, tech_stack, image_url, live_url, github_url, project_type, order_index) VALUES
('E-Commerce Platform', 'A modern e-commerce platform with real-time inventory management and secure payment processing.', 'React, Node.js, MongoDB, Stripe', '/uploads/project1.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/ecommerce-platform', 'web', 1),
('Task Management App', 'Collaborative task management application with real-time updates and team collaboration features.', 'Vue.js, Express, PostgreSQL, Socket.io', '/uploads/project2.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/task-management-app', 'web', 2),
('Weather Dashboard', 'Interactive weather dashboard with detailed forecasts, maps, and severe weather alerts.', 'React, TypeScript, OpenWeather API, Chart.js', '/uploads/project3.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/weather-dashboard', 'web', 3),
('Social Media Analytics', 'Comprehensive analytics platform for social media performance tracking and insights.', 'Angular, Python, Django, Redis', '/uploads/project4.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/social-media-analytics', 'web', 4),
('Video Streaming Platform', 'Scalable video streaming service with adaptive bitrate and content recommendations.', 'Next.js, AWS, FFmpeg, WebRTC', '/uploads/project5.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/video-streaming-platform', 'web', 5),
('Fitness Tracker', 'Mobile fitness tracking app with workout planning, progress monitoring, and social features.', 'React Native, Firebase, Redux, Node.js', '/uploads/project6.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/fitness-tracker', 'mobile', 6),
('Food Delivery App', 'On-demand food delivery app with real-time tracking, restaurant listings, and payment integration.', 'Flutter, Django, PostgreSQL, Google Maps API', '/uploads/project7.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/food-delivery-app', 'mobile', 7),
('Expense Manager', 'Personal finance management app with expense tracking, budget planning, and analytics.', 'React Native, Express, MongoDB, Chart.js', '/uploads/project8.jpg', 'https://example.com', 'https://github.com/YOUR_USERNAME/expense-manager', 'mobile', 8);
```

### 7. Replace YOUR_USERNAME
In the SQL above, replace `YOUR_USERNAME` with your actual GitHub username.

### 8. Test It!
1. Run your React app: `npm run dev`
2. Check browser console for any errors
3. Your projects should now load from Supabase!

## ✅ Benefits of Supabase
- **Real cloud database** (no local setup needed)
- **Free tier** for small projects
- **Easy to use** web interface
- **Real-time updates** (if needed later)
- **Built-in authentication** (for future features)

## 🔧 How It Works
- Frontend connects directly to Supabase
- Falls back to mock data if Supabase fails
- Projects are separated by `project_type` field
- Mobile apps show in phone frames, web apps in cards

That's it! You now have a real cloud database for your portfolio! 🎉
