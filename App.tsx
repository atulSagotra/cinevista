// App.tsx
// Entry point for the React Native movie application.
// Sets up navigation stack and links to all major screens.
// Author: <Your Name>

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ---- Screens ---- //

import SeeAllMoviesScreen from "./screens/SeeAllMoviesScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import HomeScreen from "./screens/ HomeScreen";

// ---- Navigation Stack Config ---- //
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#111" }, // dark theme header
          headerTintColor: "#fff",                   // white text/icons
          headerTitleStyle: { fontWeight: "bold" }   // bold title text
        }}
      >
        {/* Home Screen: main landing page with carousel + coming soon */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // we use a custom header inside HomeScreen
        />

        {/* Grid view of movies from a given category */}
        <Stack.Screen
          name="SeeAllMovies"
          component={SeeAllMoviesScreen}
          options={{ title: "All Movies" }}
        />

        {/* Detailed view for a selected movie */}
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{ title: "Movie Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
