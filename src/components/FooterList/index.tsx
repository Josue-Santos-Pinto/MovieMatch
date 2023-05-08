import React from 'react';
import { Loading, LoadingArea } from './styles';
import { Movie } from '../../models';
import { IMG } from '../../keys';

type dataProps = {
  load: boolean;
};

export function FooterList({ load }: dataProps) {
  if (!load) return null;
  return (
    <LoadingArea>
      <Loading size={25} color="#fff" />
    </LoadingArea>
  );
}
