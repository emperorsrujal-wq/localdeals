import Foundation

struct Flyer: Codable, Identifiable {
    let id: String
    let businessId: String
    let templateId: String?
    var title: String
    var description: String?
    var flyerUrl: String?
    var originalPrice: Double?
    var discountedPrice: Double?
    var validFrom: Date
    var validUntil: Date
    var couponCode: String?
    var categoryId: String
    var status: FlyerStatus
    var publishedAt: Date?
    var targetRadius: Int
    var views: Int
    var saves: Int
    var shares: Int
    var clicks: Int
    var images: [String]?
    var createdAt: Date
    var updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case businessId = "business_id"
        case templateId = "template_id"
        case title
        case description
        case flyerUrl = "flyer_url"
        case originalPrice = "original_price"
        case discountedPrice = "discounted_price"
        case validFrom = "valid_from"
        case validUntil = "valid_until"
        case couponCode = "coupon_code"
        case categoryId = "category_id"
        case status
        case publishedAt = "published_at"
        case targetRadius = "target_radius"
        case views
        case saves
        case shares
        case clicks
        case images
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }

    var discountPercentage: Int {
        guard let original = originalPrice, let discounted = discountedPrice, original > 0 else {
            return 0
        }
        return Int((1 - (discounted / original)) * 100)
    }

    var daysRemaining: Int {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.day], from: Date(), to: validUntil)
        return components.day ?? 0
    }

    var isExpired: Bool {
        return Date() > validUntil
    }
}

enum FlyerStatus: String, Codable {
    case draft
    case active
    case scheduled
    case expired
    case paused
}

struct Template: Codable, Identifiable {
    let id: String
    let name: String
    let category: String
    let thumbnailUrl: String
    let previewUrl: String

    enum CodingKeys: String, CodingKey {
        case id
        case name
        case category
        case thumbnailUrl = "thumbnail_url"
        case previewUrl = "preview_url"
    }
}

struct Category: Codable, Identifiable {
    let id: String
    let name: String
    let icon: String
    let color: String
}
