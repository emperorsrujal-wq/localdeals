# Firebase Setup & Configuration

Complete guide to set up Firebase for LocalDeals platform.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Project name: `localdeals-prod` (or similar)
4. Enable Google Analytics (optional)
5. Select your region/country
6. Create the project

## 2. Enable Services

### Authentication
1. Go to Authentication → Sign-in method
2. Enable:
   - Email/Password
   - Phone Number (for OTP verification)
   - Google OAuth
   - Apple Sign In (for iOS)

### Realtime Database (for notifications)
1. Create database
2. Start in **production mode**
3. Set region (closest to users)

### Cloud Firestore (optional, for scalability)
1. Create database
2. Start in **production mode**
3. Set region

### Cloud Storage (for images/documents)
1. Create storage bucket
2. Name: `localdeals-prod.appspot.com`
3. Set region matching databases

### Cloud Functions (for backend tasks)
1. Enable Cloud Functions API
2. Set region (e.g., us-central1)

### Cloud Messaging (for push notifications)
1. Enable Firebase Cloud Messaging
2. Get Server Key from Project Settings

## 3. Get Firebase Credentials

### For Mobile Apps (iOS & Android)
1. Go to Project Settings
2. Add App:
   - **iOS**: Download `GoogleService-Info.plist`
   - **Android**: Download `google-services.json`

Place in respective app directories:
- **iOS**: `apps/business-app-ios/LocalDeals/`
- **Android**: `apps/business-app-android/app/`

### For Backend & Web
1. Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save as `firebase-admin-key.json`
4. Add to backend: `backend/firebase-admin-key.json`

## 4. Backend Configuration (.env)

```env
# Firebase Admin
FIREBASE_PROJECT_ID=localdeals-prod
FIREBASE_PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@localdeals-prod.iam.gserviceaccount.com

# Firebase Database URLs
FIREBASE_DATABASE_URL=https://localdeals-prod-default-rtdb.firebaseio.com
FIREBASE_STORAGE_BUCKET=localdeals-prod.appspot.com

# Cloud Messaging
FCM_SERVER_KEY=YOUR_FCM_SERVER_KEY
```

## 5. iOS Configuration

### Step 1: Add GoogleService-Info.plist
Place `GoogleService-Info.plist` in Xcode project

### Step 2: Podfile
```ruby
target 'LocalDeals' do
  pod 'Firebase/Core'
  pod 'Firebase/Auth'
  pod 'Firebase/Messaging'
  pod 'Firebase/Storage'
  pod 'Firebase/Database'
  pod 'Firebase/Firestore'
end
```

### Step 3: Info.plist permissions
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to capture photos for flyers</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to show nearby deals</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo library access to select images</string>

<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

### Step 4: Enable Push Notifications
1. In Xcode: Signing & Capabilities
2. Add "Push Notifications"
3. Add "Background Modes" → Remote notifications

## 6. Android Configuration

### Step 1: Add google-services.json
Place `google-services.json` in `apps/business-app-android/app/`

### Step 2: build.gradle (Project level)
```gradle
plugins {
    id 'com.google.gms.google-services' version '4.3.15' apply false
}
```

### Step 3: build.gradle (App level)
```gradle
plugins {
    id 'com.google.gms.google-services'
}

dependencies {
    implementation platform('com.google.firebase:firebase-bom:32.2.3')
    implementation 'com.google.firebase:firebase-auth-ktx'
    implementation 'com.google.firebase:firebase-messaging-ktx'
    implementation 'com.google.firebase:firebase-storage-ktx'
    implementation 'com.google.firebase:firebase-database-ktx'
    implementation 'com.google.firebase:firebase-firestore-ktx'
}
```

### Step 4: AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<service
    android:name=".services.MyFirebaseMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

## 7. Admin Dashboard Configuration

### .env.local
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=localdeals-prod
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localdeals-prod.firebaseapp.com
```

## 8. Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Businesses can read/write their own data
    match /businesses/{businessId} {
      allow read, write: if request.auth.uid == resource.data.ownerId;
      allow read: if request.auth.token.admin == true;
    }

    // Flyers/Deals readable by all authenticated users
    match /flyers/{flyerId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == resource.data.businessId;
    }

    // Admin can manage everything
    match /{document=**} {
      allow read, write: if request.auth.token.admin == true;
    }
  }
}
```

### Realtime Database Rules
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth.uid == $uid || root.child('admins').child(auth.uid).exists()",
        ".write": "auth.uid == $uid"
      }
    },
    "deals": {
      ".read": "auth != null",
      "$dealId": {
        ".write": "root.child('deals').child($dealId).child('businessId').val() == auth.uid"
      }
    }
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload files
    match /uploads/{userId}/{allPaths=**} {
      allow write: if request.auth.uid == userId;
      allow read: if request.auth != null;
    }

    // Public flyers
    match /flyers/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 9. Environment Variables Checklist

**Backend (.env)**
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_PRIVATE_KEY
- [ ] FIREBASE_CLIENT_EMAIL
- [ ] FIREBASE_DATABASE_URL
- [ ] FIREBASE_STORAGE_BUCKET
- [ ] FCM_SERVER_KEY
- [ ] DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- [ ] JWT_SECRET

**iOS (Config.xcconfig)**
- [ ] FIREBASE_PROJECT_ID
- [ ] API_BASE_URL
- [ ] GOOGLE_MAPS_API_KEY (if using)

**Android (local.properties)**
- [ ] FIREBASE_PROJECT_ID
- [ ] API_BASE_URL
- [ ] GOOGLE_MAPS_API_KEY

**Admin Dashboard (.env.local)**
- [ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID
- [ ] NEXT_PUBLIC_FIREBASE_API_KEY
- [ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- [ ] NEXT_PUBLIC_API_URL

## 10. Verification Checklist

- [ ] Firebase project created
- [ ] Authentication methods enabled
- [ ] Databases created
- [ ] Storage bucket created
- [ ] Service account key generated
- [ ] GoogleService-Info.plist downloaded (iOS)
- [ ] google-services.json downloaded (Android)
- [ ] All .env files configured
- [ ] Firebase rules deployed
- [ ] Test authentication flow
- [ ] Test push notifications
- [ ] Test image upload to storage

## 11. Troubleshooting

### Common Issues

**iOS - Pod installation fails**
```bash
pod repo update
pod install --repo-update
```

**Android - google-services.json not found**
- Ensure file is in `app/` directory
- Run `./gradlew clean build`

**Firebase Auth not working**
- Check Firebase Rules
- Verify GoogleService-Info.plist (iOS)
- Verify google-services.json (Android)
- Check that auth methods are enabled

**Push notifications not working**
- Verify APNs certificate (iOS)
- Check FCM server key (Android)
- Ensure tokens are being saved
- Check database/Firestore for token updates

## 12. Next Steps

1. [ ] Share Firebase credentials with team
2. [ ] Set up CI/CD for deploying functions
3. [ ] Configure backup rules
4. [ ] Set up monitoring and alerts
5. [ ] Plan scaling strategy for databases
6. [ ] Schedule regular security audits
