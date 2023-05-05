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
  id?: number;
};

export function MovieList({ name, id }: propsType) {
  const [list, setList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const getTrendingMovieList = async () => {
    setLoading(true);
    let res = await api.getMovies();
    setList(res.results);
    setLoading(false);
  };

  const getTopRatedMovieList = async () => {
    setLoading(true);
    let res = await api.getTopMovies();
    setList(res.results);
    setLoading(false);
  };
  const getGenreMovieList = async (number: number) => {
    setLoading(true);
    let res = await api.getGenresMoviesList(number);
    setList(res.results);
    setLoading(false);
  };

  useEffect(() => {
    switch (id) {
      case 1:
        getTrendingMovieList();
        break;
      case 2:
        getTopRatedMovieList();
        break;
      case 28:
        //Action
        getGenreMovieList(28);
        break;
      case 12:
        //Adventure
        getGenreMovieList(12);
        break;
      case 16:
        //Animation
        getGenreMovieList(16);
        break;
      case 35:
        //Comedy
        getGenreMovieList(35);
        break;
      case 18:
        //Drama
        getGenreMovieList(18);
        break;
      case 27:
        //Horror
        getGenreMovieList(27);
        break;
      case 10749:
        //Romance
        getGenreMovieList(10749);
        console.log(list);
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
          {list.length > 0 &&
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
