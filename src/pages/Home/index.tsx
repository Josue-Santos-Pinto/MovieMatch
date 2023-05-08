import React, { useState, useEffect } from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderAvatar,
  HeaderSearch,
  MoviesList,
  MovieBanner,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';
import { FlatList } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { FooterList } from '../../components/FooterList';
export function Home() {
  const [list, setList] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadApi = async () => {
    if (isLoading == true) {
      return;
    } else {
      setIsLoading(true);
      const response = await api.getTopMovies(page);

      setList([...list, ...response.results]);
      setPage(page + 1);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadApi();
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const length = list.length;

  return (
    <Container>
      <HeaderArea>
        <HeaderAvatar></HeaderAvatar>
        <HeaderSearch>
          <FontAwesome5 name="search" size={25} color="#fff" />
        </HeaderSearch>
      </HeaderArea>
      <MoviesList>
        <FlatList
          data={list}
          renderItem={({ item, index }) => <ListItem data={item} isLast={index === length - 1} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={loadApi}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<FooterList load={isLoading} />}
        />
      </MoviesList>
    </Container>
  );
}
