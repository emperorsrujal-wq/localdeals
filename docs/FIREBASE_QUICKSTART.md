# Firebase Connection - Quick Start

Complete step-by-step guide to connect LocalDeals to Firebase.

## Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Create a project"**
3. Enter project name: `localdeals` (or your choice)
4. Choose your country/region
5. Click **"Create project"**
6. Wait 1-2 minutes for project to initialize

## Step 2: Enable Firebase Services

### In Firebase Console:
1. Go to **Project Settings** (gear icon, top-left)
2. Go to **Service Accounts** tab
3. Click **"Generate New Private Key"**
4. Save the JSON file as: `backend/firebase-admin-key.json`

### Enable Authentication:
1. Go to **Authentication** (left menu)
2. Click **"Get Started"**
3. Enable these sign-in methods:
   - ✅ Email/Password
   - ✅ Phone Number
   - ✅ Google
   - ✅ Apple (for iOS)

### Enable Realtime Database:
1. Go to **Realtime Database** (left menu)
2. Click **"Create Database"**
3. Select **Production mode**
4. Choose region closest to you
5. Click **"Create"**
6. Copy the database URL (looks like: `https://localdeals-xxx.firebaseio.com`)

### Enable Cloud Storage:
1. Go to **Storage** (left menu)
2. Click **"Get Started"**
3. Choose **Production rules**
4. Select region
5. Click **"Create"**

## Step 3: Get Firebase Credentials

### For Backend:
1. Go to **Project Settings** → **Service Accounts**
2. Click **"Generate New Private Key"**
3. Save as `backend/firebase-admin-key.json`
4. Keep this file safe! 🔐

### For iOS Apps:
1. Go to **Project Settings**
2. Click **"Your apps"** section
3. Click **"Add app"** → Select **iOS**
4. Bundle ID: `com.localdeals.business` (or `com.localdeals.consumer`)
5. Download the plist file: `GoogleService-Info.plist`
6. Add to Xcode project

### For Android Apps:
1. Go to **Project Settings**
2. Click **"Your apps"** → **Add app** → **Android**
3. Package name: `com.localdeals.business` (or `com.localdeals.consumer`)
4. Download `google-services.json`
5. Place in `apps/business-app-android/app/`

### For Web Dashboard:
1. Go to **Project Settings**
2. Click **"Your apps"** → **Add app** → **Web**
3. Copy the Firebase config object

## Step 4: Configure Backend

### Update `backend/.env`:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=localdeals-xxxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...YOUR_KEY...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@localdeals-xxxx.iam.gserviceaccount.com

# Firebase Realtime Database
FIREBASE_DATABASE_URL=https://localdeals-xxxx.firebaseio.com

# Firebase Storage
FIREBASE_STORAGE_BUCKET=localdeals-xxxx.appspot.com

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=localdeals_dev

# JWT
JWT_SECRET=your-secret-key-here
```

### How to get FIREBASE_PRIVATE_KEY from JSON file:

1. Open `firebase-admin-key.json`
2. Find the `"private_key"` field
3. Copy the entire value (including `-----BEGIN...-----END-----`)
4. Replace newlines: `\n` stays as is
5. Paste into `.env` file with quotes around it

**Example:**
```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"
```

## Step 5: Configure iOS Apps

### For Business App (and Consumer App):

1. **Download GoogleService-Info.plist** from Firebase Console
2. **Add to Xcode:**
   - Open `apps/business-app-ios/LocalDeals.xcodeproj` in Xcode
   - Drag `GoogleService-Info.plist` into Xcode (check "Copy items")
   - Make sure it's in the project target

3. **Install Firebase pods:**
   ```bash
   cd apps/business-app-ios
   pod install
   ```

4. **Open workspace:**
   ```bash
   open LocalDeals.xcworkspace
   ```

5. **Enable Push Notifications:**
   - In Xcode: Select target → **Signing & Capabilities**
   - Click **"+ Capability"**
   - Add **"Push Notifications"**
   - Add **"Background Modes"** → Check "Remote notifications"

## Step 6: Configure Android Apps

### For Business App (and Consumer App):

1. **Download google-services.json** from Firebase Console

2. **Place in app directory:**
   ```
   apps/business-app-android/app/google-services.json
   ```

3. **Update build.gradle (Project level):**
   ```gradle
   plugins {
       id 'com.google.gms.google-services' version '4.3.15' apply false
   }
   ```

4. **Update build.gradle (App level):**
   ```gradle
   plugins {
       id 'com.google.gms.google-services'
   }

   dependencies {
       implementation platform('com.google.firebase:firebase-bom:32.2.3')
       implementation 'com.google.firebase:firebase-auth-ktx'
       implementation 'com.google.firebase:firebase-messaging-ktx'
       implementation 'com.google.firebase:firebase-storage-ktx'
   }
   ```

5. **Sync Gradle**

## Step 7: Configure Web Dashboard

### Update `apps/admin-dashboard/.env.local`:

```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=localdeals-xxxx
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localdeals-xxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456:web:abc123def456

NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
```

Get these values from Firebase Console → Project Settings → Your apps → Web

## Step 8: Test Firebase Connection

### Test Backend:
```bash
cd backend
npm install
npm run dev
```

Try API call:
```bash
curl http://localhost:3000/api/v1/health
```

Should return: `{"status":"ok"}`

### Test iOS:
```bash
cd apps/business-app-ios
open LocalDeals.xcworkspace
# Press Cmd+R to run
```

Should load without Firebase errors

### Test Android:
```bash
cd apps/business-app-android
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk
# Launch app - should load Firebase
```

### Test Web Dashboard:
```bash
cd apps/admin-dashboard
npm install
npm run dev
```

Open http://localhost:3001

## Step 9: Deploy to Production (Optional for now)

When ready to deploy:

```bash
# Backend to Cloud Run
cd backend
gcloud run deploy localdeals-api --source . --region us-central1

# Admin Dashboard to Firebase Hosting
cd apps/admin-dashboard
firebase deploy --only hosting

# iOS to TestFlight/App Store
# Android to Google Play
```

## Troubleshooting

### "GoogleService-Info.plist not found" (iOS)
- Make sure file is in Xcode project
- Check in Xcode → Build Phases → Copy Bundle Resources

### "google-services.json not found" (Android)
- File should be in: `app/google-services.json`
- Not in: `app/src/main/`
- Run: `./gradlew clean build`

### Firebase Auth not working
- Check Firebase Console → Authentication
- Verify sign-in methods are enabled
- Check rules in Realtime Database / Firestore

### "Private key invalid" (Backend)
- Make sure key includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Newlines should be `\n` in the string
- Don't add extra quotes inside the value

### Push notifications not working
- iOS: Check APNs certificate in Firebase Console
- Android: Get FCM Server Key from Project Settings
- Ensure app has permission to receive notifications

## Quick Checklist

- [ ] Firebase project created
- [ ] Service account key downloaded
- [ ] GoogleService-Info.plist downloaded (iOS)
- [ ] google-services.json downloaded (Android)
- [ ] Backend .env configured
- [ ] iOS app configured with plist
- [ ] Android app configured with JSON
- [ ] Web dashboard .env configured
- [ ] Authentication methods enabled in Firebase
- [ ] Realtime Database created
- [ ] Cloud Storage enabled
- [ ] Backend runs without errors
- [ ] iOS app runs without errors
- [ ] Android app runs without errors
- [ ] Web dashboard loads

## Next: Get Firebase ID

When you complete these steps, **share your Firebase Project ID** and I can:
- Help debug any issues
- Set up proper security rules
- Configure API endpoints
- Deploy to production

---

Need help? Check the full guide at: `docs/FIREBASE_SETUP.md`
