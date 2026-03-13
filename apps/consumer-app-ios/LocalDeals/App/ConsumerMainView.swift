import SwiftUI
import MapKit

struct ConsumerMainView: View {
    @EnvironmentObject var authManager: ConsumerAuthManager
    @State private var selectedTab = 0
    @State private var searchText = ""

    var body: some View {
        TabView(selection: $selectedTab) {
            // Home Feed Tab
            HomeFeedView(searchText: $searchText)
                .tabItem {
                    Label("Deals", systemImage: "sparkles")
                }
                .tag(0)

            // Map View Tab
            MapViewTab()
                .tabItem {
                    Label("Map", systemImage: "map.fill")
                }
                .tag(1)

            // Favorites Tab
            FavoritesView()
                .tabItem {
                    Label("Saved", systemImage: "heart.fill")
                }
                .tag(2)

            // Profile Tab
            ConsumerProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.circle.fill")
                }
                .tag(3)
        }
    }
}

struct HomeFeedView: View {
    @Binding var searchText: String
    @State private var selectedCategory = "All"
    @State private var sortOption = "Nearest"
    @State private var deals: [Flyer] = []

    let categories = ["All", "Food", "Electronics", "Apparel", "Beauty", "Grocery", "Services"]
    let sortOptions = ["Nearest", "Popular", "Newest", "Highest Discount %", "Ending Soon"]

    var body: some View {
        NavigationStack {
            VStack {
                // Search Bar
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.gray)
                    TextField("Search deals", text: $searchText)
                    if !searchText.isEmpty {
                        Button(action: { searchText = "" }) {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundColor(.gray)
                        }
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(Color(.systemGray6))
                .cornerRadius(8)
                .padding(.horizontal)

                // Category Tabs
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(categories, id: \.self) { category in
                            Button(action: { selectedCategory = category }) {
                                Text(category)
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                                    .background(selectedCategory == category ? Color.blue : Color(.systemGray6))
                                    .foregroundColor(selectedCategory == category ? .white : .black)
                                    .cornerRadius(20)
                            }
                        }
                    }
                    .padding(.horizontal)
                }

                // Sort Menu
                HStack {
                    Text("Sort: ")
                    Menu {
                        ForEach(sortOptions, id: \.self) { option in
                            Button(option) {
                                sortOption = option
                            }
                        }
                    } label: {
                        Text(sortOption)
                            .foregroundColor(.blue)
                    }
                    Spacer()
                }
                .padding(.horizontal)

                // Deals Feed
                ScrollView {
                    VStack(spacing: 16) {
                        // Trending Deals Section
                        VStack(alignment: .leading) {
                            Text("Trending Deals")
                                .font(.headline)
                                .padding(.horizontal)

                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 12) {
                                    ForEach(1...3, id: \.self) { _ in
                                        DealCard()
                                    }
                                }
                                .padding(.horizontal)
                            }
                        }

                        // Regular Deals
                        ForEach(1...5, id: \.self) { _ in
                            DealCard()
                        }
                    }
                    .padding(.vertical)
                }
            }
            .navigationTitle("LocalDeals")
        }
    }
}

struct DealCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Flyer Image
            Image(systemName: "image")
                .frame(maxWidth: .infinity)
                .frame(height: 200)
                .background(Color(.systemGray6))
                .cornerRadius(12)

            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Restaurant Name")
                            .font(.headline)
                        HStack {
                            Image(systemName: "location.fill")
                                .font(.caption)
                            Text("2.3 km away")
                                .font(.caption)
                        }
                        .foregroundColor(.gray)
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 4) {
                        Text("30% OFF")
                            .font(.headline)
                            .foregroundColor(.red)
                        Text("$10.99")
                            .font(.caption)
                            .strikethrough()
                    }
                }

                Text("Amazing Pizza Deal - Buy 1 Get 1 Free")
                    .font(.body)
                    .lineLimit(2)

                HStack(spacing: 8) {
                    Button(action: {}) {
                        Image(systemName: "heart")
                            .foregroundColor(.red)
                    }

                    Button(action: {}) {
                        Image(systemName: "square.and.arrow.up")
                    }

                    Spacer()

                    Text("Expires in 2 days")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            .padding()
        }
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(radius: 2)
        .padding(.horizontal)
    }
}

struct MapViewTab: View {
    var body: some View {
        NavigationStack {
            VStack {
                // MapKit placeholder
                Rectangle()
                    .fill(Color(.systemGray6))
                    .frame(maxWidth: .infinity)
                    .frame(maxHeight: .infinity)
                    .overlay(
                        VStack {
                            Image(systemName: "map.fill")
                                .font(.system(size: 48))
                                .foregroundColor(.gray)
                            Text("Map Coming Soon")
                                .font(.headline)
                        }
                    )
            }
            .navigationTitle("Nearby Deals")
        }
    }
}

struct FavoritesView: View {
    var body: some View {
        NavigationStack {
            VStack {
                Text("Saved Deals")
                    .font(.title2)
                    .fontWeight(.bold)
                    .padding()

                List {
                    Section("Your Favorites") {
                        Text("No saved deals yet")
                            .foregroundColor(.gray)
                    }
                }
            }
        }
    }
}

struct ConsumerProfileView: View {
    @EnvironmentObject var authManager: ConsumerAuthManager

    var body: some View {
        NavigationStack {
            VStack {
                Text("Profile")
                    .font(.title2)
                    .fontWeight(.bold)
                    .padding()

                List {
                    Section("Account") {
                        HStack {
                            Text("Name")
                            Spacer()
                            Text(authManager.user?.fullName ?? "N/A")
                                .foregroundColor(.gray)
                        }
                    }

                    Section("Preferences") {
                        NavigationLink(destination: Text("Categories")) {
                            Text("Favorite Categories")
                        }
                    }

                    Section {
                        Button(role: .destructive) {
                            authManager.signOut()
                        } label: {
                            Text("Sign Out")
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    ConsumerMainView()
        .environmentObject(ConsumerAuthManager())
}
