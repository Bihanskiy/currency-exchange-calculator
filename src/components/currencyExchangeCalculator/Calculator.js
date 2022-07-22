import { useEffect, useState } from "react";

import CurrencyRow from "../currencyRow/CurrencyRow";
import useCurrencyService from '../../services/CurrencyService';

import './calculatorStyle.scss'

function Calculator() {
    const [fromCurrency, setFromCurrency] = useState("UAH");
    const [toCurrency, setToCurrency] = useState("UAH");
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    const { getExchangeConversionRate } = useCurrencyService();

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
        e = String(e);
        if (e.indexOf(".") !== -1) {
            return e.slice(0, e.indexOf(".") + 3);
        }
        return e;
    }

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
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
                            labelName="You give"
                            selectedCurrency={fromCurrency}
                            onChangeCurrency={currency => setFromCurrency(currency)}
                            onChangeAmount={handleFromAmountChange}
                            amount={fromAmount}
                        />
                        <div className="currency-info-block">
                            <p className="currency-info-block__label">Current exchange rate is valid</p>
                            <p className="currency-info-block__value">{`1 ${fromCurrency} = ${amountInFromCurrency ? (1 / exchangeRate).toFixed(2) : exchangeRate.toFixed(2)} ${toCurrency}`}</p>
                        </div>
                    </div>
                    <div className='convert-currency__right'>
                        <CurrencyRow
                            color='white'
                            labelName="You get"
                            selectedCurrency={toCurrency}
                            onChangeCurrency={currency => setToCurrency(currency)}
                            onChangeAmount={handleToAmountChange}
                            amount={toAmount}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Calculator;