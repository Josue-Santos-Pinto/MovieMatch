import React from 'react';
import { Item, ItemImg } from './styles';
import { Movie } from '../../models';
import { IMG } from '../../keys';

type dataProps = {
  data: Movie;
  isLast: boolean;
};

export function ListItem({ data, isLast }: dataProps) {
  return (
    <Item activeOpacity={0.7}>
      <ItemImg source={{ uri: `${IMG}${data.poster_path}` }} resizeMode="cover" />
    </Item>
  );
}
