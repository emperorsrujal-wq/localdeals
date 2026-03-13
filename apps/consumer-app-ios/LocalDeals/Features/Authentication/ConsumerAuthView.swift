import SwiftUI

struct ConsumerAuthView: View {
    @EnvironmentObject var authManager: ConsumerAuthManager
    @State private var showSignUp = false

    var body: some View {
        ZStack {
            VStack(spacing: 20) {
                Spacer()

                VStack(spacing: 16) {
                    Text("LocalDeals")
                        .font(.system(size: 36, weight: .bold))
                    Text("Find Amazing Local Deals")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }

                Spacer()

                if showSignUp {
                    ConsumerSignUpView(showSignUp: $showSignUp)
                } else {
                    ConsumerSignInView(showSignUp: $showSignUp)
                }
            }
            .padding(.horizontal, 20)

            if authManager.isLoading {
                ProgressView()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color.black.opacity(0.2))
            }
        }
        .alert("Error", isPresented: .constant(authManager.error != nil)) {
            Button("OK") {
                authManager.error = nil
            }
        } message: {
            if let error = authManager.error {
                Text(error)
            }
        }
    }
}

struct ConsumerSignInView: View {
    @EnvironmentObject var authManager: ConsumerAuthManager
    @State private var email = ""
    @State private var password = ""
    @Binding var showSignUp: Bool

    var body: some View {
        VStack(spacing: 16) {
            TextField("Email", text: $email)
                .textFieldStyle(.roundedBorder)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)

            SecureField("Password", text: $password)
                .textFieldStyle(.roundedBorder)

            Button(action: {
                authManager.signIn(email: email, password: password)
            }) {
                Text("Sign In")
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(8)
            }

            Button("Don't have an account? Sign Up") {
                showSignUp = true
            }
            .foregroundColor(.blue)
        }
    }
}

struct ConsumerSignUpView: View {
    @EnvironmentObject var authManager: ConsumerAuthManager
    @State private var email = ""
    @State private var password = ""
    @State private var fullName = ""
    @Binding var showSignUp: Bool

    var body: some View {
        VStack(spacing: 16) {
            TextField("Full Name", text: $fullName)
                .textFieldStyle(.roundedBorder)

            TextField("Email", text: $email)
                .textFieldStyle(.roundedBorder)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)

            SecureField("Password", text: $password)
                .textFieldStyle(.roundedBorder)

            Button(action: {
                authManager.signUp(email: email, password: password, fullName: fullName)
            }) {
                Text("Create Account")
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .foregroundColor(.white)
                    .background(Color.green)
                    .cornerRadius(8)
            }

            Button("Already have an account? Sign In") {
                showSignUp = false
            }
            .foregroundColor(.blue)
        }
    }
}

#Preview {
    ConsumerAuthView()
        .environmentObject(ConsumerAuthManager())
}
