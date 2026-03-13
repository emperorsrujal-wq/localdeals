# Deployment Guide - LocalDeals

Complete deployment strategy for all LocalDeals applications.

## Overview

- **Backend**: Firebase Cloud Run / AWS EC2
- **Mobile Apps**: App Store & Google Play Store
- **Admin Dashboard**: Firebase Hosting / Vercel
- **Databases**: Cloud SQL (PostgreSQL) / Firebase Realtime DB
- **Storage**: Google Cloud Storage / AWS S3
- **CI/CD**: GitHub Actions / Cloud Build

## 1. Backend Deployment (Cloud Run)

### Prerequisites
- Docker installed locally
- Google Cloud Project with Cloud Run enabled
- GitHub repository connected

### Steps

**1. Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**2. Deploy to Cloud Run**
```bash
# Configure gcloud
gcloud auth login
gcloud config set project localdeals-prod

# Build and deploy
gcloud run deploy localdeals-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --timeout 3600 \
  --set-env-vars FIREBASE_PROJECT_ID=localdeals-prod
```

**3. Setup CI/CD with GitHub Actions**
Create `.github/workflows/deploy-backend.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'
      - '.github/workflows/deploy-backend.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          project_id: ${{ secrets.GCP_PROJECT_ID }}
          service_account_key: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}
          export_default_credentials: true

      - name: Build and Deploy
        run: |
          cd backend
          gcloud run deploy localdeals-api \
            --source . \
            --region us-central1 \
            --allow-unauthenticated
```

## 2. Database Setup (Cloud SQL)

### PostgreSQL on Cloud SQL

```bash
# Create instance
gcloud sql instances create localdeals-db \
  --database-version POSTGRES_15 \
  --region us-central1 \
  --tier db-f1-micro

# Create database
gcloud sql databases create localdeals_prod \
  --instance localdeals-db

# Create user
gcloud sql users create postgres \
  --instance localdeals-db \
  --password [YOUR_PASSWORD]

# Get connection string for .env
gcloud sql instances describe localdeals-db
```

### Run Migrations
```bash
# From local machine
npm run migrate -- --env production

# Or from Cloud Run (via backup)
npm run seed -- --prod
```

## 3. iOS Deployment (App Store)

### Prerequisites
- Apple Developer Account
- TestFlight access
- Signing certificate & provisioning profile

### Build for Production
```bash
cd apps/business-app-ios

# Archive
xcodebuild \
  -workspace LocalDeals.xcworkspace \
  -scheme LocalDeals \
  -configuration Release \
  -archivePath build/LocalDeals.xcarchive \
  archive

# Export
xcodebuild \
  -exportArchive \
  -archivePath build/LocalDeals.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/
```

### Upload to TestFlight
1. Open Xcode Organizer → Archives
2. Select latest archive
3. Click "Distribute App"
4. Select "App Store Connect"
5. Follow wizard to upload

### Release to App Store
1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select app → Builds
3. Review build
4. Click "Add to Review"
5. Submit for review
6. Once approved, release to users

## 4. Android Deployment (Google Play)

### Prerequisites
- Google Play Developer Account
- Signed APK/AAB
- App privacy policy URL

### Build for Production
```bash
cd apps/business-app-android

# Build AAB (recommended)
./gradlew bundleRelease

# Sign with keystore
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore localdeals.keystore \
  app/build/outputs/bundle/release/app-release.aab \
  localdeals-key
```

### Upload to Google Play
1. Go to [Google Play Console](https://play.google.com/console/)
2. Select app → Release → Production
3. Create new release
4. Upload AAB file
5. Review release notes
6. Submit for review

### Release Strategy
- **Staged rollout**: Start with 5%, increase gradually
- **Monitor crashes** in Play Console
- **Watch user reviews** for feedback

## 5. Admin Dashboard Deployment (Firebase Hosting)

### Option A: Firebase Hosting
```bash
cd apps/admin-dashboard

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

### Option B: Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configure in Vercel dashboard:
- Environment variables
- Auto-deploy on push to main

## 6. Monitoring & Analytics

### Backend Monitoring
- **Cloud Logging**: View logs in Google Cloud Console
- **Cloud Trace**: Monitor performance
- **Alerts**: Set up email alerts for errors

```bash
# Create alert for high error rate
gcloud alpha monitoring policies create \
  --notification-channels=[CHANNEL_ID] \
  --display-name="API Error Rate High" \
  --condition-display-name="Error rate > 5%" \
  --condition-threshold-value=0.05
```

### Mobile App Analytics
- **Firebase Analytics**: Track user behavior
- **Crashlytics**: Monitor crashes
- **Performance**: Track app performance

### Database Monitoring
```bash
# Monitor Cloud SQL
gcloud sql operations list --instance localdeals-db

# View replication status
gcloud sql instances describe localdeals-db --format="value(replicaInstances)"
```

## 7. Backup Strategy

### Database Backups
```bash
# Automatic backups (enabled by default)
# Retain last 7 backups

# Manual backup
gcloud sql backups create \
  --instance localdeals-db

# Restore from backup
gcloud sql backups restore BACKUP_ID \
  --backup-instance localdeals-db \
  --backup-configuration [CONFIG_ID]
```

### Storage Backups
- Enable versioning on Cloud Storage buckets
- Set up lifecycle policies to archive old versions
- Regular export of Firestore data

## 8. Performance Optimization

### Backend
```bash
# Enable gzip compression in Node.js
# Already configured in NestJS

# Monitor response times
gcloud trace list --filter="latency > 1000"
```

### Database
- Index frequently queried columns
- Archive old data
- Use connection pooling

### Front-end
- Enable caching headers
- Compress images
- Use CDN (Firebase Hosting/Vercel does this automatically)

## 9. Security Checklist

- [ ] All .env variables are secrets in CI/CD
- [ ] Database backups enabled
- [ ] SSL/TLS enabled (automatic with Cloud Run)
- [ ] Firewall rules configured
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] Authentication tokens rotated
- [ ] Monitoring and alerts set up
- [ ] Incident response plan created
- [ ] Regular security audits scheduled

## 10. Post-Deployment

### Verify Deployments
```bash
# Backend
curl https://localdeals-api.cloudfun.net/api/v1/health

# Admin Dashboard
open https://admin.localdeals.app

# Check logs
gcloud logging read "resource.type=cloud_run_instance" --limit 50
```

### Monitor Key Metrics
- API response time
- Error rate (< 1%)
- Database connections
- Storage usage
- User acquisition rate

## 11. Rollback Procedure

### Cloud Run
```bash
# View previous revisions
gcloud run revisions list --service localdeals-api

# Rollback to previous version
gcloud run services update-traffic localdeals-api \
  --to-revisions PREVIOUS_REVISION_ID=100
```

### Firebase Hosting
```bash
# View deploy history
firebase hosting:channel:list

# Rollback
firebase hosting:channel:delete [CHANNEL_ID]
```

## 12. Cost Optimization

- **Cloud Run**: Use memory autoscaling
- **Cloud SQL**: Use shared-core tier for dev
- **Storage**: Archive old data after 90 days
- **Bandwidth**: Use Cloud CDN
- **Monitoring**: Use standard rates (free tier available)

## Status Dashboard

Create monitoring dashboard at:
```
https://console.cloud.google.com/monitoring/dashboards/create
```

Monitor:
- Error rate
- Latency (p50, p95, p99)
- Requests per second
- Database connection pool
- Storage usage
- Cost tracking

## Emergency Contacts

- GCP Support: (configured in GCP Console)
- Status Page: (to be set up)
- Incident Channel: (Slack/Discord)

---

**Last Updated**: 2026-03-14
**Maintenance Window**: Saturdays 2-4 AM UTC
