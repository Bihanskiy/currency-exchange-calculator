import './currencyRow.scss'

const CurrencyRow = (props) => {
    const {
        color,
        backgroundColor,
        labelName,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount,
        currencyOptions
    } = props;
    return (
        <>
            <div className={`field-currency field-currency__${color}`}>
                <label className='field-currency__label input-sub'>{labelName}</label>
                <div className="field-currency__input">
                    <div className="currency-input field-currency__input-text">
                        <input
                            type="number"
                            className="currency-input__input"
                            value={amount}
                            onChange={onChangeAmount}
                        />
                    </div>
                    <div className="field-currency__input-select base-select" style={{borderColor:color}}>
                        <select
                            value={selectedCurrency}
                            onChange={onChangeCurrency}
                            className={`base-select__field bg-image__${color}`}
                            style={{ color: color, backgroundColor: backgroundColor }}
                        >
                            {currencyOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrencyRow;