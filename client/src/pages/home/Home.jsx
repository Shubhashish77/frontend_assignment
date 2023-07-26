import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import { getStockData } from '../../service/apiStock';
import Chart from './Chart';
import Spinner from '../../ui/Spinner';
import Form from './Form';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 10rem;
  background-color: var(--color-grey-100);
  gap: 2rem;
  margin: 2rem;
  border-radius: 10px;
`;


const Home = () => {

  const [queryData, setQueryData] = useState({});
  const [enabled, setEnabled] = useState(false);
  const { isLoading, data, isError } = useQuery({ queryKey: ['stockData', queryData], queryFn: () => getStockData(queryData), enabled, refetchOnWindowFocus: false, });


  const formatterData = data?.data?.results?.map((item) => ({
    name: data.data.ticker,
    time: moment(item.t).format('MMMDD'),
    open: item.o,
    close: item.c,
    high: item.h,
    low: item.l,
    volume: item.v / 100000,
  }));

  return (
    <>
      <Container>
        <Form setQueryData={setQueryData} setEnabled={setEnabled} />
      </Container>
      {isError ? <Container>SOMETHING WENT WRONG</Container> : isLoading && enabled ? <Spinner /> : formatterData ? <Chart formatterData={formatterData} /> : data?.data?.queryCount === 0 ? <Container>NO DATA FOUND</Container> : ""}

    </>
  )
}

export default Home;