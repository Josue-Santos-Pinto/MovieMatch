import React, { useState, useEffect, useCallback } from 'react';
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
  SearchButton,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Movie } from '../../models';
import { FlatList, Alert, ListRenderItemInfo } from 'react-native';
import  ListItem  from '../../components/ListItem';
import { Loading } from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import api from '../../services/api';
import  SearchListItem  from '../../components/SearchListItem';
import { Pagination } from '../../components/Pagination';
export function Search() {
  const [search, setSearch] = useState('');
  const [searchedMovie, setSearchedMovie] = useState('');
  const [listPlatform, setListPlatform] = useState('movie');
  const [page, setPage] = useState(1);
  const [currentItem, setCurrentItem] = useState('Filmes');

  const findItemList = ['Filmes', 'Séries', 'Documentários'];

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
      setCurrentItem('Filmes');
      setPage(1);
    } else {
      Alert.alert('Digite o filme que deseja proucurar');
    }
  };

  const renderAvarageItem = useCallback(({item}: ListRenderItemInfo<Movie>)=>{
    return <SearchListItem data={item} platform="movie"/>
  },[average])

  const renderSeriesItem = useCallback(({item}: ListRenderItemInfo<Movie>)=>{
    return <SearchListItem data={item} platform="tv" />
  },[series])

  const renderDocumentaryItem = useCallback(({item}: ListRenderItemInfo<Movie>)=>{
    return <SearchListItem data={item} platform="movie" />
  },[documentary])

  const renderListItem = useCallback(({item}: ListRenderItemInfo<Movie>)=>{
    return <SearchListItem data={item} platform={listPlatform} />
  },[list])

  useEffect(() => {
    if (currentItem == 'Filmes') {
      setListPlatform('movie');
    } else if (currentItem == 'Séries') {
      setListPlatform('tv');
    }
  }, [currentItem]);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchedMovie('');
      setPage(1);
    }
  }, [search]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Encontre filmes, séries {'\n'}e mais...</HeaderTitle>
      </HeaderArea>

      <SearchArea>
        <SearchButton onPress={searchMovie}>
          <FontAwesome5 name="search" size={22} color="#fff" style={{ marginLeft: 8 }} />
        </SearchButton>
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
            renderItem={renderAvarageItem}
            keyExtractor={(item: Movie) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination page={page} setPage={setPage} totalPage={average.total_pages} />
            }
          />
        )}
        {!list && currentItem === 'Séries' && series && series.results && (
          <FlatList
            data={series.results}
            renderItem={renderSeriesItem}
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
            renderItem={renderDocumentaryItem }
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
            renderItem={renderListItem }
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination page={page} setPage={setPage} totalPage={list.total_pages} />
            }
          />
        )}

        

        {list && list.results.length == 0 && (
          <NotFoundArea>
            <NotFoundText>
              {currentItem == 'Filmes' ? 'Filme não encontrado' : 'Série não encontrada'}
            </NotFoundText>
          </NotFoundArea>
        )}
      </MoviesList>
    </Container>
  );
}
