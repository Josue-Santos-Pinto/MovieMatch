import React, { useEffect, useState } from 'react';
import { Container, Item, StarsArea, StarsText } from './styles';
import { Movie, Serie } from '../../models';
import { IMG } from '../../keys';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Loading } from '../Loading';
import FastImage from 'react-native-fast-image';

type dataProps = {
  data: Movie;
  platform: string;
};

export function SearchListItem({ data, platform }: dataProps) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  if (data.image) {
    data.poster_path = data.image;
  }
  if (data.movie_number) {
    data.id = parseInt(data.movie_number);
  }
  if (data.serie_number) {
    data.id = parseInt(data.serie_number);
  }

  const handleImageSource = () => {
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && <Loading load={isLoading} />}
      <Item 
        onPress={() => navigation.navigate('MovieItem', { id: data.id, platform })}
        activeOpacity={0.7}>
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={{
          uri: `${
            data.poster_path
              ? IMG + data.poster_path
              : 'https://firebasestorage.googleapis.com/v0/b/guitarstore-a2356.appspot.com/o/image-coming-soon-placeholder.png?alt=media&token=a192c2bb-1477-4350-944d-777cd225a33d'
          }`,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={handleImageSource}
      />
      <StarsArea>
        <Icon name="star" size={25} color="#f7d22e" />
        <StarsText>{`${data.vote_average.toFixed(1)}`}</StarsText>
      </StarsArea>
      </Item>
    </Container>
  );
}
