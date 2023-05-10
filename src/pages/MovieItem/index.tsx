import React, { useState, useEffect } from 'react';
import { Container, Scroller, BannerArea, BannerImg, Title, TitleArea } from './styles';

import api from '../../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackProps } from '../../routes/MainStack';
import { IMG } from '../../keys';
import { Movie } from '../../models';

export function MovieItem() {
  const route = useRoute<RouteProp<RootStackProps, 'MovieItem'>>();

  const id = route.params.id;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const loadApi = async () => {
    setLoading(true);
    let res = await api.getMovieDetail(id);

    setMovie(res);
    setLoading(false);
  };
  useEffect(() => {
    loadApi();
  }, []);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <Container>
      <Scroller showsVerticalScrollIndicator={false}>
        {movie && (
          <>
            <BannerArea>
              <BannerImg source={{ uri: `${IMG}${movie.backdrop_path}` }} resizeMode="cover" />
            </BannerArea>
            <TitleArea>
              <Title>{movie.title}</Title>
            </TitleArea>
          </>
        )}
      </Scroller>
    </Container>
  );
}
