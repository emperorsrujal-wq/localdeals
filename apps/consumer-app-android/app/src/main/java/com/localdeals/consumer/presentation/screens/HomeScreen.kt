package com.localdeals.consumer.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp

@Composable
fun ConsumerHomeScreen() {
    var selectedCategory by remember { mutableStateOf("All") }
    var sortBy by remember { mutableStateOf("Nearest") }

    val categories = listOf("All", "Food", "Electronics", "Apparel", "Beauty", "Grocery", "Services")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("LocalDeals") },
                actions = {
                    IconButton(onClick = {}) {
                        Icon(Icons.Default.Search, contentDescription = "Search")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Search Bar
            SearchBar()

            // Category Tabs
            LazyRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(categories) { category ->
                    FilterChip(
                        selected = selectedCategory == category,
                        onClick = { selectedCategory = category },
                        label = { Text(category) }
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Sort Menu
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Sort:")
                Spacer(modifier = Modifier.width(8.dp))
                var expanded by remember { mutableStateOf(false) }
                Box {
                    TextButton(onClick = { expanded = true }) {
                        Text(sortBy)
                    }
                    DropdownMenu(
                        expanded = expanded,
                        onDismissRequest = { expanded = false }
                    ) {
                        DropdownMenuItem(
                            text = { Text("Nearest") },
                            onClick = { sortBy = "Nearest"; expanded = false }
                        )
                        DropdownMenuItem(
                            text = { Text("Popular") },
                            onClick = { sortBy = "Popular"; expanded = false }
                        )
                        DropdownMenuItem(
                            text = { Text("Newest") },
                            onClick = { sortBy = "Newest"; expanded = false }
                        )
                        DropdownMenuItem(
                            text = { Text("Highest Discount") },
                            onClick = { sortBy = "Highest Discount"; expanded = false }
                        )
                    }
                }
                Spacer(modifier = Modifier.weight(1f))
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Deals List
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(10) { _ ->
                    DealCardComposable()
                }
            }
        }
    }
}

@Composable
fun SearchBar() {
    var searchText by remember { mutableStateOf("") }

    OutlinedTextField(
        value = searchText,
        onValueChange = { searchText = it },
        placeholder = { Text("Search deals...") },
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        singleLine = true,
        leadingIcon = {
            Icon(Icons.Default.Search, contentDescription = "Search")
        }
    )
}

@Composable
fun DealCardComposable() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(250.dp)
    ) {
        Column {
            // Placeholder for image
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(150.dp)
                    .androidx.compose.material3.Surface(
                        color = MaterialTheme.colorScheme.surfaceVariant
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text("Deal Image")
            }

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(12.dp),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(
                                "Restaurant Name",
                                style = MaterialTheme.typography.titleSmall
                            )
                            Text(
                                "2.3 km away",
                                style = MaterialTheme.typography.labelSmall
                            )
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            Text(
                                "30% OFF",
                                style = MaterialTheme.typography.titleSmall,
                                color = MaterialTheme.colorScheme.error
                            )
                            Text(
                                "\$10.99",
                                style = MaterialTheme.typography.labelSmall,
                                textDecoration = TextDecoration.LineThrough
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        "Amazing Pizza Deal - Buy 1 Get 1 Free",
                        style = MaterialTheme.typography.bodySmall,
                        maxLines = 2
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        IconButton(onClick = {}, modifier = Modifier.size(36.dp)) {
                            Text("❤️")
                        }
                        IconButton(onClick = {}, modifier = Modifier.size(36.dp)) {
                            Text("📤")
                        }
                    }

                    Text(
                        "Expires in 2 days",
                        style = MaterialTheme.typography.labelSmall
                    )
                }
            }
        }
    }
}

@Composable
private fun androidx.compose.material3.Surface(
    color: androidx.compose.material3.Color,
    content: @Composable () -> Unit = {}
) {
    Box(modifier = Modifier.background(color)) {
        content()
    }
}
