import React from 'react';
import { NextPageButton, Page, PageText, PaginationArea, PrevPageButton } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type DataProps = {
  page: number;
  setPage: Function;
  totalPage: number;
};

export function Pagination({ page, setPage, totalPage }: DataProps) {
  return (
    <PaginationArea>
      <PrevPageButton onPress={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>
        <FontAwesome5 name="chevron-left" size={25} color="#fff" />
      </PrevPageButton>
      <Page>
        <PageText>{page}</PageText>
      </Page>
      <NextPageButton
        onPress={() => setPage(page < totalPage ? page + 1 : page)}
        disabled={page == totalPage}
      >
        <FontAwesome5 name="chevron-right" size={25} color="#fff" />
      </NextPageButton>
    </PaginationArea>
  );
}
