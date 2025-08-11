import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { getMovieDetails } from "../services/tmdb";
import { Movie } from "../types/movie";

export default function MovieDetailScreen({ route }: any) {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (!movie) return <Text>No data found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.info}>⭐ {movie.vote_average} | {movie.release_date}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  poster: { width: 250, height: 370, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 10, textAlign: "center" },
  info: { fontSize: 14, color: "gray", marginTop: 5 },
  overview: { fontSize: 14, marginTop: 15, textAlign: "justify" },
});
