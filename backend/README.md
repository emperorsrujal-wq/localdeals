# LocalDeals Backend API

Node.js/NestJS-based REST API for the LocalDeals platform.

## Tech Stack

- **Framework**: NestJS 10+
- **Language**: TypeScript
- **Database**: PostgreSQL with PostGIS
- **Cache**: Redis (planned)
- **Authentication**: Firebase Auth + JWT
- **Storage**: AWS S3 (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

### Running the Application

**Development**:
```bash
npm run dev
```

**Production Build**:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user/business
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/verify-otp` - Verify OTP
- `POST /api/v1/auth/refresh` - Refresh token

### Businesses
- `POST /api/v1/business/profile` - Create/update profile
- `POST /api/v1/business/verify` - Submit verification docs
- `GET /api/v1/business/profile` - Get business profile

### Flyers/Deals
- `POST /api/v1/flyers` - Create flyer
- `GET /api/v1/flyers/my` - Get business flyers
- `GET /api/v1/flyers/:id` - Get flyer details
- `GET /api/v1/flyers/:id/analytics` - Get analytics
- `PUT /api/v1/flyers/:id` - Update flyer
- `DELETE /api/v1/flyers/:id` - Delete flyer

### Consumer
- `GET /api/v1/deals?lat=&lng=&radius=&category=` - Get nearby deals
- `GET /api/v1/deals/map` - Get deals for map
- `GET /api/v1/deals/scan` - Area scanner
- `GET /api/v1/search?q=` - Search deals

### Admin
- `GET /api/v1/admin/businesses/pending` - Pending approvals
- `PUT /api/v1/admin/businesses/:id/approve` - Approve business
- `GET /api/v1/admin/content/flagged` - Flagged content
- `GET /api/v1/admin/analytics` - Analytics dashboard

## Database Schema

Core entities:
- `users` - Consumer & business owner accounts
- `businesses` - Business profiles
- `flyers` - Deals/advertisements
- `categories` - Deal categories
- `templates` - Flyer templates
- `subscriptions` - Business subscriptions

## Project Structure

```
src/
├── modules/
│   ├── auth/          # Authentication
│   ├── users/         # User management
│   ├── businesses/    # Business profiles
│   ├── flyers/        # Flyer management
│   ├── deals/         # Deal discovery
│   ├── admin/         # Admin features
│   └── templates/     # Template management
├── common/            # Shared utilities
├── config/            # Configuration
├── database/          # Database setup
├── guards/            # Auth guards
└── decorators/        # Custom decorators
```

## Testing

```bash
npm run test
npm run test:watch
```

## Linting

```bash
npm run lint
```

## Deployment

Configured for deployment to:
- Firebase Cloud Run
- AWS EC2/ECS
- Heroku
- DigitalOcean

## Status

🚀 Core setup complete - Implementing modules
