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
import { FlatList } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { Loading } from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import api from '../../services/api';
import { SearchListItem } from '../../components/SearchListItem';
import { Pagination } from '../../components/Pagination';
export function Search() {
  const [list, setList] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState('Filmes');

  const navigation = useNavigation();

  const length = list.length;

  const findItemList = ['Filmes', 'Series', 'Documentários'];

  const { data: average, isLoading } = useQuery(['average', page], async () => {
    return await api.getFindMovies(page);
  });

  const { data: series } = useQuery(['series', page], async () => {
    return await api.getTvSeries(page);
  });

  const { data: documentary } = useQuery(['documentary', page], async () => {
    return await api.getDocumentaryMovies(page);
  });

  const changeCurrentFilterAndPage = (item: string) => {
    setCurrentItem(item);
    setPage(1);
  };

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Encontre filmes, series {'\n'}e mais...</HeaderTitle>
      </HeaderArea>

      <SearchArea>
        <FontAwesome5 name="search" size={22} color="#fff" style={{ marginLeft: 8 }} />
        <SearchInput placeholder="Sherlock Holmes" placeholderTextColor="#BBBBBB" />
      </SearchArea>

      <FilterArea>
        {findItemList.map((item, index) => (
          <ItemArea key={index} onPress={() => changeCurrentFilterAndPage(item)}>
            <ItemName isActive={item === currentItem}>{item}</ItemName>
            {item === currentItem && <ItemBar />}
          </ItemArea>
        ))}
      </FilterArea>

      <MoviesList>
        {currentItem === 'Filmes' && average && average.results && (
          <FlatList
            data={average.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="movie" />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<Pagination page={page} setPage={setPage} />}
          />
        )}
        {currentItem === 'Series' && series && series.results && (
          <FlatList
            data={series.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="tv" />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<Pagination page={page} setPage={setPage} />}
          />
        )}
        {currentItem === 'Documentários' && documentary && documentary.results && (
          <FlatList
            data={documentary.results}
            renderItem={({ item, index }) => <SearchListItem data={item} platform="movie" />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<Pagination page={page} setPage={setPage} />}
          />
        )}

        {isLoading && <Loading load={isLoading} />}

        {/*{!loading && list.length == 0 && (
          <NotFoundArea>
            <NotFoundText>Filme não encontrado</NotFoundText>
          </NotFoundArea>
        )}*/}
      </MoviesList>
    </Container>
  );
}
