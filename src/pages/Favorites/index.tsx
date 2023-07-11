import React, { useState, useEffect } from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  MoviesList,
  NotFoundArea,
  NotFoundText,
  HeaderTitle,
  SearchArea,
  SearchInput,
  ItemArea,
  ItemName,
  ItemBar,
  FilterArea,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Movie } from '../../models';
import { FlatList, Alert, RefreshControl } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { Loading } from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { SearchListItem } from '../../components/SearchListItem';
import { Pagination } from '../../components/Pagination';
import nodeApi from '../../services/nodeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function Favorites() {
  const { id, token } = useSelector((rootReducer: RootState) => rootReducer.userReducer);

  const [fetching, setFetching] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [listPlatform, setListPlatform] = useState('movie');
  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState('Filmes');

  const findItemList = ['Filmes', 'Series'];

  const {
    data: favMovies,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ['favMovies', id, token],
    async () => {
      if (id && token) return await nodeApi.getFavMovies(id, token);
      return null;
    },
    { refetchOnWindowFocus: 'always', staleTime: Infinity, cacheTime: 0, refetchInterval: 0 }
  );

  const { data: series } = useQuery(['series', page, searchedMovie], async () => {
    if (searchedMovie.trim() == '') return await api.getTvSeries(page);
    return null;
  });

  const changeCurrentFilterAndPage = (item: string) => {
    setCurrentItem(item);
    setPage(1);
  };

  const handleRefresh = () => {
    setFetching(true);
    refetch();
  };
  useEffect(() => {
    setFetching(isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (currentItem == 'Filmes') {
      setListPlatform('movie');
    } else if (currentItem == 'Series') {
      setListPlatform('tv');
    }
  }, [currentItem]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Favoritos</HeaderTitle>
      </HeaderArea>

      <FilterArea>
        {findItemList.map((item, index) => (
          <ItemArea key={index} onPress={() => changeCurrentFilterAndPage(item)}>
            <ItemName isActive={item === currentItem}>{item}</ItemName>
            {item === currentItem && <ItemBar />}
          </ItemArea>
        ))}
      </FilterArea>

      <MoviesList>
        {currentItem === 'Filmes' && favMovies && favMovies.movies && (
          <FlatList
            data={favMovies.movies}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="movie" />}
            keyExtractor={(item) => item.movie_number}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
          />
        )}
        {currentItem === 'Series' && series && series.results && (
          <FlatList
            data={series.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="tv" />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination page={page} setPage={setPage} totalPage={series.total_pages} />
            }
          />
        )}

        {isLoading && <Loading load={isLoading} />}
      </MoviesList>
    </Container>
  );
}
