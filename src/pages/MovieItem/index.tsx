import React, { useState, useEffect } from 'react';
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
} from './styles';

import api from '../../services/api';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackProps } from '../../routes/MainStack';
import { IMG } from '../../keys';
import { Movie, Provider } from '../../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export function MovieItem() {
  const route = useRoute<RouteProp<RootStackProps, 'MovieItem'>>();

  const id = route.params.id;
  const navigation = useNavigation();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [flatrateProvider, setFlatrateProvider] = useState<Provider[] | null>(null);
  const [rentProvider, setRentProvider] = useState<Provider[] | null>(null);
  const [buyProvider, setBuyProvider] = useState<Provider[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadApi = async () => {
    setLoading(true);
    let res = await api.getMovieDetail(id);

    setMovie(res);
    setLoading(false);
  };
  const getProviders = async () => {
    setLoading(true);
    let res = await api.getProviders(id);
    if (res.results.PT != undefined) {
      setFlatrateProvider(res.results.PT.flatrate);
      setRentProvider(res.results.PT.rent);
      setBuyProvider(res.results.PT.buy);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadApi();
    getProviders();
  }, []);

  return (
    <Container>
      <Scroller showsVerticalScrollIndicator={false}>
        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5Icon name="arrow-left" size={25} color="#fff" />
        </BackButton>
        {movie && (
          <>
            <BannerArea>
              <BannerImg source={{ uri: `${IMG}${movie.poster_path}` }} resizeMode="contain" />
            </BannerArea>
            <TitleArea>
              <Title>{movie.title}</Title>
            </TitleArea>
            <DescArea>
              {movie.overview ? (
                <DescText>{movie.overview}</DescText>
              ) : (
                <MaterialCommunityIcons name="movie-off" size={40} color="#fff" />
              )}
            </DescArea>
            <WhereWatchArea>
              <WhereWatchText>Onde Assistir</WhereWatchText>
              {!loading && flatrateProvider && (
                <>
                  <ProviderArea>
                    <ProviderText>Assinatura mensal</ProviderText>
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
                    <ProviderText>Aluguel</ProviderText>
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
                    <ProviderText>Compra</ProviderText>
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
                    Provedor não encontrado!!
                  </WhereWatchText>
                </WhereWatchArea>
              )}
          </>
        )}
      </Scroller>
    </Container>
  );
}
