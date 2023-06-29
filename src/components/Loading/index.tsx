import React from 'react';
import { Load, LoadingArea } from './styles';
import { Movie } from '../../models';
import { IMG } from '../../keys';

type dataProps = {
  load: boolean;
};

export function Loading({ load }: dataProps) {
  if (!load) return null;
  return (
    <LoadingArea>
      <Load size={25} color="#fff" />
    </LoadingArea>
  );
}
