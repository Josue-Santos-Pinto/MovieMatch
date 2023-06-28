import React, { useState, useEffect } from 'react';
import { FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { ListItem } from '../../components/ListItem';

import {
  Container,
  HeaderArea,
  HeaderLogoText,
  DailyMovie,
  TrendingMoviesArea,
  TrendingMoviesTitle,
  TrendingMovies,
  DailyMovieImg,
  DailyMovieInfo,
  DailyMovieInfoText,
} from './styles';
import { IMG } from '../../keys';
import { Movie } from '../../models';

export function Home() {
  const [randomMovieIndex, setRandomMovieIndex] = useState<number>(0);

  const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 500);
  };

  const { data, isLoading } = useQuery('trending', async () => {
    return await api.getTrendindMovies();
  });

  const { data: randomMovie } = useQuery<Movie[]>('randomMovie', async () => {
    return await api.getRandomMovie(generateRandomNumbers());
  });

  useEffect(() => {
    randomMovie
      ? setRandomMovieIndex(Math.floor(Math.random() * randomMovie?.length))
      : setRandomMovieIndex(Math.floor(Math.random() * 20));
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  console.log(randomMovieIndex);

  return (
    <Container>
      <HeaderArea>
        <HeaderLogoText>MovieMatch</HeaderLogoText>
      </HeaderArea>
      {randomMovie && (
        <DailyMovie>
          <DailyMovieImg
            source={{ uri: `${IMG}${randomMovie[randomMovieIndex].backdrop_path}` }}
            resizeMode="cover"
          />
          <DailyMovieInfo>
            <DailyMovieInfoText>Sugestão de filme: </DailyMovieInfoText>
            <DailyMovieInfoText>{randomMovie[randomMovieIndex].title}</DailyMovieInfoText>
          </DailyMovieInfo>
        </DailyMovie>
      )}
      <TrendingMoviesArea>
        <TrendingMoviesTitle>Filmes em Alta</TrendingMoviesTitle>
        <TrendingMovies>
          {data.results && data.results.length > 0 && (
            <FlatList
              data={data.results}
              renderItem={({ item, index }) => <ListItem data={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </TrendingMovies>
      </TrendingMoviesArea>
    </Container>
  );
}
