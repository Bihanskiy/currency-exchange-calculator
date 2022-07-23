import { useEffect, useMemo, useState } from "react";
import { useCurrencyConversion, useCurrencyNames, useAmountChange, useCurrentCurrencyConversion } from '../currencyContext/hooks';

import CurrencyRow from "../currencyRow/CurrencyRow";

import './calculatorStyle.scss'

function Calculator() {
    const currencyOptions = useCurrencyNames();
    const convertCurrency = useCurrencyConversion();
    const amountChange = useAmountChange();
    const currentCurrencyConversion = useCurrentCurrencyConversion();

    const [fromCurrency, setFromCurrency] = useState('UAH');
    const [fromAmount, setFromAmount] = useState(1);

    const [toCurrency, setToCurrency] = useState('USD');
    const [toAmount, setToAmount] = useState(1);

    const exchangeRate = useMemo(() => convertCurrency(fromCurrency, toCurrency), [fromCurrency, toCurrency, convertCurrency]);

    useEffect(() => {
        const toAmount = currentCurrencyConversion(fromAmount, true, exchangeRate);

        setToAmount(toAmount);
    }, []);

    function handleFromAmountChange(e) {
        const [fromAmount, toAmount] = amountChange(e.target.value, true, exchangeRate);

        setFromAmount(fromAmount);
        setToAmount(toAmount);
    }

    function handleToAmountChange(e) {
        const [toAmount, fromAmount] = amountChange(e.target.value, false, exchangeRate)

        setFromAmount(fromAmount);
        setToAmount(toAmount);
    }

    function handleSwitchCurrency() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);

        const targetToAmount = currentCurrencyConversion(fromAmount, false, exchangeRate);

        setToAmount(targetToAmount);
    }

    function handleFromCurrencyChange(e) {
        setFromCurrency(e.target.value);

        const targetToAmount = currentCurrencyConversion(fromAmount, true, convertCurrency(e.target.value, toCurrency))

        setToAmount(targetToAmount);
    }

    function handleToCurrencyChange(e) {
        setToCurrency(e.target.value);

        const targetFromAmount = currentCurrencyConversion(toAmount, false, convertCurrency(fromCurrency, e.target.value));

        setFromAmount(targetFromAmount);
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
                            onChangeCurrency={handleFromCurrencyChange}
                            onChangeAmount={handleFromAmountChange}
                            amount={fromAmount ? fromAmount : ""}
                            currencyOptions={currencyOptions}
                        />
                        <div className="currency-info-block">
                            <p className="currency-info-block__label">Current exchange rate is valid</p>
                            <p className="currency-info-block__value">{`1 ${fromCurrency} = ${toAmount.toFixed(2)} ${toCurrency}`}</p>
                        </div>
                    </div>
                    <div className='convert-currency__right'>
                        <CurrencyRow
                            color='white'
                            backgroundColor='#00829b'
                            labelName="You get"
                            selectedCurrency={toCurrency}
                            onChangeCurrency={handleToCurrencyChange}
                            onChangeAmount={handleToAmountChange}
                            amount={toAmount ? toAmount : ""}
                            currencyOptions={currencyOptions}
                        />
                        <button
                            className="convert-currency__swap"
                            onClick={handleSwitchCurrency}
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
