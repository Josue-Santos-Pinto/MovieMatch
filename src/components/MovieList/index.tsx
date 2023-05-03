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

type listType = {
  id: number;
  backdrop_path: string;
  original_language: string;
  title: string;
  overview: string;
};

type propsType = {
  name: string;
};

export function MovieList({ name }: propsType) {
  const [list, setList] = useState<listType[]>([]);
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
      case 'Trendind now':
        getTrendingMovieList();
        break;
      case 'Top Rated':
        getTopRatedMovieList();
        break;
    }
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <MoviesListArea>
      <MovieCatArea>
        <MovieCatName>{name}</MovieCatName>
        <MovieCatSeeMore>See all</MovieCatSeeMore>
      </MovieCatArea>
      <MovieItemArea>
        <Scroller horizontal showsHorizontalScrollIndicator={false}>
          {loading == false &&
            list.length > 0 &&
            list.map((item, index) => (
              <MovieItem key={item.id}>
                <MovieImg source={{ uri: IMG + item.backdrop_path }} />
              </MovieItem>
            ))}
        </Scroller>
      </MovieItemArea>
    </MoviesListArea>
  );
}
