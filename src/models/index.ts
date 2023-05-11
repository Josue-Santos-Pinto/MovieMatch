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
