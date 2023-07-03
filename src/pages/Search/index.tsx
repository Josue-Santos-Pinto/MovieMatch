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
import { FlatList, Alert } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { Loading } from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { SearchListItem } from '../../components/SearchListItem';
import { Pagination } from '../../components/Pagination';
export function Search() {
  const [search, setSearch] = useState('');
  const [searchedMovie, setSearchedMovie] = useState('');
  const [listPlatform, setListPlatform] = useState('movie');
  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState('Filmes');

  const navigation = useNavigation();

  const findItemList = ['Filmes', 'Series', 'Documentários'];

  const { data: average, isLoading } = useQuery(['average', page, searchedMovie], async () => {
    if (searchedMovie.trim() == '') return await api.getFindMovies(page);
    return null;
  });

  const { data: series } = useQuery(['series', page, searchedMovie], async () => {
    if (searchedMovie.trim() == '') return await api.getTvSeries(page);
    return null;
  });

  const { data: documentary } = useQuery(['documentary', page, searchedMovie], async () => {
    if (searchedMovie.trim() == '') return await api.getDocumentaryMovies(page);
    return null;
  });

  const { data: list } = useQuery(['search', page, listPlatform, searchedMovie], async () => {
    if (searchedMovie.trim() != '') return await api.getSearchedMovie(search, page, listPlatform);
    return null;
  });

  const changeCurrentFilterAndPage = (item: string) => {
    setCurrentItem(item);
    setPage(1);
  };

  const searchMovie = () => {
    if (search.trim() != '') {
      setSearchedMovie(search);
      setPage(1);
    } else {
      Alert.alert('Digite o filme que deseja proucurar');
    }
  };

  useEffect(() => {
    if (currentItem == 'Filmes') {
      setListPlatform('movie');
    } else if (currentItem == 'Series') {
      setListPlatform('tv');
    }
  }, [currentItem]);
  if (list) console.log(list);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchedMovie('');
      setPage(1);
    }
  }, [search]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Encontre filmes, series {'\n'}e mais...</HeaderTitle>
      </HeaderArea>

      <SearchArea>
        <FontAwesome5 name="search" size={22} color="#fff" style={{ marginLeft: 8 }} />
        <SearchInput
          placeholder="Sherlock Holmes"
          placeholderTextColor="#BBBBBB"
          value={search}
          onChangeText={(e) => {
            setSearch(e);
          }}
          onSubmitEditing={searchMovie}
        />
      </SearchArea>

      <FilterArea>
        {!list &&
          findItemList.map((item, index) => (
            <ItemArea key={index} onPress={() => changeCurrentFilterAndPage(item)}>
              <ItemName isActive={item === currentItem}>{item}</ItemName>
              {item === currentItem && <ItemBar />}
            </ItemArea>
          ))}
        {list &&
          findItemList.map((item, index) => (
            <ItemArea
              key={index}
              onPress={() => changeCurrentFilterAndPage(item)}
              style={{ display: findItemList.length === index + 1 ? 'none' : 'flex' }}
            >
              <ItemName isActive={item === currentItem}>{item}</ItemName>
              {item === currentItem && <ItemBar />}
            </ItemArea>
          ))}
      </FilterArea>

      <MoviesList>
        {!list && currentItem === 'Filmes' && average && average.results && (
          <FlatList
            data={average.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="movie" />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination page={page} setPage={setPage} totalPage={average.total_pages} />
            }
          />
        )}
        {!list && currentItem === 'Series' && series && series.results && (
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
        {!list && currentItem === 'Documentários' && documentary && documentary.results && (
          <FlatList
            data={documentary.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="movie" />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination page={page} setPage={setPage} totalPage={documentary.total_pages} />
            }
          />
        )}

        {list && list.results.length > 0 && (
          <FlatList
            data={list.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform={listPlatform} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination page={page} setPage={setPage} totalPage={list.total_pages} />
            }
          />
        )}

        {isLoading && <Loading load={isLoading} />}

        {list && list.results.length == 0 && (
          <NotFoundArea>
            <NotFoundText>Filme não encontrado</NotFoundText>
          </NotFoundArea>
        )}
      </MoviesList>
    </Container>
  );
}
