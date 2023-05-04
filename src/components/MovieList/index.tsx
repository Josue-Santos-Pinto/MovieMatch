import React, { useState, useEffect } from 'react';
import {
  MovieCatArea,
  MovieCatName,
  MovieCatSeeMore,
  MovieImg,
  MovieItem,
  MovieItemArea,
  MoviesListArea,
  Scroller,
} from './styles';
import api from '../../services/api';
import { IMG } from '../../keys';
import { Movie } from '../../models';

type propsType = {
  name: string;
  movies?: Movie[];
};

export function MovieList({ name, movies }: propsType) {
  const [list, setList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const getTrendingMovieList = async () => {
    setLoading(true);
    const res = await api.getMovies();
    setList(res.results);
    setLoading(false);
  };

  const getTopRatedMovieList = async () => {
    setLoading(true);
    const res = await api.getTopMovies();
    setList(res.results);
    setLoading(false);
  };

  useEffect(() => {
    switch (name) {
      case 'Trending now':
        getTrendingMovieList();
        break;
      case 'Top Rated':
        getTopRatedMovieList();
        break;
    }
  }, []);

  return (
    <MoviesListArea>
      <MovieCatArea>
        <MovieCatName>{name}</MovieCatName>
        <MovieCatSeeMore>See all</MovieCatSeeMore>
      </MovieCatArea>
      <MovieItemArea>
        <Scroller horizontal showsHorizontalScrollIndicator={false}>
          {name != 'Trending now' &&
            name != 'Top Rated' &&
            movies != undefined &&
            movies.map((item, index) => (
              <MovieItem key={item.id}>
                <MovieImg source={{ uri: IMG + item.poster_path }} />
              </MovieItem>
            ))}

          {list != undefined &&
            list.map((item, index) => (
              <MovieItem key={item.id}>
                <MovieImg source={{ uri: IMG + item.poster_path }} />
              </MovieItem>
            ))}
        </Scroller>
      </MovieItemArea>
    </MoviesListArea>
  );
}
