package com.localdeals.business.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun AuthScreen(
    onSignInClick: (email: String, password: String) -> Unit,
    onSignUpClick: (email: String, password: String, fullName: String) -> Unit
) {
    var isSignUp by remember { mutableStateOf(false) }

    if (isSignUp) {
        SignUpScreen(
            onSignUpClick = onSignUpClick,
            onBackClick = { isSignUp = false }
        )
    } else {
        SignInScreen(
            onSignInClick = onSignInClick,
            onSignUpClick = { isSignUp = true }
        )
    }
}

@Composable
fun SignInScreen(
    onSignInClick: (email: String, password: String) -> Unit,
    onSignUpClick: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            "LocalDeals",
            style = MaterialTheme.typography.displaySmall,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        Text(
            "Promote Your Business Locally",
            style = MaterialTheme.typography.bodyMedium
        )

        Spacer(modifier = Modifier.height(48.dp))

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier.fillMaxWidth(),
            visualTransformation = PasswordVisualTransformation()
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = { onSignInClick(email, password) },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
        ) {
            Text("Sign In")
        }

        Spacer(modifier = Modifier.height(16.dp))

        TextButton(onClick = onSignUpClick) {
            Text("Don't have an account? Sign Up")
        }
    }
}

@Composable
fun SignUpScreen(
    onSignUpClick: (email: String, password: String, fullName: String) -> Unit,
    onBackClick: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var fullName by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            "Create Account",
            style = MaterialTheme.typography.displaySmall,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        OutlinedTextField(
            value = fullName,
            onValueChange = { fullName = it },
            label = { Text("Full Name") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier.fillMaxWidth(),
            visualTransformation = PasswordVisualTransformation()
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = { onSignUpClick(email, password, fullName) },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
        ) {
            Text("Create Account")
        }

        Spacer(modifier = Modifier.height(16.dp))

        TextButton(onClick = onBackClick) {
            Text("Already have an account? Sign In")
        }
    }
}
