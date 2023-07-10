import React, { useState, useEffect } from 'react';
import { FlatList, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
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
  DailyMovieReload,
} from './styles';
import { IMG } from '../../keys';
import { Movie } from '../../models';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../../components/Loading';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
export function Home() {
  const navigation = useNavigation();
  const [randomMovieIndex, setRandomMovieIndex] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const generateRandomNumbers = () => {
    setPage(Math.floor(Math.random() * 500));
  };

  const { data, isLoading } = useQuery('trending', async () => {
    return await api.getTrendindMovies();
  });

  const { data: randomMovie } = useQuery<Movie[]>(['randomMovie', page], async () => {
    return await api.getRandomMovie(page);
  });

  const generateRandomIndex = () => {
    randomMovie
      ? setRandomMovieIndex(Math.floor(Math.random() * randomMovie?.length))
      : setRandomMovieIndex(Math.floor(Math.random() * 20));
  };

  useEffect(() => {
    generateRandomNumbers();
    generateRandomIndex();
  }, []);
  const newRandomMovie = () => {
    generateRandomNumbers();
    generateRandomIndex();
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderArea>
          <HeaderLogoText>MovieMatch</HeaderLogoText>
        </HeaderArea>
        {randomMovie && (
          <DailyMovie
            onPress={() =>
              navigation.navigate('MovieItem', {
                id: randomMovie[randomMovieIndex].id,
                platform: 'movie',
              })
            }
            load={loading}
            activeOpacity={0.7}
          >
            {loading && <Loading load={loading} />}
            <DailyMovieImg
              source={{
                uri: `${
                  randomMovie[randomMovieIndex].backdrop_path
                    ? IMG + randomMovie[randomMovieIndex].backdrop_path
                    : 'https://firebasestorage.googleapis.com/v0/b/guitarstore-a2356.appspot.com/o/image-coming-soon-placeholder.png?alt=media&token=a192c2bb-1477-4350-944d-777cd225a33d'
                }`,
              }}
              onLoad={() => setLoading(false)}
              resizeMode="cover"
            />
            <DailyMovieInfo>
              <DailyMovieInfoText>Sugestão de filme: </DailyMovieInfoText>
              <DailyMovieInfoText>{randomMovie[randomMovieIndex].title}</DailyMovieInfoText>
            </DailyMovieInfo>
            <DailyMovieReload onPress={() => newRandomMovie()}>
              <FontAwesomeIcon name="refresh" size={25} color="#fff" />
            </DailyMovieReload>
          </DailyMovie>
        )}
        {!randomMovie && (
          <DailyMovie load={true} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Loading load={true} color="#fff" />
          </DailyMovie>
        )}
        <TrendingMoviesArea>
          <TrendingMoviesTitle>Filmes em Alta</TrendingMoviesTitle>
          <TrendingMovies>
            {data.results && data.results.length > 0 && (
              <FlatList
                data={data.results}
                renderItem={({ item, index }) => <ListItem data={item} platform="movie" />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </TrendingMovies>
        </TrendingMoviesArea>
      </ScrollView>
    </Container>
  );
}
