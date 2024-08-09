"use client";
import { IconProps, MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchMoviesByTitle, fetchTopRatedMovies } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchTopRated(page: number = 1) {
    try {
      const data: RootObject = await fetchTopRatedMovies(page);
      setMovies(data.results || []);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchSearchMovies(title: string, page: number = 1) {
    try {
      const data: RootObject = await fetchMoviesByTitle(title, page);
      setMovies(data.results || []);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  }
  function handleNextPage() {
    if (page === totalPages) return;
    if (searchTitle) fetchSearchMovies(searchTitle, page + 1);
    else fetchTopRated(page + 1);
  }
  function handlePreviousPage() {
    if (page === 1) return;
    if (searchTitle) fetchSearchMovies(searchTitle, page - 1);
    else fetchTopRated(page - 1);
  }

  useEffect(() => {
    fetchTopRated(1);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="pl-10 pr-4 py-2 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchSearchMovies(searchTitle);
              }
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            key={movie.id}
            vote_average={movie.vote_average}
            // onClick={() => {}}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationItem>{page}</PaginationItem>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationItem>{totalPages}</PaginationItem>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function SearchIcon(props: IconProps) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
