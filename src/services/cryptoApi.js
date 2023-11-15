import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.CRYPTO_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};
const baseUrl='https://coinranking1.p.rapidapi.com';
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery:fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
   
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({coinId,timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
   
  }),
});

export const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/exchange/-zdvbieRdZ',
//     headers: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       'X-RapidAPI-Key': '8c0a06a67fmsha4476600e7486ffp16eb27jsnda575fd14fd1',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };

  