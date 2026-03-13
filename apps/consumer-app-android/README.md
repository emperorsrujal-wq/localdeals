# LocalDeals Consumer App - Android

Kotlin/Jetpack Compose application for consumers to discover local deals and businesses.

## Tech Stack

- **Language**: Kotlin 1.9+
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM + Clean Architecture
- **Min Android Version**: Android 8.0 (API 26)
- **Maps**: Google Maps SDK

## Features

### 1. Home Feed - Weekly Deals
- Scrollable card-based deal feed
- Multiple sorting options
- Category filtering tabs
- Trending deals section

### 2. Map View (Core)
- Interactive Google Maps with deal pins
- Clustered pins with zoom behavior
- Color-coded category pins
- Tap-to-view deal cards
- Navigation integration

### 3. Search & Discovery
- Full-text search
- Voice search support
- QR/barcode scanner for redemption
- Recent search history

### 4. Deal Details
- Flyer display with zoom
- Business information
- Price and discount details
- Validity dates & coupon codes
- Share options (WhatsApp, SMS, etc.)
- Similar deals

### 5. Area Scanner
- GPS-based discovery
- Swipeable deal cards
- Category quick filters

### 6. Saved & Favorites
- Personal favorites management
- Custom lists
- Business following
- Expiring deal alerts

### 7. Notifications
- Location-based deal alerts
- Followed business updates
- Personalized recommendations

## Project Structure

```
consumer-app-android/
├── app/src/main/java/com/localdeals/consumer/
│   ├── data/              # Data layer
│   │   ├── api/
│   │   ├── models/
│   │   └── repository/
│   ├── domain/            # Domain layer
│   │   ├── models/
│   │   └── usecase/
│   ├── presentation/      # UI layer
│   │   ├── screens/
│   │   ├── viewmodels/
│   │   ├── components/
│   │   └── navigation/
│   └── di/                # Dependency Injection
└── [build files]
```

## Status

🚀 Project structure ready - Development in progress
