import SwiftUI

struct MainView: View {
    @EnvironmentObject var authManager: AuthManager
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            // Flyer Creator Tab
            FlyerCreatorView()
                .tabItem {
                    Label("Create", systemImage: "plus.circle.fill")
                }
                .tag(0)

            // Ads Management Tab
            AdManagementView()
                .tabItem {
                    Label("Ads", systemImage: "list.bullet")
                }
                .tag(1)

            // Profile Tab
            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.circle.fill")
                }
                .tag(2)
        }
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct FlyerCreatorView: View {
    var body: some View {
        NavigationStack {
            VStack {
                Text("Create Flyer")
                    .font(.title2)
                    .fontWeight(.bold)
                    .padding()

                List {
                    NavigationLink(destination: PhotoSelectionView()) {
                        Label("Take Photo", systemImage: "camera.fill")
                    }
                    NavigationLink(destination: TemplateSelectionView()) {
                        Label("Choose Template", systemImage: "rectangle.on.rectangle")
                    }
                    NavigationLink(destination: DealDetailsView()) {
                        Label("Add Deal Info", systemImage: "info.circle.fill")
                    }
                }
                .listStyle(.plain)
            }
        }
    }
}

struct PhotoSelectionView: View {
    var body: some View {
        Text("Photo Selection")
    }
}

struct TemplateSelectionView: View {
    var body: some View {
        Text("Template Selection")
    }
}

struct DealDetailsView: View {
    var body: some View {
        Text("Deal Details")
    }
}

struct AdManagementView: View {
    var body: some View {
        NavigationStack {
            VStack {
                Text("Your Advertisements")
                    .font(.title2)
                    .fontWeight(.bold)
                    .padding()

                List {
                    Section("Active Ads") {
                        Text("No active ads yet")
                            .foregroundColor(.gray)
                    }

                    Section("Expired Ads") {
                        Text("No expired ads")
                            .foregroundColor(.gray)
                    }
                }
            }
        }
    }
}

struct ProfileView: View {
    @EnvironmentObject var authManager: AuthManager

    var body: some View {
        NavigationStack {
            VStack {
                Text("Business Profile")
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

                        HStack {
                            Text("Email")
                            Spacer()
                            Text(authManager.user?.email ?? "N/A")
                                .foregroundColor(.gray)
                        }
                    }

                    Section("Subscription") {
                        Text("Free Plan")
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
    MainView()
        .environmentObject(AuthManager())
}
