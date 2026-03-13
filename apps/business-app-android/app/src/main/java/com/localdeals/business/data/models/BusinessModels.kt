package com.localdeals.business.data.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Business(
    val id: String,
    @SerialName("owner_id")
    val ownerId: String,
    val name: String,
    @SerialName("category_id")
    val categoryId: String,
    val description: String? = null,
    val address: String,
    val city: String,
    val state: String? = null,
    @SerialName("zip_code")
    val zipCode: String? = null,
    val country: String = "US",
    val phone: String? = null,
    val website: String? = null,
    @SerialName("logo_url")
    val logoUrl: String? = null,
    @SerialName("cover_url")
    val coverUrl: String? = null,
    @SerialName("operating_hours")
    val operatingHours: OperatingHours? = null,
    @SerialName("verification_status")
    val verificationStatus: VerificationStatus,
    @SerialName("subscription_tier")
    val subscriptionTier: SubscriptionTier,
    @SerialName("subscription_expires")
    val subscriptionExpires: String? = null,
    @SerialName("is_active")
    val isActive: Boolean = true,
    @SerialName("created_at")
    val createdAt: String,
    @SerialName("updated_at")
    val updatedAt: String
)

@Serializable
data class OperatingHours(
    val monday: String? = null,
    val tuesday: String? = null,
    val wednesday: String? = null,
    val thursday: String? = null,
    val friday: String? = null,
    val saturday: String? = null,
    val sunday: String? = null
)

@Serializable
enum class VerificationStatus {
    @SerialName("pending")
    PENDING,

    @SerialName("verified")
    VERIFIED,

    @SerialName("rejected")
    REJECTED
}

@Serializable
enum class SubscriptionTier {
    @SerialName("free")
    FREE,

    @SerialName("starter")
    STARTER,

    @SerialName("pro")
    PRO,

    @SerialName("enterprise")
    ENTERPRISE;

    val adsPerMonth: Int
        get() = when (this) {
            FREE -> 2
            STARTER -> 10
            PRO -> 999
            ENTERPRISE -> 999
        }

    val monthlyPrice: Double
        get() = when (this) {
            FREE -> 0.0
            STARTER -> 9.99
            PRO -> 24.99
            ENTERPRISE -> 49.99
        }

    val maxRadius: Int
        get() = when (this) {
            FREE -> 5
            STARTER -> 25
            PRO -> 999
            ENTERPRISE -> 999
        }
}

@Serializable
data class CreateBusinessRequest(
    val name: String,
    @SerialName("category_id")
    val categoryId: String,
    val address: String,
    val city: String,
    val state: String? = null,
    @SerialName("zip_code")
    val zipCode: String? = null,
    val phone: String? = null,
    val website: String? = null
)
