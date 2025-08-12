import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getMovieDetails } from "../services/tmdb";
import { Movie } from "../types/movie";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

export default function MovieDetailScreen({ route }: any) {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Loader while fetching
  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#fff"
        style={{ flex: 1, marginTop: 100 }}
      />
    );
  if (!movie)
    return <Text style={{ color: "#fff" }}>No data found</Text>;

  // Helper for genres
  const genresString =
    Array.isArray(movie.genres) && movie.genres.length > 0
      ? movie.genres.map((g) => g.name).join(", ")
      : "Unknown Genre";

  // Relase Date: If your movie API returns credits, replace this with actual Release Date name(s)
  const release_date = movie.release_date || "N/A";

  // Release year
  const year = movie.release_date?.slice(0, 4);

  // Runtime formatted (147 → "2h 27m")
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  const handleBookNow = () => {
    Alert.alert("Booking Confirmed", "Movie is confirmed!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Poster image */}
        <View style={styles.posterWrapper}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
            resizeMode="cover"
          />
        </View>

        {/* Info card */}
        <View style={styles.card}>
          {/* Title & Genres */}
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.genres}>{genresString}</Text>

          {/* Released Date and Runtime */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{year}</Text>
            <Text style={styles.infoText}>· {runtime}</Text>
            <Text style={styles.infoText}>· ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</Text>
          </View>
          <Text style={styles.release_date}>Release Date: {release_date}</Text>

          {/* Synopsis */}
          <Text style={styles.sectionLabel}>Synopsis</Text>
          <Text style={styles.synopsis}>{movie.overview || "No synopsis provided."}</Text>

          {/* Cinema options */}
          <Text style={styles.sectionLabel}>Cinema</Text>
          <View style={styles.cinemaCard}>
            <Text style={styles.cinemaName}>HARTONO MALL CGV</Text>
            <Text style={styles.cinemaInfo}>4.53 Km | Jl. Ring Road Utara Jl. Kaliwar</Text>
          </View>
          <View style={[styles.cinemaCard, { backgroundColor: "#293C5D" }]}>
            <Text style={styles.cinemaName}>LIPPO PLAZA JOGJA CINEPOLIS</Text>
          </View>

          {/* Book Now */}
          <TouchableOpacity style={styles.bookNow} onPress={handleBookNow}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 24,
    backgroundColor: "#121212",
  },
  posterWrapper: {
    alignItems: "center",
    width: "100%",
    marginBottom: -60, // Pull up image for overlay effect
    zIndex: 2,
  },
  poster: {
    width: width,
    height: 250,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#192029",
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginTop: -60,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 24,
    zIndex: 2,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  genres: {
    color: "#ffa500",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 3,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
  },
  infoText: {
    color: "#bbb",
    fontSize: 13,
    marginHorizontal: 2,
  },
  release_date: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
    textAlign: "center",
  },
  sectionLabel: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  synopsis: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 20,
    marginBottom: 8,
  },
  castRow: {
    flexDirection: "row",
    marginVertical: 8,
    justifyContent: "flex-start",
    width: "100%",
  },
  castAvatarWrapper: {
    alignItems: "center",
    marginRight: 18,
    maxWidth: 68,
  },
  castAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#ffa500",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  castInitial: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  castName: {
    color: "#fff",
    fontSize: 12,
    maxWidth: 68,
    textAlign: "center",
  },
  cinemaCard: {
    backgroundColor: "#222E39",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 7,
    alignSelf: "stretch",
  },
  cinemaName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 3,
  },
  cinemaInfo: {
    color: "#a5a5a5",
    fontSize: 12,
  },
  bookNow: {
    marginTop: 18,
    backgroundColor: "#ffa500",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    elevation: 2,
  },
  bookNowText: {
    color: "#192029",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
