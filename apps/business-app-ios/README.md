# LocalDeals Business App - iOS

Swift/SwiftUI application for business owners to create and manage promotional flyers.

## Tech Stack

- **Language**: Swift 5.9+
- **UI Framework**: SwiftUI
- **Architecture**: MVVM + Clean Architecture
- **Min iOS Version**: iOS 16+
- **Build System**: Xcode 15+

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
LocalDeals/
├── App/
│   ├── LocalDealsApp.swift          # App entry point
│   └── RootView.swift                # Root navigation
├── Features/
│   ├── Authentication/               # Onboarding, sign-up, login
│   ├── Flyer Creator/                # Main flyer creation flow
│   ├── Business Profile/             # Profile management
│   ├── Ad Management/                # Dashboard, analytics
│   └── Subscription/                 # Payment & plans
├── Common/
│   ├── Extensions/                   # Swift extensions
│   ├── Constants/                    # App constants
│   ├── Utilities/                    # Helper functions
│   └── Views/                        # Shared UI components
├── Models/
│   ├── User.swift
│   ├── Business.swift
│   ├── Flyer.swift
│   ├── Template.swift
│   └── Category.swift
├── Networking/
│   ├── APIClient.swift
│   ├── Endpoints.swift
│   └── Models/                       # API request/response models
└── Storage/
    ├── UserDefaults+Extensions.swift
    ├── KeychainManager.swift
    └── FileManager+Extensions.swift
```

## Getting Started

### Prerequisites
- Xcode 15+
- iOS 16+ deployment target
- CocoaPods or SPM for dependency management

### Installation

1. Open `LocalDeals.xcodeproj` in Xcode
2. Select target and build scheme
3. Configure environment variables in `Config.xcconfig`
4. Run on simulator or device

### Configuration

Copy `Config.xcconfig.example` to `Config.xcconfig` and fill in:
- Firebase project ID
- Backend API URL
- Google Maps API key

### Dependencies

(Will be managed via SPM)
- Firebase
- Alamofire or URLSession (native)
- SwiftyJSON
- Kingfisher (image caching)

## Development

### Code Style
- Follow Swift API Design Guidelines
- Use MVVM pattern for all features
- Separate business logic from UI

### Testing
- Unit tests for ViewModels
- Integration tests for networking

## Deployment

Ready for TestFlight distribution. See `CI/CD` docs for App Store deployment pipeline.

## Status

🚀 Project structure and core setup initialized
