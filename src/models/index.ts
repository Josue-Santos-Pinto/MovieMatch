export type Movie = {
  genreId: number;
  title: string;
  genre_ids: number[];
  id: number;
  poster_path: string;
  original_language: string;
  overview: string;
  vote_average: number;
};

export type Genre = {
  id: number;
  name: string;
};
