import { useEffect, useState } from 'react';

import { useUAHExchangeRate } from '../currencyContext/hooks';

import './appHeader.scss';
import logo from '../../assets/images/currency-logo.svg'


const AppHeader = () => {
    const exchangeRateUAH = useUAHExchangeRate(['USD', 'EUR'])

    const [currensyItems, setCurrensyItems] = useState([]);

    useEffect(() => {
        setCurrensyItems(exchangeRateUAH)
    }, [])

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
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default AppHeader;