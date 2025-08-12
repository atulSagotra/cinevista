// HomeScreen.tsx
// Purpose: Shows a carousel of "Now Playing" movies + a "Coming Soon" preview list.
// Notes: Updated with responsive poster sizes & slanted carousel side effect.

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions
} from 'react-native';

// Service calls
import { getNowPlayingMovies, getUpcomingMovies } from '../services/tmdb';
import { Movie } from '../types/movie';

// ---- Constants ---- //
const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.65; // ~65% of screen for each movie card
const SIDE_SPACING = (screenWidth - CARD_WIDTH) / 2;


// ---- Component ---- //
export default function HomeScreen({ navigation }: any) {

  // -- State -- //
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [comingSoon, setComingSoon] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ref for manually snapping carousel
  const flatListRef = useRef<FlatList>(null);

  // -- Fetch data on mount -- //
  useEffect(() => {
    (async () => {
      try {
        const now = await getNowPlayingMovies(); // current movies from API
        const soon = await getUpcomingMovies();  // upcoming movies list
        setNowPlaying(now);
        setComingSoon(soon);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // -- Carousel active index tracking -- //
  const handleScroll = (event: any) => {
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(currentIndex);
  };

  // Loading state UI
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#fff" style={{ flex: 1, marginTop: 100 }} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* ---- Header Section ---- */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Welcome Back 👋</Text>
          <Text style={styles.subGreeting}>Let’s relax and watch a movie.</Text>
        </View>
        <View style={styles.avatarCircle} /> 
      </View>

      {/* ---- Search Bar ---- */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search movie, cinema, genre..."
        placeholderTextColor="#aaa"
      />

      {/* ---- Scrollable Content ---- */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ===== Now Playing Section ===== */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Now Playing</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SeeAllMovies', { title: 'Now Playing', movies: nowPlaying })
            }
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* --- Carousel of Posters --- */}
        <FlatList
          ref={flatListRef}
          data={nowPlaying.slice(0, 5)} // limit to 5 for carousel effect
          keyExtractor={(item) => item.id.toString()}
          horizontal
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingHorizontal: SIDE_SPACING }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {

            const isActive = index === activeIndex;

            // Rotate side cards toward the center for 3D effect
            let tilt = '0deg';
            if (index < activeIndex) tilt = '20deg';
            if (index > activeIndex) tilt = '-20deg';

            return (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
                style={[
                  styles.carouselCard,
                  {
                    transform: [
                      { scale: isActive ? 1.0 : 0.92 },
                      { perspective: 800 }, // keeps 3D look
                      { rotateY: tilt }
                    ],
                    zIndex: isActive ? 2 : 1,
                  },
                ]}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.carouselPoster}
                />
                <Text style={styles.carouselTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* --- Pagination Dots for Carousel --- */}
        <View style={styles.dotsContainer}>
          {nowPlaying.slice(0, 5).map((_, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.dot, activeIndex === idx && styles.activeDot]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({ index: idx, animated: true });
                setActiveIndex(idx);
              }}
            />
          ))}
        </View>

        {/* ===== Coming Soon Section ===== */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
        </View>

        {/* --- Horizontal Movie List --- */}
        <FlatList
          data={comingSoon.slice(0, 5)}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingBottom: 32 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.comingSoonCard}
              onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.comingSoonPoster}
              />
              <Text style={styles.comingSoonTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
}


// ---- Styles ---- //
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 12,
  },
  greeting: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  subGreeting: { color: '#bbb', fontSize: 14, marginTop: 2 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#222' },

  searchBar: {
    backgroundColor: '#232323',
    borderRadius: 10,
    margin: 16,
    padding: 12,
    color: '#fff',
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: "#f39c12", fontSize: 14 },

  // Carousel
  carouselCard: {
    width: CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  carouselPoster: {
    width: '100%',
    aspectRatio: 2/3, // keeps poster ratio consistent across devices
    borderRadius: 18,
    backgroundColor: '#222',
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Pagination dots
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginHorizontal: 5,
  },
  activeDot: { backgroundColor: '#f39c12', width: 30, height: 10 },

  // Coming soon list
  comingSoonCard: { marginRight: 16, width: 120, alignItems: 'center' },
  comingSoonPoster: {
    width: 120,
    aspectRatio: 2/3,
    borderRadius: 14,
    backgroundColor: '#222',
  },
  comingSoonTitle: { color: '#fff', fontSize: 13, textAlign: 'center', marginTop: 6 },
});
