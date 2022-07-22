import { useHttp } from "../hooks/http.hook";

const useCurrencyService = () => {
    const { loading, request, error, clearError } = useHttp();


    const getExchangeRate = async (names = ['USD']) => {
        const res = await request(`https://cdn.cur.su/api/nbu.json`);
        return _transformCurrencyRateUah(res.rates, names);
    }

    const getExchangeConversionRate = async (oneCurrency, secondCurrency) => {
        const res = await request(`https://cdn.cur.su/api/nbu.json`);
        return _transformCurrencyRateOll(res.rates, oneCurrency, secondCurrency);
    }

    const getCurrencyOll = async () => {
        const res = await request(`https://cdn.cur.su/api/nbu.json`);
        return _transformCurrencyInArr(res.rates);
    }

    const _transformCurrencyRateUah = (items, names) => {
        const rateUah = items.UAH;
        return names.reduce((acc, name) => {
            acc.push({
                currency: name,
                rate: rateUah / items[name],
            });
            return acc;
        }, []);
    }

    const _transformCurrencyRateOll = (items, oneCurrency, secondCurrency) => {
        const rateOne = items[oneCurrency];
        const rateSecond = items[secondCurrency];
        return  rateOne / rateSecond;
    }

    const _transformCurrencyInArr = (currency) => {
        return Object.keys(currency);
    }

    return { loading, error, clearError, getExchangeRate, getExchangeConversionRate, getCurrencyOll }
}

export default useCurrencyService;