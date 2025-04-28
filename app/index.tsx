import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function Index() {
  const [selectedComplejo, setSelectedComplejo] = useState<string | null>(null);
  const [moviesData, setMoviesData] = useState<{ contentCinemaShows: any[] }>({ contentCinemaShows: [] });
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.movie.com.uy/api/shows/rss/data");
        const json = await response.json();
        setMoviesData(json); // Guarda todo el JSON
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getMoviesForSelectedComplejo = () => {
    if (!selectedComplejo) return [];
  
    return moviesData.contentCinemaShows.filter((movie: any) =>
      movie.cinemaShows.some(
        (cinemaShow: any) =>
          cinemaShow.cinema.toLowerCase() === selectedComplejo.toLowerCase()
      )
    );
  };  

  const moviesToShow = getMoviesForSelectedComplejo();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onSelectComplejo={setSelectedComplejo} />

      {selectedComplejo && moviesToShow.length > 0 ? (
        <FlatList
          data={moviesToShow}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItem}
              onPress={() => {
                router.push({
                  pathname: "/movie/[id]",
                  params: {
                    id: item.movie,
                    movie: item.movie,
                    description: item.description,
                    posterURL: item.posterURL,
                    trailerURL: item.trailerURL,
                    genre: item.genre,
                    cinemaShows: JSON.stringify(item.cinemaShows),
                    selectedComplejo
                  },
                });
              }}
            >
              <Image
                source={{
                  uri: item.posterURL
                }}
                style={styles.poster}
                contentFit="cover"
              />
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{item.movie}</Text>
                <Text style={styles.movieGenre}>{item.genre}</Text>
                <Text style={styles.movieDesc}
                  numberOfLines={6} // limita a 6 lineas
                  ellipsizeMode="tail" // pone "..." al final
                >{item.description}</Text>
              </View>
              </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../assets/images/movie-logo.jpg")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 80,
  },
  movieItem: {
    flexDirection: "row",
    backgroundColor: "#222",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  poster: {
    width: 120,
    height: 200,
    borderRadius: 8,
  },
  movieInfo: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "center",
  },
  movieTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieDesc: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 2,
  },
  movieGenre: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 2,
    fontWeight: "bold",
  },
});