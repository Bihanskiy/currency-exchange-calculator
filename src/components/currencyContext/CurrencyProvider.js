import { createContext, useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import Spinner from '../spinner/Spinner.js';

export const CurrencyContext = createContext({
  loading: false,
  error: '',
  clearError: () => {},
  fetchCurrency: () => {},
  rates: {},
});

const CurrencyProvider = ({ children }) => {
  const { request, error, clearError } = useHttp();

  const [rates, setRates] = useState({});
  const [isCurrencyLoaded, setLoaded] = useState();

  const fetchCurrency = () => request(`https://cdn.cur.su/api/nbu.json`)
    .then(({ rates }) => setRates(rates))
    .finally(() => setLoaded(true));

  useEffect(() => {
    fetchCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ error, clearError, fetchCurrency, rates }}>{ isCurrencyLoaded ? children : <Spinner/> }</CurrencyContext.Provider>
  )
};

export default CurrencyProvider;
