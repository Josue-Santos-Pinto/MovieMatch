import React, { useState, useEffect } from 'react';
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
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';
import { FlatList, Alert } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { FooterList } from '../../components/FooterList';
import Animated, {
  FadeIn,
  FadeOut,
  Keyframe,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutRight,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
export function Home() {
  const [list, setList] = useState<Movie[]>([]);
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [currentGenre, setCurrentGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showInput, setShowInput] = useState(false);

  const navigation = useNavigation();

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
      <MoviesList>
        <FlatList
          data={list}
          renderItem={({ item, index }) => <ListItem data={item} isLast={index === length - 1} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          onEndReached={loadApi}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<FooterList load={loading} />}
        />
      </MoviesList>
    </Container>
  );
}
