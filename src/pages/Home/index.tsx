import React, { useState, useEffect } from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderAvatar,
  HeaderSearch,
  GenresArea,
  GenresButton,
  GenresText,
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
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);

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
      const response = await api.getTopMovies(page);

      setList([...list, ...response.results]);
      setPage(page + 1);
      setLoading(false);
    }
  };
  const getMoviesList = async (id: number) => {
    let res = await api.getGenresMoviesList(id, page);
    setList(res.results);
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
          <FontAwesome5 name="search" size={25} color="#fff" />
        </HeaderSearch>
      </HeaderArea>
      <GenresArea>
        <Scroller horizontal showsHorizontalScrollIndicator={false}>
          {genresList != undefined &&
            genresList.map((item, index) => (
              <GenresButton onPress={() => getMoviesList(item.id)}>
                <GenresText>{item.name}</GenresText>
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
          showsVerticalScrollIndicator={false}
          onEndReached={loadApi}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<FooterList load={loading} />}
        />
      </MoviesList>
    </Container>
  );
}
