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
} from './styles';

import api from '../../services/api';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { IMG } from '../../keys';
import { Movie, Provider } from '../../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import { RootTabProps } from '../../routes/MainTab';
import { useQuery } from 'react-query';
import { ListItem } from '../../components/ListItem';

export function MovieItem() {
  const route = useRoute<RouteProp<RootTabProps, 'MovieItem'>>();

  const id = route.params.id;
  const navigation = useNavigation();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [formatedDate, setFormatedDate] = useState('');
  const [flatrateProvider, setFlatrateProvider] = useState<Provider[] | null>(null);
  const [rentProvider, setRentProvider] = useState<Provider[] | null>(null);
  const [buyProvider, setBuyProvider] = useState<Provider[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: movieDetail } = useQuery<Movie>(['movieDetail', id], async () => {
    return await api.getMovieDetail(id);
  });

  const { data: relatedMovie } = useQuery(['relatedMovie', id], async () => {
    return await api.getRelatedMovie(id);
  });
  console.log(movieDetail);

  const getProviders = async () => {
    setLoading(true);
    let res = await api.getProviders(id);
    if (res.results.US != undefined) {
      setFlatrateProvider(res.results.US.flatrate);
      setRentProvider(res.results.US.rent);
      setBuyProvider(res.results.US.buy);
    }
    setLoading(false);
  };

  const formatDate = (data: string) => {
    const date = new Date(data);
    let day = date.getDate();
    let month = date.toLocaleString('pt-BR', { month: 'long' });
    let year = date.getFullYear();
    setFormatedDate(`${day} de ${month}, ${year}`);
  };

  useEffect(() => {
    getProviders();
    if (movieDetail) formatDate(movieDetail.release_date);
  }, [id]);

  return (
    <Container>
      <Scroller showsVerticalScrollIndicator={false}>
        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
        </BackButton>
        {movieDetail && (
          <>
            <BannerArea>
              <BannerImg
                source={{
                  uri: `${
                    movieDetail.backdrop_path
                      ? IMG + movieDetail.backdrop_path
                      : 'https://firebasestorage.googleapis.com/v0/b/guitarstore-a2356.appspot.com/o/image-coming-soon-placeholder.png?alt=media&token=a192c2bb-1477-4350-944d-777cd225a33d'
                  }`,
                }}
                resizeMode="cover"
              />
            </BannerArea>
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
                <ReleaseArea>
                  <ReleaseTitle>Data de lançamento</ReleaseTitle>
                  <ReleaseDate>{formatedDate}</ReleaseDate>
                </ReleaseArea>
                <GenresArea>
                  <GenresTitle>Gêneros</GenresTitle>
                  <GenreList>
                    {movieDetail.genres.map((item, index) => (
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

              <RelatedMoviesArea>
                <RelatedMoviesTitle>Filmes Relacionados: </RelatedMoviesTitle>
                <RelatedMovies>
                  {relatedMovie && relatedMovie.results && relatedMovie.results.length > 0 && (
                    <FlatList
                      data={relatedMovie.results}
                      renderItem={({ item, index }) => <ListItem data={item} size="small" />}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </RelatedMovies>
              </RelatedMoviesArea>
            </MovieInfo>

            <WhereWatchArea>
              <WhereWatchText>Onde assistir: </WhereWatchText>
              {!loading && flatrateProvider && (
                <>
                  <ProviderArea>
                    <ProviderText>Flat rate</ProviderText>
                    <Scroller horizontal showsHorizontalScrollIndicator={false}>
                      {flatrateProvider.map((item, index) => (
                        <ProviderImgArea key={item.provider_id}>
                          <ProviderImg
                            source={{ uri: `${IMG}${item.logo_path}` }}
                            resizeMode="contain"
                          />
                        </ProviderImgArea>
                      ))}
                    </Scroller>
                  </ProviderArea>
                </>
              )}

              {!loading && rentProvider && (
                <>
                  <ProviderArea>
                    <ProviderText>Rent</ProviderText>
                    <Scroller horizontal showsHorizontalScrollIndicator={false}>
                      {rentProvider.map((item, index) => (
                        <ProviderImgArea key={item.provider_id}>
                          <ProviderImg
                            source={{ uri: `${IMG}${item.logo_path}` }}
                            resizeMode="contain"
                          />
                        </ProviderImgArea>
                      ))}
                    </Scroller>
                  </ProviderArea>
                </>
              )}

              {!loading && buyProvider && (
                <>
                  <ProviderArea>
                    <ProviderText>Buy</ProviderText>
                    <Scroller horizontal showsHorizontalScrollIndicator={false}>
                      {buyProvider.map((item, index) => (
                        <ProviderImgArea key={item.provider_id}>
                          <ProviderImg
                            source={{ uri: `${IMG}${item.logo_path}` }}
                            resizeMode="contain"
                          />
                        </ProviderImgArea>
                      ))}
                    </Scroller>
                  </ProviderArea>
                </>
              )}
            </WhereWatchArea>
            {flatrateProvider == undefined &&
              rentProvider == undefined &&
              buyProvider == undefined && (
                <WhereWatchArea>
                  <WhereWatchText style={{ fontSize: 23, fontWeight: 'normal' }}>
                    Provider not found!!
                  </WhereWatchText>
                </WhereWatchArea>
              )}
          </>
        )}
      </Scroller>
    </Container>
  );
}
