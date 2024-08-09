const apiBaseTopRated =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=b355159e8ac072215bde27f212189560";

export async function fetchTopRatedMovies(page: number) {
  try {
    const res = await fetch(apiBaseTopRated + `&page=${page}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const apiBaseByTitle =
  "https://api.themoviedb.org/3/search/movie?api_key=b355159e8ac072215bde27f212189560";

export async function fetchMoviesByTitle(title: string, page: number) {
  try {
    const res = await fetch(`${apiBaseByTitle}&query=${title}&page=${page}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchMovieById(id: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie${id}?api_key=b355159e8ac072215bde27f212189560`
    );
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error(error);
    return { success: false, message: error.message };
  }
}
