import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieListScreen from "./screens/MovieListScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CineVista" component={MovieListScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: "Movie Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
