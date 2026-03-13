package com.localdeals.business.data.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class Flyer(
    val id: String,
    @SerialName("business_id")
    val businessId: String,
    @SerialName("template_id")
    val templateId: String? = null,
    val title: String,
    val description: String? = null,
    @SerialName("flyer_url")
    val flyerUrl: String? = null,
    @SerialName("original_price")
    val originalPrice: Double? = null,
    @SerialName("discounted_price")
    val discountedPrice: Double? = null,
    @SerialName("valid_from")
    val validFrom: String,
    @SerialName("valid_until")
    val validUntil: String,
    @SerialName("coupon_code")
    val couponCode: String? = null,
    @SerialName("category_id")
    val categoryId: String,
    val status: FlyerStatus,
    @SerialName("published_at")
    val publishedAt: String? = null,
    @SerialName("target_radius")
    val targetRadius: Int = 5,
    val views: Int = 0,
    val saves: Int = 0,
    val shares: Int = 0,
    val clicks: Int = 0,
    val images: List<String>? = null,
    @SerialName("created_at")
    val createdAt: String,
    @SerialName("updated_at")
    val updatedAt: String
) {
    val discountPercentage: Int
        get() {
            return if (originalPrice != null && discountedPrice != null && originalPrice > 0) {
                ((1 - (discountedPrice / originalPrice)) * 100).toInt()
            } else {
                0
            }
        }

    val isExpired: Boolean
        get() = LocalDateTime.now() > LocalDateTime.parse(validUntil)
}

@Serializable
enum class FlyerStatus {
    @SerialName("draft")
    DRAFT,

    @SerialName("active")
    ACTIVE,

    @SerialName("scheduled")
    SCHEDULED,

    @SerialName("expired")
    EXPIRED,

    @SerialName("paused")
    PAUSED
}

@Serializable
data class Template(
    val id: String,
    val name: String,
    val category: String,
    @SerialName("thumbnail_url")
    val thumbnailUrl: String,
    @SerialName("preview_url")
    val previewUrl: String
)

@Serializable
data class Category(
    val id: String,
    val name: String,
    val icon: String,
    val color: String
)

@Serializable
data class CreateFlyerRequest(
    val title: String,
    val description: String? = null,
    @SerialName("category_id")
    val categoryId: String,
    @SerialName("original_price")
    val originalPrice: Double? = null,
    @SerialName("discounted_price")
    val discountedPrice: Double? = null,
    @SerialName("valid_from")
    val validFrom: String,
    @SerialName("valid_until")
    val validUntil: String,
    @SerialName("coupon_code")
    val couponCode: String? = null,
    val images: List<String>? = null
)

@Serializable
data class PublishFlyerRequest(
    @SerialName("target_radius")
    val targetRadius: Int = 5
)
