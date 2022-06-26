import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../components/Container.tsx';
import TableCustom from '../components/Table.tsx';
import { IRootState } from '../store/store';
const Pages = () => {
  const data = useSelector((state: IRootState) => state.table);
  return (
    <Container>
      <TableCustom />
    </Container>
  );
};
export default Pages;
