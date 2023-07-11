type Genres = {
  id: number;
  name: string;
};

export type Movie = {
  genreId: number;
  title: string;
  genre_ids: number[];
  id: number;
  poster_path: string;
  original_language: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  genres: Genres[];
  image?: string;
  movie_number: string;
};

export type Serie = {
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  genres: Genres[];
  id: number;
  in_production: boolean;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  poster_path: string;
  vote_average: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
};
