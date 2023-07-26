import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@mui/material';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.min.css';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import { getStockData, getStockName } from '../../service/apiStock';
import Chart from './Chart';
import Spinner from '../../ui/Spinner';
import Form from './Form';




const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100vw; */
  min-height: 10rem;
  background-color: var(--color-grey-100);
  gap: 2rem;
  margin: 2rem;
  border-radius: 10px;
`
const Input = styled.input`
  border-radius: 6px;
  border: 1px solid var(--color-grey-200);
  width: 200px;
  padding: 8px;
  color: #1675E0;
  letter-spacing: 0.1rem;
  font-weight: 400;
  &:hover{
	border: 1px solid #1275E0;
  }
  &:focus {
        outline: 4px solid #c3ddf8;
		border: 1px solid #3498ff;
    }
`;

const DataList = styled.datalist`
   width: 150px;
   background-color: red;
`

const Label = styled.label`
  font-weight : 600;
  border: none;
`;

const styles = { width: 260, display: 'block' };

const Home = () => {

  const [queryData, setQueryData] = useState({});
  const [enabled, setEnabled] = useState(false);
  const { isLoading, data, refetch, isError } = useQuery({ queryKey: ['stockData', queryData], queryFn: () => getStockData(queryData), enabled, refetchOnWindowFocus: false, });
  console.log("data", queryData)

  const formatterData = data?.data?.results?.map((item) => ({
    name: data.data.ticker,
    time: moment(item.t).format('MMMDD'),
    open: item.o,
    close: item.c,
    high: item.h,
    low: item.l,
    volume: item.v / 100000,
  }));
  console.log("****************", isError, isLoading)


  return (
    <>
      <Container>
        <Form setQueryData={setQueryData} refetch={refetch} setEnabled={setEnabled} />
      </Container>
      {isError ? <Container>SOMETHING WENT WRONG</Container> : isLoading && enabled ? <Spinner /> : formatterData ? <Chart formatterData={formatterData} /> : <Container></Container>}

    </>
  )
}

export default Home;