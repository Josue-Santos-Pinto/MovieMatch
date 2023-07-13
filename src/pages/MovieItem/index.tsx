import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Scroller,
  BannerArea,
  BannerImg,
  Title,
  TitleArea,
  DescArea,
  DescText,
  WhereWatchArea,
  WhereWatchText,
  ProviderArea,
  ProviderImg,
  ProviderImgArea,
  ProviderText,
  BackButton,
  MovieInfo,
  HeaderInfoArea,
  MovieDetails,
  DurationArea,
  Duration,
  RatedArea,
  Rated,
  ReleaseArea,
  ReleaseTitle,
  ReleaseDate,
  GenresArea,
  GenreButton,
  GenreButtonText,
  GenresTitle,
  GenreList,
  RelatedMoviesArea,
  RelatedMoviesTitle,
  RelatedMovies,
  FavoriteMovie,
} from './styles';

import api from '../../services/api';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { IMG } from '../../keys';
import { Movie, Provider, Serie } from '../../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import { RootTabProps } from '../../routes/MainTab';
import { useQuery } from 'react-query';
import { ListItem } from '../../components/ListItem';
import { Loading } from '../../components/Loading';
import { SerieItem } from '../../components/SerieItem';
import nodeApi from '../../services/nodeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import rootReducer from '../../redux/root-reducer';
import { RootState } from '../../redux/store';

export function MovieItem() {
  const route = useRoute<RouteProp<RootTabProps, 'MovieItem'>>();
  const navigation = useNavigation();

  const { id: userId, token } = useSelector((rootReducer: RootState) => rootReducer.userReducer);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  const id = route.params.id;
  const platform = route.params.platform;

  const { data: movieDetail, isLoading } = useQuery<Movie>(
    ['movieDetail', id],
    async () => {
      if (platform === 'movie') {
        return await api.getMovieDetail(id, platform);
      }
      return null;
    },
    {
      enabled: platform === 'movie',
    }
  );

  const { data: serieDetail } = useQuery<Serie>(
    ['serieDetail', id],
    async () => {
      if (platform === 'tv') {
        return await api.getMovieDetail(id, platform);
      }
      return null;
    },
    {
      enabled: platform === 'tv',
    }
  );

  const { data: relatedMovie } = useQuery(['relatedMovie', id], async () => {
    return await api.getRelatedMovie(id, platform);
  });

  const isFavorited = async () => {
    if (userId && token) {
      let res = await nodeApi.getFavMovies(userId, token);
      for (let i in res.movies) {
        if (res.movies[i].movie_number == id.toString()) {
          setFavorited(true);
        }
      }
    }
  };

  const favoriteHandle = async () => {
    if (movieDetail && userId && token) {
      let data = await nodeApi.postNewFavMovies(
        userId,
        token,
        id.toString(),
        movieDetail.vote_average,
        movieDetail.poster_path
      );
      if (data.newFavMovie) {
        setFavorited(true);
      } else {
        setFavorited(false);
      }
    }
  };

  const formatDate = (data: string) => {
    const date = new Date(data);
    let day = date.getDate();
    let month = date.toLocaleString('pt-BR', { month: 'long' });
    let year = date.getFullYear();
    return `${day} de ${month}, ${year}`;
  };

  useEffect(() => {
    isFavorited();
  }, [token]);

  return (
    <Container>
      <Scroller showsVerticalScrollIndicator={false}>
        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
        </BackButton>
        {movieDetail && !serieDetail && (
          <>
            <BannerArea>
              {loading && <Loading load={loading} />}
              <BannerImg
                source={{
                  uri: `${
                    movieDetail.backdrop_path
                      ? IMG + movieDetail.backdrop_path
                      : 'https://firebasestorage.googleapis.com/v0/b/guitarstore-a2356.appspot.com/o/image-coming-soon-placeholder.png?alt=media&token=a192c2bb-1477-4350-944d-777cd225a33d'
                  }`,
                }}
                resizeMode="cover"
                onLoad={() => setLoading(false)}
              />
            </BannerArea>
            {userId && token && (
              <FavoriteMovie onPress={() => favoriteHandle()}>
                <FontAwesome5Icon
                  name={favorited ? 'star' : 'star-o'}
                  size={20}
                  color={favorited ? 'yellow' : '#fff'}
                />
              </FavoriteMovie>
            )}
            <MovieInfo>
              <HeaderInfoArea>
                <TitleArea>
                  <Title>{movieDetail.title}</Title>
                </TitleArea>
                <MovieDetails>
                  <DurationArea>
                    <FontAwesome5Icon name="clock-o" size={12} color="#BBBBBB" />
                    <Duration>{movieDetail.runtime} minutos</Duration>
                  </DurationArea>
                  <RatedArea>
                    <FontAwesome5Icon name="star" size={12} color="#BBBBBB" />
                    <Rated>
                      {parseFloat(movieDetail.vote_average.toString()).toFixed(1)} (IMDb){' '}
                    </Rated>
                  </RatedArea>
                </MovieDetails>
              </HeaderInfoArea>
              <HeaderInfoArea
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 15,
                }}
              >
                {movieDetail.release_date && (
                  <ReleaseArea>
                    <ReleaseTitle>Data de lançamento</ReleaseTitle>
                    <ReleaseDate>{formatDate(movieDetail.release_date)}</ReleaseDate>
                  </ReleaseArea>
                )}

                <GenresArea>
                  <GenresTitle>Gêneros</GenresTitle>
                  <GenreList>
                    {movieDetail.genres &&
                      movieDetail.genres.map((item, index) => (
                        <GenreButton key={index}>
                          <GenreButtonText>{item.name}</GenreButtonText>
                        </GenreButton>
                      ))}
                  </GenreList>
                </GenresArea>
              </HeaderInfoArea>

              <DescArea>
                {movieDetail.overview ? (
                  <DescText>{movieDetail.overview}</DescText>
                ) : (
                  <MaterialCommunityIcons name="movie-off" size={40} color="#fff" />
                )}
              </DescArea>

              {relatedMovie && relatedMovie.results && relatedMovie.results.length > 0 && (
                <RelatedMoviesArea>
                  <RelatedMoviesTitle>Assista também:</RelatedMoviesTitle>
                  <RelatedMovies>
                    <FlatList
                      data={relatedMovie.results}
                      renderItem={({ item, index }) => (
                        <ListItem data={item} size="small" platform="movie" />
                      )}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </RelatedMovies>
                </RelatedMoviesArea>
              )}
            </MovieInfo>
          </>
        )}

        {/*SERIE DETAILS */}

        {serieDetail && !movieDetail && <SerieItem />}
      </Scroller>
    </Container>
  );
}
