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
    genres.map(async (item) => {
      let res = await api.getGenresMoviesList(item.id);
      setMovies(res.results);
    });
  }, [genres]);

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

        <MovieList name="Trending now" />
        <MovieList name="Top Rated" />
        {genres.map((item) => {
          return <MovieList key={item.id} name={item.name} movies={movies} />;
        })}
      </Scroller>
    </Container>
  );
}
