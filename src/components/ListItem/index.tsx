import React from 'react';
import { Item, ItemImg, StarsArea, StarsText } from './styles';
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
      <StarsArea>
        <StarsText>{`${data.vote_average}/10`}</StarsText>
      </StarsArea>
    </Item>
  );
}
