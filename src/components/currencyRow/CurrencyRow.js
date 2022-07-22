import SelectDropdown from '../selectDropdown/SelectDropdown.js'

import './currencyRow.scss'

const CurrencyRow = (props) => {
    const {
        color,
        labelName,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount,
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
                    <SelectDropdown color={color} selectedCurrency={selectedCurrency} onChangeCurrency={onChangeCurrency} />
                </div>
            </div>
        </>
    )
}

export default CurrencyRow;