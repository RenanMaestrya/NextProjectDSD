"use client";
import { IconProps } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { fetchMovieById } from "@/lib/fetch";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

export default function MovieDetailsPage() {
  const pathname = usePathname();
  const [movie, setMovie] = useState<MovieDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchMovie(id: string) {
    setLoading(true);
    try {
      const movieData = await fetchMovieById(id);
      setMovie(movieData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleBackClick() {
    window.history.back();
  }

  useEffect(() => {
    fetchMovie(pathname);
  }, [pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie ? movie.title : "Movie Poster"}
            width={300}
            height={450}
            className="w-full h-[450px] object-cover rounded-lg"
            style={{ aspectRatio: "300/450", objectFit: "cover" }}
            priority={true}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <ThumbsUpIcon className="w-4 h-4 fill-primary" />
              <span>Vote Average: {movie?.vote_average}</span>
            </div>
          </div>
          <div className="prose mb-8">
            <p>{movie?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ThumbsUpIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
