import React from 'react';
import { Container, Scroller, HeaderArea, HeaderAvatar, HeaderSearch } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MovieList } from '../../components/MovieList';

export function Home() {
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
      </Scroller>
    </Container>
  );
}
