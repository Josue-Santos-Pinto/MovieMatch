import React from 'react';
import { Item, ItemImg, StarsArea, StarsText } from './styles';
import { Movie } from '../../models';
import { IMG } from '../../keys';
import { useNavigation } from '@react-navigation/native';

type dataProps = {
  data: Movie;
  isLast: boolean;
};

export function ListItem({ data, isLast }: dataProps) {
  const navigation = useNavigation();
  return (
    <Item onPress={() => navigation.navigate('MovieItem', { id: data.id })} activeOpacity={0.7}>
      <ItemImg source={{ uri: `${IMG}${data.poster_path}` }} resizeMode="cover" />
      <StarsArea>
        <StarsText>{`${data.vote_average.toFixed(1)}/10`}</StarsText>
      </StarsArea>
    </Item>
  );
}
