# LocalDeals Consumer App - iOS

Swift/SwiftUI application for consumers to discover local deals and businesses.

## Tech Stack

- **Language**: Swift 5.9+
- **UI Framework**: SwiftUI
- **Architecture**: MVVM + Clean Architecture
- **Min iOS Version**: iOS 16+
- **Maps**: MapKit

## Features

### 1. Home Feed - Weekly Deals
- Scrollable card-based deal feed
- Sorting options: nearest, popular, newest, highest discount
- Category tabs for filtering
- Weekly ad section

### 2. Map View (Core Feature)
- Interactive map showing all nearby deals
- Clustered pins that expand on zoom
- Color-coded pins by category
- Tap to see mini deal card
- Direction button for navigation
- Filter by category, distance, discount %
- Heatmap overlay showing deal density

### 3. Search & Discovery
- Full-text search across deals and businesses
- Search suggestions & auto-complete
- Recent searches history
- Voice search support
- QR/Barcode scanner for in-store redemption

### 4. Deal Detail Page
- Full-resolution flyer image with zoom
- Business info (name, logo, rating, distance, hours)
- Original & deal price with discount %
- Validity dates, coupon code (tap to copy)
- Inline mini-map with directions
- Save to favorites, share (WhatsApp/SMS/social)
- Similar deals carousel

### 5. Area Scanner
- Instantly discover deals in new locations
- GPS-based area detection
- Swipeable card stack overlay on map
- Quick-filter by category
- Option to save area for notifications

### 6. Saved & Favorites
- Personal favorites list
- Custom list organization
- Follow businesses for instant alerts
- Expiring deal notifications (24h before)

### 7. Notifications
- New deals in configured radius/categories
- Deals from followed businesses
- Expiring saved deals alerts
- Weekly deals digest
- Personalized recommendations

## Project Structure

```
LocalDeals/
├── App/
│   ├── LocalDealsApp.swift
│   └── RootView.swift
├── Features/
│   ├── Authentication/
│   ├── Home Feed/
│   ├── Map View/
│   ├── Deal Details/
│   ├── Search/
│   ├── Favorites/
│   └── Profile/
├── Common/
│   ├── Extensions/
│   ├── Constants/
│   ├── Utilities/
│   └── Views/
├── Models/
│   ├── User.swift
│   ├── Deal.swift
│   ├── Business.swift
│   └── Category.swift
├── Networking/
│   ├── APIClient.swift
│   └── Endpoints.swift
└── Storage/
    ├── UserDefaults+Extensions.swift
    └── KeychainManager.swift
```

## Getting Started

### Prerequisites
- Xcode 15+
- iOS 16+ deployment target

### Installation
1. Open `LocalDeals.xcodeproj` in Xcode
2. Configure `Config.xcconfig`
3. Install dependencies (CocoaPods/SPM)
4. Run on simulator or device

### Configuration
- Firebase project ID
- Backend API URL
- Google Maps API key (for MapKit alternatives)

## Permissions

Required permissions:
- Location (for nearby deals)
- Camera (QR code scanner)
- Contacts (for sharing)
- Photo Library (save deals as screenshots)
- Push Notifications

## Dependencies
- Firebase
- Kingfisher (image caching)
- MapKit (native)

## Status

🚀 Project structure initialized - Ready for development
