import Foundation
import Combine
import FirebaseAuth

class AuthManager: NSObject, ObservableObject {
    @Published var user: User?
    @Published var isAuthenticated = false
    @Published var isLoading = false
    @Published var error: String?

    private var authStateListener: AuthStateDidChangeListenerHandle?
    private let apiClient = APIClient()
    private let keychainManager = KeychainManager()

    override init() {
        super.init()
        setupAuthStateListener()
        checkExistingToken()
    }

    // MARK: - Authentication Methods

    func signUp(email: String, password: String, fullName: String) {
        isLoading = true
        error = nil

        Auth.auth().createUser(withEmail: email, password: password) { [weak self] result, error in
            self?.isLoading = false

            if let error = error {
                self?.error = error.localizedDescription
                return
            }

            guard let firebaseUser = result?.user else { return }
            self?.user = User(
                id: firebaseUser.uid,
                email: email,
                phone: nil,
                fullName: fullName,
                role: .businessOwner,
                isActive: true
            )
            self?.isAuthenticated = true
            self?.saveAuthToken(firebaseUser.uid)
        }
    }

    func signIn(email: String, password: String) {
        isLoading = true
        error = nil

        Auth.auth().signIn(withEmail: email, password: password) { [weak self] result, error in
            self?.isLoading = false

            if let error = error {
                self?.error = error.localizedDescription
                return
            }

            guard let firebaseUser = result?.user else { return }
            self?.fetchUserProfile(firebaseUser.uid)
        }
    }

    func signOut() {
        do {
            try Auth.auth().signOut()
            user = nil
            isAuthenticated = false
            keychainManager.deleteToken()
        } catch {
            self.error = error.localizedDescription
        }
    }

    // MARK: - Private Methods

    private func setupAuthStateListener() {
        authStateListener = Auth.auth().addStateDidChangeListener { [weak self] _, firebaseUser in
            if let firebaseUser = firebaseUser {
                self?.fetchUserProfile(firebaseUser.uid)
            } else {
                self?.user = nil
                self?.isAuthenticated = false
            }
        }
    }

    private func checkExistingToken() {
        if let token = keychainManager.getToken() {
            isAuthenticated = true
            // Optionally refresh token
        }
    }

    private func fetchUserProfile(_ userId: String) {
        // TODO: Fetch from backend API
        isAuthenticated = true
    }

    private func saveAuthToken(_ token: String) {
        keychainManager.saveToken(token)
    }

    deinit {
        if let listener = authStateListener {
            Auth.auth().removeStateDidChangeListener(listener)
        }
    }
}
