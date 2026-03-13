package com.localdeals.business.data.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: String,
    val email: String? = null,
    val phone: String? = null,
    @SerialName("full_name")
    val fullName: String,
    @SerialName("avatar_url")
    val avatarUrl: String? = null,
    val role: UserRole,
    @SerialName("preferred_categories")
    val preferredCategories: List<String>? = null,
    @SerialName("is_active")
    val isActive: Boolean = true
)

@Serializable
enum class UserRole {
    @SerialName("consumer")
    CONSUMER,

    @SerialName("business_owner")
    BUSINESS_OWNER,

    @SerialName("admin")
    ADMIN
}

@Serializable
data class AuthToken(
    @SerialName("access_token")
    val accessToken: String,
    @SerialName("expires_in")
    val expiresIn: Int,
    @SerialName("refresh_token")
    val refreshToken: String? = null
)

@Serializable
data class SignUpRequest(
    val email: String,
    val password: String,
    @SerialName("full_name")
    val fullName: String
)

@Serializable
data class SignInRequest(
    val email: String,
    val password: String
)

@Serializable
data class FirebaseTokenRequest(
    @SerialName("firebase_token")
    val firebaseToken: String
)
