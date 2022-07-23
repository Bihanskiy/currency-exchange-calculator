import { useContext } from 'react';
import { CurrencyContext } from './CurrencyProvider';

export const useCurrencyContext = () => {
  return useContext(CurrencyContext);
}

export const useCurrencyRates = () => {
  const { rates } = useCurrencyContext();

  return rates;
}

export const useCurrencyNames = () => {
  const rates = useCurrencyRates();

  return Object.keys(rates);
}

export const useUAHExchangeRate = (currencies = []) => {
  const rates = useCurrencyRates();

  return currencies.map((currencyName) => ({
    currency: currencyName,
    rate: rates.UAH / rates[currencyName],
  }))
};

export const useCurrencyConversion = () => {
  const rates = useCurrencyRates();

  return (fromCurrency, toCurrency) => rates[fromCurrency] / rates[toCurrency];
}

export const useCurrencyLoaded = () => {
  const { isCurrencyLoaded } = useCurrencyContext();

  return isCurrencyLoaded;
}

export const useAmountChange = () => {

  return (currentAmount, toFromAmountToggle = false, exchangeRate) =>
    [
      Number(currentAmount),
      toFromAmountToggle ? Number(currentAmount / exchangeRate) : Number(currentAmount * exchangeRate),
    ]
}

export const useCurrentCurrencyConversion = () => {
  return (currentAmount, toFromCurrencyToggle = false, exchangeRate) =>
    toFromCurrencyToggle ? Number(currentAmount / exchangeRate) : Number(currentAmount * exchangeRate);
}

