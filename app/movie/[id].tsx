import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import HeaderDetail from "../../components/HeaderDetail";
import MovieDetailCard from "../../components/MovieDetailCard";

export default function MovieDetail() {
    const { movie, description, posterURL, trailerURL, genre, cinemaShows, selectedComplejo } =
    useLocalSearchParams() as unknown as {
      movie: string;
      description: string;
      posterURL: string;
      trailerURL: string;
      genre: string;
      cinemaShows: string;
      selectedComplejo: string;
    };

  const parsedCinemaShows = cinemaShows ? JSON.parse(cinemaShows) : [];
    const rating = parsedCinemaShows?.[0]?.shows?.[0]?.rating;
  const ratingDescription = parsedCinemaShows?.[0]?.shows?.[0]?.ratingDescription;
  
  const filteredShows = parsedCinemaShows
  .filter((cinemaShow: any) => cinemaShow.cinema.toLowerCase() === selectedComplejo.toLowerCase())
  .flatMap((cinemaShow: any) => cinemaShow.shows);

    return (
      
        <>
            <HeaderDetail></HeaderDetail>
            <ScrollView style={{ flex: 1 , backgroundColor: "black"}}>
      <MovieDetailCard
        movie={movie}
        description={description}
        posterURL={posterURL}
        genre={genre}
                    rating={rating || "No disponible"}
                    ratingDescription={ratingDescription || "No disponible"}    
                    trailerURL={trailerURL}
            shows={filteredShows}
            selectedComplejo = {selectedComplejo}
      />
    </ScrollView>
    </>
    
  );
}
