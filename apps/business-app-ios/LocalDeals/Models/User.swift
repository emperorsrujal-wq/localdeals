import Foundation

struct User: Codable, Identifiable {
    let id: String
    var email: String?
    var phone: String?
    var fullName: String
    var avatarUrl: String?
    var role: UserRole
    var preferredCategories: [String]?
    var isActive: Bool

    enum CodingKeys: String, CodingKey {
        case id
        case email
        case phone
        case fullName = "full_name"
        case avatarUrl = "avatar_url"
        case role
        case preferredCategories = "preferred_categories"
        case isActive = "is_active"
    }
}

enum UserRole: String, Codable {
    case consumer = "consumer"
    case businessOwner = "business_owner"
    case admin = "admin"
}

struct AuthToken: Codable {
    let accessToken: String
    let expiresIn: Int
    let refreshToken: String?

    enum CodingKeys: String, CodingKey {
        case accessToken = "access_token"
        case expiresIn = "expires_in"
        case refreshToken = "refresh_token"
    }
}
