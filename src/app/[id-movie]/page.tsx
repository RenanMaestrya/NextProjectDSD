"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

export default function MovieDetailsPage() {
  const param = useParams();
  console.log(param.id);
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     const fetchMovie = async () => {
  //       try {
  //         const movieData = await fetchMovieById(id as string);
  //         setMovie(movieData);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchMovie();
  //   }
  // }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h1>{}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Rating: {movie.vote_average}</p>
      <p>{movie.overview}</p>
      {/* Adicione outros detalhes do filme aqui */}
    </div>
  );
}
