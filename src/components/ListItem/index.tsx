import React, { useEffect, useState } from 'react';
import { Item, ItemImg, StarsArea, StarsText } from './styles';
import { Movie } from '../../models';
import { IMG } from '../../keys';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Loading } from '../Loading';

type dataProps = {
  data: Movie;
  size?: string;
  platform: string;
};

export function ListItem({ data, size, platform }: dataProps) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleImageSource = () => {
    setIsLoading(false);
  };
  return (
    <Item
      onPress={() => navigation.navigate('MovieItem', { id: data.id, platform: platform })}
      activeOpacity={0.7}
      size={size}
    >
      {isLoading && <Loading load={isLoading} />}
      <ItemImg
        source={{
          uri: `${
            data.poster_path
              ? IMG + data.poster_path
              : 'https://firebasestorage.googleapis.com/v0/b/guitarstore-a2356.appspot.com/o/image-coming-soon-placeholder.png?alt=media&token=a192c2bb-1477-4350-944d-777cd225a33d'
          }`,
        }}
        resizeMode="cover"
        onLoad={handleImageSource}
      />
      <StarsArea>
        <Icon name="star" size={25} color="#f7d22e" />
        <StarsText>{`${data.vote_average.toFixed(1)}`}</StarsText>
      </StarsArea>
    </Item>
  );
}
