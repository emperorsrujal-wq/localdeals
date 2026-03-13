import Foundation

struct Business: Codable, Identifiable {
    let id: String
    let ownerId: String
    var name: String
    var categoryId: String
    var description: String?
    var address: String
    var city: String
    var state: String?
    var zipCode: String?
    var country: String = "US"
    var phone: String?
    var website: String?
    var logoUrl: String?
    var coverUrl: String?
    var operatingHours: OperatingHours?
    var verificationStatus: VerificationStatus
    var subscriptionTier: SubscriptionTier
    var subscriptionExpires: Date?
    var isActive: Bool
    var createdAt: Date
    var updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case ownerId = "owner_id"
        case name
        case categoryId = "category_id"
        case description
        case address
        case city
        case state
        case zipCode = "zip_code"
        case country
        case phone
        case website
        case logoUrl = "logo_url"
        case coverUrl = "cover_url"
        case operatingHours = "operating_hours"
        case verificationStatus = "verification_status"
        case subscriptionTier = "subscription_tier"
        case subscriptionExpires = "subscription_expires"
        case isActive = "is_active"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

struct OperatingHours: Codable {
    var monday: String?
    var tuesday: String?
    var wednesday: String?
    var thursday: String?
    var friday: String?
    var saturday: String?
    var sunday: String?
}

enum VerificationStatus: String, Codable {
    case pending
    case verified
    case rejected
}

enum SubscriptionTier: String, Codable {
    case free
    case starter
    case pro
    case enterprise

    var adsPerMonth: Int {
        switch self {
        case .free:
            return 2
        case .starter:
            return 10
        case .pro:
            return 999 // unlimited
        case .enterprise:
            return 999 // unlimited
        }
    }

    var monthlyPrice: Double {
        switch self {
        case .free:
            return 0
        case .starter:
            return 9.99
        case .pro:
            return 24.99
        case .enterprise:
            return 49.99
        }
    }

    var maxRadius: Int {
        switch self {
        case .free:
            return 5
        case .starter:
            return 25
        case .pro:
            return 999 // city-wide
        case .enterprise:
            return 999 // city-wide
        }
    }
}
