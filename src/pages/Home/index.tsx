import React, { useState, useEffect, createRef } from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderAvatar,
  HeaderSearch,
  HeaderSearchInput,
  HeaderSearchInputButton,
  GenresArea,
  GenresButton,
  GenresText,
  MoviesList,
  MovieBanner,
  HeaderSearchInputArea,
  ScrollToTopButton,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';
import { FlatList, Alert, Dimensions, ScrollView } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { FooterList } from '../../components/FooterList';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export type ScrollProps = {
  layoutMeasurement: {
    height: number;
  };
  contentOffset: {
    y: number;
  };
  contentSize: {
    height: number;
  };
};

export function Home() {
  const [list, setList] = useState<Movie[]>([]);
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [currentGenre, setCurrentGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigation = useNavigation();

  const screenHeight = Dimensions.get('screen').height;

  const length = list.length;

  const { data: genresData } = useQuery('genres', async () => {
    return await api.getGenresMovies();
  });

  const loadApi = async () => {
    if (loading == true) {
      return;
    }
    if (!hasMoreData) {
      return;
    } else {
      setLoading(true);

      const response = await api.getGenresMoviesList(currentGenre, page + 1);
      setList([...list, ...response.results]);
      setPage(page + 1);
      setLoading(false);
    }
  };
  const getMoviesList = async (id: number) => {
    let res = await api.getGenresMoviesList(id, page);
    setList(res.results);
    setCurrentGenre(id);
  };

  const searchMovie = () => {
    if (search.trim() != '') {
      navigation.navigate('Search', { query: search });
      setSearch('');
    } else {
      Alert.alert('Aviso', 'É necessário preencher o campo de pesquisa.');
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

  useEffect(() => {
    if (genresData) {
      setGenresList(genresData.genres);
    }
  }, [genresData]);

  useEffect(() => {
    if (page < 500) setHasMoreData(true);
  }, [page]);

  return (
    <Container>
      <HeaderArea>
        <HeaderAvatar></HeaderAvatar>
        <HeaderSearch>
          {showInput && (
            <HeaderSearchInputArea entering={FadeIn} exiting={FadeOut}>
              <HeaderSearchInput value={search} onChangeText={(e) => setSearch(e)} />
              <HeaderSearchInputButton onPress={searchMovie} activeOpacity={1}>
                <FontAwesome5 name="search" size={25} color="#fff" />
              </HeaderSearchInputButton>
            </HeaderSearchInputArea>
          )}
          {!showInput && (
            <HeaderSearchInputButton onPress={() => setShowInput(true)} activeOpacity={1}>
              <FontAwesome5 name="search" size={25} color="#fff" />
            </HeaderSearchInputButton>
          )}
        </HeaderSearch>
      </HeaderArea>
      <GenresArea>
        <Scroller horizontal showsHorizontalScrollIndicator={false}>
          {genresList != undefined &&
            genresList.map((item, index) => (
              <GenresButton
                key={item.id}
                onPress={() => getMoviesList(item.id)}
                active={item.id === currentGenre}
              >
                <GenresText active={item.id === currentGenre}>{item.name}</GenresText>
              </GenresButton>
            ))}
        </Scroller>
      </GenresArea>

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
        {list.length > 0 && (
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
      </MoviesList>
    </Container>
  );
}
