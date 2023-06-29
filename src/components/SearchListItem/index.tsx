import React, { useEffect, useState } from 'react';
import { Item, ItemImg, StarsArea, StarsText } from './styles';
import { Movie } from '../../models';
import { IMG } from '../../keys';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

type dataProps = {
  data: Movie;
  isLast?: boolean;
};

export function SearchListItem({ data, isLast }: dataProps) {
  const navigation = useNavigation();

  return (
    <Item onPress={() => navigation.navigate('MovieItem', { id: data.id })} activeOpacity={0.7}>
      <ItemImg source={{ uri: `${IMG}${data.poster_path}` }} resizeMode="contain" />
      <StarsArea>
        <Icon name="star" size={25} color="#f7d22e" />
        <StarsText>{`${data.vote_average.toFixed(1)}`}</StarsText>
      </StarsArea>
    </Item>
  );
}
