import SwiftUI
import Firebase

@main
struct ConsumerApp: App {
    @StateObject private var authManager = ConsumerAuthManager()
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            if authManager.isAuthenticated {
                ConsumerMainView()
                    .environmentObject(authManager)
            } else {
                ConsumerAuthView()
                    .environmentObject(authManager)
            }
        }
    }
}

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        FirebaseApp.configure()
        setupPushNotifications(application)
        return true
    }

    private func setupPushNotifications(_ application: UIApplication) {
        UNUserNotificationCenter.current().delegate = self
        application.registerForRemoteNotifications()
    }

    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        Messaging.messaging().apnsToken = deviceToken
    }
}

extension AppDelegate: UNUserNotificationCenterDelegate {
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound, .badge])
    }
}

class ConsumerAuthManager: NSObject, ObservableObject {
    @Published var user: User?
    @Published var isAuthenticated = false
    @Published var isLoading = false
    @Published var error: String?

    func signUp(email: String, password: String, fullName: String) {
        isLoading = true
        isAuthenticated = true
    }

    func signIn(email: String, password: String) {
        isLoading = true
        isAuthenticated = true
    }

    func signOut() {
        isAuthenticated = false
    }
}
