# LocalDeals - Getting Started Guide

Welcome to LocalDeals! This guide will help you set up the entire platform locally and deploy to production.

## Project Overview

LocalDeals is a hyperlocal advertising platform connecting small businesses with nearby consumers through a mobile-first experience.

**Platform Components:**
- 🏢 **Business App** (iOS + Android) - Create & manage promotional flyers
- 👥 **Consumer App** (iOS + Android) - Discover deals and local businesses
- 📊 **Admin Dashboard** (Web) - Manage platform, approve businesses, moderate content
- ⚙️ **Backend API** (Node.js/NestJS) - Core API powering all apps
- 🗄️ **Databases** (PostgreSQL + PostGIS) - User, business, and deal data

## Quick Start (Development)

### Prerequisites
- Node.js 18+
- Xcode 15+ (for iOS)
- Android Studio (for Android)
- PostgreSQL 13+
- Git

### 1. Clone & Setup
```bash
git clone https://github.com/emperorsrujal-wq/localdeals.git
cd localdeals
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

Backend will run on `http://localhost:3000`

### 3. Admin Dashboard
```bash
cd apps/admin-dashboard
cp .env.example .env.local
# Edit .env.local with your configuration
npm install
npm run dev
```

Dashboard will run on `http://localhost:3000`

### 4. iOS Apps

**Business App:**
```bash
cd apps/business-app-ios
# Open LocalDeals.xcodeproj in Xcode
# Configure signing & capabilities
# Run on simulator or device
```

**Consumer App:**
```bash
cd apps/consumer-app-ios
# Same setup as business app
```

### 5. Android Apps

**Business App:**
```bash
cd apps/business-app-android
./gradlew assembleDebug
# Install on emulator/device
adb install app/build/outputs/apk/debug/app-debug.apk
```

**Consumer App:**
```bash
cd apps/consumer-app-android
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk
```

## Project Structure

```
localdeals/
├── apps/
│   ├── business-app-ios/        # iOS Business App (Swift/SwiftUI)
│   ├── business-app-android/    # Android Business App (Kotlin/Compose)
│   ├── consumer-app-ios/        # iOS Consumer App (Swift/SwiftUI)
│   ├── consumer-app-android/    # Android Consumer App (Kotlin/Compose)
│   └── admin-dashboard/         # Web Admin Panel (Next.js/React)
├── backend/                     # Node.js/NestJS API
├── docs/                        # Documentation
│   ├── FIREBASE_SETUP.md        # Firebase configuration
│   └── DEPLOYMENT.md            # Deployment instructions
└── README.md                    # Project overview
```

## Configuration

### Firebase Setup
1. Follow [Firebase Setup Guide](docs/FIREBASE_SETUP.md)
2. Download service account key
3. Add Firebase credentials to backend `.env`
4. Download GoogleService-Info.plist (iOS)
5. Download google-services.json (Android)

### Database Setup
```bash
# Create PostgreSQL databases
createdb localdeals_dev
createdb localdeals_prod

# Run migrations
cd backend
npm run typeorm migration:run -- -d src/database/data-source.ts
```

### Environment Variables

**Backend** (`backend/.env`):
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=localdeals_dev
JWT_SECRET=your-secret-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-email@iam.gserviceaccount.com
```

**Admin Dashboard** (`apps/admin-dashboard/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret
```

## Development Workflow

### Creating a Feature

1. **Create feature branch**
```bash
git checkout -b feature/feature-name
```

2. **Make changes**
   - Update relevant apps
   - Follow code style guidelines
   - Add tests

3. **Test locally**
   - Run backend tests: `npm run test`
   - Test on iOS/Android simulators
   - Verify admin dashboard

4. **Commit & Push**
```bash
git add .
git commit -m "feat: add new feature description"
git push origin feature/feature-name
```

5. **Create Pull Request**
   - Request review
   - Ensure CI passes
   - Merge after approval

### Testing

```bash
# Backend tests
cd backend
npm run test

# E2E tests (when added)
npm run test:e2e
```

## Common Tasks

### Running Backend
```bash
cd backend
npm run dev              # Development
npm run build && npm start  # Production
```

### Building Mobile Apps

**iOS:**
```bash
cd apps/business-app-ios
# In Xcode: Product → Build (⌘B)
# For release: Product → Build For → Running (⌘R)
```

**Android:**
```bash
cd apps/business-app-android
./gradlew assembleDebug    # Debug APK
./gradlew bundleRelease    # Release AAB
```

### Viewing Logs

**Backend:**
```bash
# In production (Cloud Run)
gcloud logging read "resource.type=cloud_run_instance" --limit 50
```

**Mobile Apps:**
- iOS: Xcode → Device Console
- Android: Android Studio → Logcat

## Troubleshooting

### Backend won't start
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port 3000 isn't in use
lsof -i :3000
```

### iOS build fails
```bash
# Update pods
cd apps/business-app-ios
pod repo update
pod install

# Clean build
xcodebuild clean -workspace LocalDeals.xcworkspace -scheme LocalDeals
```

### Android build fails
```bash
cd apps/business-app-android
./gradlew clean
./gradlew assembleDebug
```

### Firebase not connecting
- Verify GoogleService-Info.plist (iOS) or google-services.json (Android) is in correct location
- Check Firebase rules in console
- Verify authentication method is enabled in Firebase console

## Deployment

### Stage 1: Backend
Follow [Deployment Guide](docs/DEPLOYMENT.md#1-backend-deployment-cloud-run)

### Stage 2: Databases
Set up Cloud SQL instance and run migrations

### Stage 3: Mobile Apps
- **iOS**: Build and upload to TestFlight via Xcode
- **Android**: Build AAB and upload to Google Play Console

### Stage 4: Admin Dashboard
Deploy to Firebase Hosting or Vercel

## Monitoring

### Health Checks

```bash
# Backend health
curl http://localhost:3000/api/v1/health

# Database
psql -U postgres -c "SELECT 1"

# API endpoints
curl http://localhost:3000/api/v1/deals?lat=40.7128&lng=-74.0060&radius=5
```

## Support & Documentation

- **API Docs**: [Backend README](backend/README.md)
- **Firebase**: [Firebase Setup](docs/FIREBASE_SETUP.md)
- **Deployment**: [Deployment Guide](docs/DEPLOYMENT.md)
- **iOS**: [iOS App README](apps/business-app-ios/README.md)
- **Android**: [Android App README](apps/business-app-android/README.md)
- **Admin**: [Admin Dashboard README](apps/admin-dashboard/README.md)

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Team

**Developers**: [Your Team]
**Deployed**: Firebase, Google Cloud
**Last Updated**: March 14, 2026

## Status

✅ All platforms initialized and configured
🚀 Ready for development
📦 Backend & Frontend frameworks set up
🔐 Firebase & authentication configured

---

**Quick Links:**
- [GitHub Repository](https://github.com/emperorsrujal-wq/localdeals)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Google Play Console](https://play.google.com/console/)
