export type Movie = {
  genreId: number;
  title: string;
  genre_ids: number[];
  id: number;
  poster_path: string;
  original_language: string;
  overview: string;
};

export type Genre = {
  id: number;
  name: string;
};
