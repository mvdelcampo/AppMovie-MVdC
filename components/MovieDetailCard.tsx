import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { WebView } from 'react-native-webview';

interface MovieDetailCardProps {
  movie: string;
  description: string;
  posterURL: string;
  genre: string;
  rating: string;
  ratingDescription: string;
  trailerURL: string | null;
  shows: Array<{ date: string; timeToDisplay: string; formatLang: string; screenName: string }>;
  selectedComplejo: string;
}

const MovieDetailCard: React.FC<MovieDetailCardProps> = ({
  movie,
  description,
  posterURL,
  genre,
    rating,
  ratingDescription,
    trailerURL,
  shows,
  selectedComplejo
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie}</Text>

      <Image
        source={{ uri: posterURL }}
        style={styles.poster}
        contentFit="cover"
      />
      <Text style={styles.subtitle}>Género</Text>
      <Text style={styles.genre}>{genre}</Text>

      <Text style={styles.subtitle}>Descripción</Text>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.subtitle}>Calificación</Text>
      <Text style={styles.description}>
        {rating || "No disponible"}
          </Text>
          <Text style={styles.description}>
        {ratingDescription || "No disponible"}
      </Text>

      {trailerURL && (
        <>
          <Text style={styles.subtitle}>Trailer</Text>
          <WebView
            source={{ uri: trailerURL }}
            style={styles.trailer}
            allowsFullscreenVideo
          />
        </>
          )}
          
          {/* Sección de Funciones */}
      {shows?.length > 0 && (
        <>
          <Text style={styles.subtitle}>Funciones - {selectedComplejo} </Text>
          {shows.map((show, index) => (
            <View key={index} style={styles.showContainer}>
              <Text style={styles.showTime}>{show.timeToDisplay}</Text>
              <Text style={styles.showDetails}>
                {show.formatLang} - {show.screenName}
              </Text>
            </View>
          ))}
        </>
          )}
          
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },
  poster: {
    width: '100%',
    height: 600,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
  genre: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  trailer: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    },
    showContainer: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
      },
      showTime: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      },
      showDetails: {
        fontSize: 16,
        color: '#ccc',
      },
});

export default MovieDetailCard;
