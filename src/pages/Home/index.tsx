import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderAvatar, HeaderSearch } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MovieList } from '../../components/MovieList';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';
export function Home() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const { data: genresData } = useQuery('genres', async () => {
    return await api.getGenresMovies();
  });
  useEffect(() => {
    if (genresData) {
      setGenres(genresData.genres);
    }
  }, [genresData]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderAvatar></HeaderAvatar>
          <HeaderSearch>
            <FontAwesome5 name="search" size={25} color="#fff" />
          </HeaderSearch>
        </HeaderArea>

        <MovieList name="Trending now" id={1} />
        <MovieList name="Top Rated" id={2} />
        <MovieList name="Action" id={28} />
        <MovieList name="Adventure" id={12} />
        <MovieList name="Animation" id={16} />
        <MovieList name="Comedy" id={35} />
        <MovieList name="Drama" id={18} />
        <MovieList name="Horror" id={27} />
      </Scroller>
    </Container>
  );
}
