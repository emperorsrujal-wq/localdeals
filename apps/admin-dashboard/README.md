# LocalDeals Admin Dashboard

React/Next.js web application for platform administration, business approvals, content moderation, and analytics.

## Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **UI Framework**: React 18+
- **Styling**: Tailwind CSS
- **State**: Redux Toolkit or Zustand
- **Tables**: TanStack Table (React Table)
- **Charts**: Chart.js or Recharts
- **Auth**: NextAuth.js

## Features

### 1. Dashboard Overview
- KPI cards (users, businesses, ads, revenue)
- Growth charts (users, revenue trends)
- Category performance (pie charts)
- Geographic distribution (heatmap)
- Recent activity feed

### 2. Business Management
- Pending approval queue with business details
- Approve/reject with reason
- View all businesses with filters
- Suspend/ban businesses
- Edit business details

### 3. Content Moderation
- AI-flagged content queue
- Manual review workflow
- Approve/reject/edit actions
- Bulk moderation tools
- Policy rule configuration

### 4. User Management
- View all consumers with activity
- Handle account issues
- View user reports and feedback
- Ban/suspend users
- Account recovery requests

### 5. Revenue & Subscriptions
- MRR, ARR, churn rate metrics
- Subscription status tracking
- Coupon code management
- Payout reports
- Revenue forecasting

### 6. Analytics & Reports
- User acquisition funnel
- Business acquisition funnel
- Geographic expansion reports
- Category performance analysis
- Exportable CSV/PDF reports

### 7. System Configuration
- Template management
- Category management
- Pricing configuration
- Push notification broadcaster
- Feature flags

## Project Structure

```
admin-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── businesses/
│   │   ├── moderation/
│   │   ├── users/
│   │   ├── revenue/
│   │   └── analytics/
│   └── api/
│       └── [...routes].ts
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── tables/
│   ├── charts/
│   └── forms/
├── lib/
│   ├── api-client.ts
│   ├── auth.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── public/
└── [config files]
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

### Configuration

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## Dependencies

Core:
- next
- react
- typescript
- tailwindcss
- next-auth
- axios or fetch

UI & Tables:
- @tanstack/react-table
- recharts
- shadcn/ui

State:
- zustand (lightweight)
- @reduxjs/toolkit (if using Redux)

## Features By Dashboard Section

### Dashboard
- Real-time KPI metrics
- 30-day growth chart
- Revenue trend analysis
- Category breakdown
- Recent sign-ups feed

### Businesses
- Searchable/filterable queue
- Batch approve/reject
- Document preview
- Verification email history
- Subscription tier assignment

### Content Moderation
- AI flag reasons displayed
- Confidence score
- Reported by users view
- Similar content detection
- Bulk actions

### Users
- Segmentation by type
- Engagement metrics
- Report details
- Warning history
- Ban duration settings

### Revenue
- Subscription lifecycle charts
- Churn analysis
- Revenue forecasting
- Tax reports
- Payout scheduling

### Analytics
- Funnel visualization
- Retention cohorts
- Geographic heat maps
- Growth attribution
- Export capabilities

## Development

```bash
# Development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Production
npm start
```

## Status

🚀 Project structure initialized - UI components in development
