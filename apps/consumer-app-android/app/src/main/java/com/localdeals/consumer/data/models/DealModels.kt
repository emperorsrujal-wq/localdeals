package com.localdeals.consumer.data.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class DealSummary(
    val id: String,
    @SerialName("business_id")
    val businessId: String,
    @SerialName("business_name")
    val businessName: String,
    val title: String,
    @SerialName("original_price")
    val originalPrice: Double? = null,
    @SerialName("discounted_price")
    val discountedPrice: Double? = null,
    @SerialName("flyer_url")
    val flyerUrl: String,
    val distance: Double,
    val latitude: Double,
    val longitude: Double,
    @SerialName("valid_until")
    val validUntil: String,
    val category: String,
    val views: Int = 0,
    val saves: Int = 0
) {
    val discountPercentage: Int
        get() {
            return if (originalPrice != null && discountedPrice != null && originalPrice > 0) {
                ((1 - (discountedPrice / originalPrice)) * 100).toInt()
            } else {
                0
            }
        }
}

@Serializable
data class DealDetail(
    val id: String,
    @SerialName("business_id")
    val businessId: String,
    val title: String,
    val description: String? = null,
    @SerialName("flyer_url")
    val flyerUrl: String,
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
    val images: List<String> = emptyList(),
    @SerialName("business_info")
    val businessInfo: BusinessSummary,
    @SerialName("similar_deals")
    val similarDeals: List<DealSummary> = emptyList()
)

@Serializable
data class BusinessSummary(
    val id: String,
    val name: String,
    @SerialName("logo_url")
    val logoUrl: String? = null,
    val rating: Double = 0.0,
    val distance: Double,
    val hours: String? = null,
    val phone: String? = null,
    val website: String? = null
)
