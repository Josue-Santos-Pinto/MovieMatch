import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderAvatar, HeaderSearch } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';
import { Genre, Movie } from '../../models';
import api from '../../services/api';

export function MovieItem() {
  return (
    <Container>
      <Scroller showsVerticalScrollIndicator={false}>
        <HeaderArea>
          <HeaderAvatar></HeaderAvatar>
          <HeaderSearch>
            <FontAwesome5 name="search" size={25} color="#fff" />
          </HeaderSearch>
        </HeaderArea>
      </Scroller>
    </Container>
  );
}
