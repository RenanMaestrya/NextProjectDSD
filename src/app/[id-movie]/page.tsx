"use client";
import { fetchMovieById } from "@/lib/fetch";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (param.id) {
      const fetchMovie = async (id: string) => {
        try {
          const movieData = await fetchMovieById(id);
          setMovie(movieData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMovie(param?.id[0]);
    }
  }, [param.id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Rating: {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );
}
