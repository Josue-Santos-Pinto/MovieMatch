import React, { useState, useEffect } from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderAvatar,
  HeaderSearch,
  HeaderSearchInput,
  HeaderSearchInputButton,
  MoviesList,
  MovieBanner,
  HeaderSearchInputArea,
  SearchResultArea,
  SearchResultText,
  SearchResultMovie,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';
import { FlatList } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { FooterList } from '../../components/FooterList';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackProps } from '../../routes/MainStack';
export function Search() {
  const [list, setList] = useState<Movie[]>([]);
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [currentGenre, setCurrentGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);

  const length = list.length;
  const route = useRoute<RouteProp<RootStackProps>>();

  const query = route.params?.query;

  console.log(query);

  const loadApi = async () => {
    if (loading == true) {
      return;
    }
    if (page > totalPage) {
      return;
    } else if (query) {
      setLoading(true);

      const response = await api.getSearchedMovie(query, page);
      setList([...list, ...response.results]);
      setPage(page + 1);
      setTotalPage(response.results.total_page);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApi();
  }, []);

  return (
    <Container>
      <HeaderArea>
        <HeaderAvatar></HeaderAvatar>
        <HeaderSearch>
          <HeaderSearchInputArea entering={FadeIn} exiting={FadeOut}>
            <HeaderSearchInput value={search} onChangeText={(e) => setSearch(e)} />
            <HeaderSearchInputButton onPress={() => {}} activeOpacity={1}>
              <FontAwesome5 name="search" size={25} color="#fff" />
            </HeaderSearchInputButton>
          </HeaderSearchInputArea>
        </HeaderSearch>
      </HeaderArea>

      <SearchResultArea>
        <SearchResultText>Resultados para: </SearchResultText>

        <SearchResultMovie>{`${query}`}</SearchResultMovie>
      </SearchResultArea>

      <MoviesList>
        {list && (
          <FlatList
            data={list}
            renderItem={({ item, index }) => <ListItem data={item} isLast={index === length - 1} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            onEndReached={loadApi}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<FooterList load={loading} />}
          />
        )}
      </MoviesList>
    </Container>
  );
}
