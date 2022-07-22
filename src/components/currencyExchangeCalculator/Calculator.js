import { useEffect, useState } from "react";

import CurrencyRow from "../currencyRow/CurrencyRow";
import useCurrencyService from '../../services/CurrencyService';

import './calculatorStyle.scss'

function Calculator() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    const { getExchangeConversionRate, getCurrencyOll } = useCurrencyService();

    useEffect(() => {
        getCurrencyOll()
            .then(data => {
                setCurrencyOptions([...data])
                setFromCurrency(data[25])
                setToCurrency(data[62])
            })
    }, [])

    useEffect(() => {
        onRequest(fromCurrency, toCurrency);
    }, [fromCurrency, toCurrency])

    const onRequest = (oneCurrency, secondCurrency) => {
        getExchangeConversionRate(oneCurrency, secondCurrency)
            .then(onCurencyRate)
    }

    const onCurencyRate = (newCurrencyRate) => {
        setExchangeRate(newCurrencyRate);
    }

    let toAmount, fromAmount

    if (amountInFromCurrency) {
        fromAmount = func(amount);
        toAmount = func(fromAmount / exchangeRate);
    } else {
        toAmount = func(amount);
        fromAmount = func(toAmount * exchangeRate);
    }

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    function func(e) {
        return String(e).replace(/(\.\d{2})\d+/g, '$1');
    }

    function handleChange() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    return (
            <section className='convert-currency'>
                <div className='container'>
                    <h2 className='base-title convert-currency__title'>Currency exchange (conversion) calculator</h2>
                    <p className='convert-currency__description'>Here you can view the current exchange rate for reviewing one currency to another</p>
                    <div className='convert-currency__wrap'>
                        <div className='convert-currency__left'>
                            <CurrencyRow
                                color='black'
                                backgroundColor='white'
                                labelName="You give"
                                selectedCurrency={fromCurrency}
                                onChangeCurrency={e => setFromCurrency(e.target.value)}
                                onChangeAmount={handleFromAmountChange}
                                amount={+fromAmount ? fromAmount : ""}
                                currencyOptions={currencyOptions}
                            />
                            <div className="currency-info-block">
                                <p className="currency-info-block__label">Current exchange rate is valid</p>
                                <p className="currency-info-block__value">{`1 ${fromCurrency} = ${amountInFromCurrency ? (1 / exchangeRate).toFixed(3) : exchangeRate.toFixed(3)} ${toCurrency}`}</p>
                            </div>
                        </div>
                        <div className='convert-currency__right'>
                            <CurrencyRow
                                color='white'
                                backgroundColor='#00829b'
                                labelName="You get"
                                selectedCurrency={toCurrency}
                                onChangeCurrency={e => setToCurrency(e.target.value)}
                                onChangeAmount={handleToAmountChange}
                                amount={+toAmount ? toAmount : toAmount}
                                currencyOptions={currencyOptions}
                            />
                            <button
                                className="convert-currency__swap"
                                onClick={handleChange}
                            >
                                <svg width="19" height="31" viewBox="0 0 19 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="convert-currency__swap-icon"><rect x="2" y="6" width="12" height="2" fill="white"></rect><rect x="17" y="24" width="12" height="2" transform="rotate(-180 17 24)" fill="white"></rect><rect x="1.41406" y="5.65771" width="10" height="2" transform="rotate(45 1.41406 5.65771)" fill="white"></rect><rect x="17.5859" y="24.4854" width="10" height="2" transform="rotate(-135 17.5859 24.4854)" fill="white"></rect><rect y="7.07104" width="10" height="2" transform="rotate(-45 0 7.07104)" fill="white"></rect><rect x="19" y="23.0718" width="10" height="2" transform="rotate(135 19 23.0718)" fill="white"></rect></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Calculator;