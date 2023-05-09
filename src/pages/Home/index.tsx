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
import { FlatList } from 'react-native';
import { ListItem } from '../../components/ListItem';
import { FooterList } from '../../components/FooterList';
import Animated, {
  FadeIn,
  Keyframe,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutRight,
} from 'react-native-reanimated';
export function Home() {
  const [list, setList] = useState<Movie[]>([]);
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [currentGenre, setCurrentGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showInput, setShowInput] = useState(false);

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

  const enteringKeyframe = new Keyframe({
    0: {
      width: 0,
      transform: [{ translateX: 190 }],
    },
    20: {
      width: 50,
      transform: [{ translateX: 150 }],
    },
    40: {
      width: 100,
      transform: [{ translateX: 110 }],
    },
    60: {
      width: 130,
      transform: [{ translateX: 70 }],
    },
    80: {
      width: 170,
      transform: [{ translateX: 30 }],
    },
    100: {
      width: 200,
      transform: [{ translateX: 0 }],
    },
  });

  const exitingKeyframe = new Keyframe({
    from: {
      width: 200,
      transform: [{ translateX: 0 }],
    },
    to: {
      width: 0,
      transform: [{ translateX: 190 }],
    },
  });

  return (
    <Container>
      <HeaderArea>
        <HeaderAvatar></HeaderAvatar>
        <HeaderSearch>
          {showInput && (
            <HeaderSearchInputArea
              entering={enteringKeyframe.duration(500)}
              exiting={exitingKeyframe.duration(500)}
            >
              <HeaderSearchInput />
            </HeaderSearchInputArea>
          )}
          <HeaderSearchInputButton onPress={() => setShowInput(!showInput)} activeOpacity={1}>
            <FontAwesome5 name="search" size={25} color="#fff" />
          </HeaderSearchInputButton>
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
