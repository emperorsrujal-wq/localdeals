# LocalDeals Business App - Android

Kotlin/Jetpack Compose application for business owners to create and manage promotional flyers.

## Tech Stack

- **Language**: Kotlin 1.9+
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM + Clean Architecture
- **Min Android Version**: Android 8.0 (API 26)
- **Build System**: Gradle 8.0+

## Features

### 1. Onboarding & Authentication
- Phone/email sign-up with OTP verification
- Business profile creation
- Business license/document upload
- Google Maps integration for location selection

### 2. Flyer Creator (Core)
- In-app camera with auto-enhancement
- 50+ customizable templates by category
- AI-powered background removal
- Photo editing (crop, rotate, filters, brightness)
- Deal information entry (prices, dates, coupon codes)
- Real-time preview
- Publish with target radius selection

### 3. Ad Management
- List of active/expired ads
- Performance metrics (views, saves, clicks)
- Quick actions (duplicate, edit, extend, pause, delete)
- Performance insights

### 4. Business Profile
- Edit business details
- Operating hours management
- Multiple location support
- Social media integration

### 5. Notifications & Payments
- Push notifications for ad status
- In-app subscription management
- Free tier: 2 ads/month
- Starter ($9.99/mo): 10 ads/month
- Pro ($24.99/mo): Unlimited ads
- Enterprise ($49.99/mo): Everything + API access

## Project Structure

```
business-app-android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/localdeals/business/
│   │   │   │   ├── MainActivity.kt
│   │   │   │   ├── data/                    # Data layer
│   │   │   │   │   ├── api/
│   │   │   │   │   ├── local/
│   │   │   │   │   ├── models/
│   │   │   │   │   └── repository/
│   │   │   │   ├── domain/                  # Domain layer
│   │   │   │   │   ├── models/
│   │   │   │   │   └── usecase/
│   │   │   │   ├── presentation/            # Presentation layer
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── viewmodels/
│   │   │   │   │   ├── components/
│   │   │   │   │   └── navigation/
│   │   │   │   ├── di/                      # Dependency Injection
│   │   │   │   └── util/
│   │   │   ├── res/
│   │   │   └── AndroidManifest.xml
│   │   └── test/
│   ├── build.gradle.kts
│   └── proguard-rules.pro
├── build.gradle.kts
├── settings.gradle.kts
└── gradle/
    └── libs.versions.toml
```

## Getting Started

### Prerequisites
- Android Studio Hedgehog+
- Gradle 8.0+
- JDK 11+

### Installation

1. Clone the repository
2. Open project in Android Studio
3. Sync Gradle files
4. Configure environment variables in `local.properties`
5. Run on emulator or device

### Configuration

Create `local.properties`:
```properties
sdk.dir=/path/to/android/sdk
firebase.project.id=your-project-id
api.base.url=http://localhost:3000/api/v1
google.maps.api.key=YOUR_API_KEY
```

### Dependencies

Core dependencies:
- Jetpack Compose UI
- Jetpack Navigation Compose
- Retrofit 2 for networking
- Room Database
- DataStore for preferences
- Coil for image loading
- Firebase Cloud Messaging
- Hilt for DI

## Development

### Code Style
- Follow Kotlin official style guide
- Use MVVM pattern for all screens
- Separate business logic from UI

### Testing
- Unit tests for ViewModels using Mockk
- Integration tests for Repositories
- UI tests with Compose test utils

## Building

### Debug
```bash
./gradlew assembleDebug
```

### Release
```bash
./gradlew assembleRelease
```

### Testing
```bash
./gradlew test
./gradlew connectedAndroidTest
```

## Deployment

Ready for Google Play Store distribution. See `CI/CD` docs for Play Store deployment pipeline.

## Status

🚀 Project structure initialized - Ready for development
