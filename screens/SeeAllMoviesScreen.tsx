// SeeAllMoviesScreen.tsx
// Purpose: Displays a simple grid view of all movies passed via navigation params.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Movie } from '../types/movie';

// ---- Component ---- //
export default function SeeAllMoviesScreen({ route, navigation }: any) {

  // ---- Route Params ---- //
  const { title, movies }: { title: string; movies: Movie[] } = route.params;

  // ---- Render single movie card ---- //
  const renderMovieItem = ({ item }: { item: Movie }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* Screen Title */}
      <Text style={styles.header}>{title}</Text>

      {/* Grid list of movies */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        renderItem={renderMovieItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


// ---- Styles ---- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 16
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 12
  },
  columnWrap: {
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  card: {
    marginBottom: 16,
    width: '48%'
  },
  poster: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#222'
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6
  }
});

