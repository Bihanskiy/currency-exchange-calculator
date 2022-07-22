import { useEffect, useState } from 'react';

import useCurrencyService from '../../services/CurrencyService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

import './appHeader.scss';
import logo from '../../assets/images/currency-logo.svg'


const AppHeader = () => {
    const [currensyItems, setCurrensyItems] = useState([]);
    const { loading, error, getExchangeRate } = useCurrencyService();

    useEffect(() => {
        onRequest(['USD', 'EUR'])
    }, [])

    const onRequest = (currencyNames) => {
        getExchangeRate(currencyNames)
            .then(onCurencyListLoaded)
    }

    const onCurencyListLoaded = (newCurrencyList) => {
        setCurrensyItems([...newCurrencyList]);
    }

    function renderCurrencyExchange(arr) {
        return arr.map((item, i) => {
            return (
                <div className="currency__item" key={i}>
                    <span className="currency__item-name">{item.currency}</span>
                    <span className="currency__item-value">
                        <span>{item.rate.toFixed(2)}</span>
                    </span>
                </div>
            )
        })
    }

    const items = renderCurrencyExchange(currensyItems);

    const errorMessage = !loading && error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const exchangeRate = !error && !loading ? items : null
    return (
        <header className="header">
            <div className='header__container container'>
                <div className="header__content">
                    <div className="header__logo-currency">
                        <div className="logo header__logo">
                            <a href="/" className="logo__link">
                                <img src={logo} alt="logo" className='logo__img' />
                            </a>
                        </div>
                        <div className="currency header__currency">
                            {errorMessage}
                            {spinner}
                            {exchangeRate}
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default AppHeader;