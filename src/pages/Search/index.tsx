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
  ScrollToTopButton,
  NotFoundArea,
  NotFoundText,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';
import { FlatList, Dimensions } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { FooterList } from '../../components/FooterList';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackProps } from '../../routes/MainStack';
import { ScrollProps } from '../Home';
export function Search() {
  const route = useRoute<RouteProp<RootStackProps, 'Search'>>();

  const [list, setList] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigation = useNavigation();

  const length = list.length;

  const screenHeight = Dimensions.get('screen').height;

  const [query, setQuery] = useState(route.params?.query);

  const loadApi = async () => {
    if (loading == true) {
      return;
    }
    if (page > totalPage) {
      return;
    } else {
      setLoading(true);

      const response = await api.getSearchedMovie(query, page);
      setList([...list, ...response.results]);
      setPage(page + 1);
      setTotalPage(response.total_pages);
      setLoading(false);
    }
  };

  const searchNewMovie = async () => {
    if (search != '') {
      setLoading(true);
      setPage(1);
      let res = await api.getSearchedMovie(search, page);
      setQuery(search);
      setList(res.results);
      setTotalPage(res.total_pages);
      setLoading(false);
    }
  };

  const scrollPercentage = ({ contentSize, contentOffset, layoutMeasurement }: ScrollProps) => {
    const visibleContent = Math.ceil((screenHeight / contentSize.height) * 100);
    const value = ((layoutMeasurement.height + contentOffset.y) / contentSize.height) * 100;
    setScrollPosition(value < visibleContent ? 0 : value);
  };

  useEffect(() => {
    loadApi();
  }, []);

  return (
    <Container>
      <HeaderArea>
        <HeaderAvatar onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={25} color="#fff" />
        </HeaderAvatar>
        <HeaderSearch>
          <HeaderSearchInputArea entering={FadeIn} exiting={FadeOut}>
            <HeaderSearchInput value={search} onChangeText={(e) => setSearch(e)} />
            <HeaderSearchInputButton onPress={searchNewMovie} activeOpacity={0.8}>
              <FontAwesome5 name="search" size={25} color="#fff" />
            </HeaderSearchInputButton>
          </HeaderSearchInputArea>
        </HeaderSearch>
      </HeaderArea>

      <SearchResultArea>
        <SearchResultText>Resultados para: </SearchResultText>

        <SearchResultMovie>{query}</SearchResultMovie>
      </SearchResultArea>

      <ScrollToTopButton
        onPress={() => this.flatListRef.scrollToOffset({ offset: 0, animated: true })}
        entering={FadeIn}
        exiting={FadeOut}
        activeOpacity={0.8}
        style={{ zIndex: 95, display: scrollPosition > 0 ? 'flex' : 'none' }}
      >
        <FontAwesome5 name="arrow-up" color="#fff" size={25} />
      </ScrollToTopButton>

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
            onScroll={(event) => scrollPercentage(event.nativeEvent)}
            ref={(ref) => {
              this.flatListRef = ref;
            }}
          />
        )}
        {!loading && list.length == 0 && (
          <NotFoundArea>
            <NotFoundText>Filme não encontrado</NotFoundText>
          </NotFoundArea>
        )}
      </MoviesList>
    </Container>
  );
}
