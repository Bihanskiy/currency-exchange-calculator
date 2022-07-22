import { useEffect, useState } from "react";

import Arrow from "../arrows/Arrow";
import './selectDropdown.scss'

const CustomSelect = ({ color, selectedCurrency, onChangeCurrency }) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    const optionsList = [
        "UAH",
        "USD",
        "EUR",
        "GBP",
    ];

    useEffect(() => {
        onChangeCurrency(optionsList[selectedOption]);
    }, [selectedOption, optionsList])

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const setSelectedThenCloseDropdown = (index) => {
        setSelectedOption(index);
        setIsOptionsOpen(false);
    };

    const handleKeyDown = (index) => (e) => {
        switch (e.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                e.preventDefault();
                setSelectedThenCloseDropdown(index);
                break;
            default:
                break;
        }
    };

    const handleListKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedOption(
                    selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                setSelectedOption(
                    selectedOption === optionsList.length - 1 ? 0 : selectedOption + 1
                );
                break;
            default:
                break;
        }
    };

    return (
        <div className="field-currency__input-select base-select">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOptionsOpen}
                className={`base-select__field ${isOptionsOpen ? "expanded" : ""}`}
                onClick={toggleOptions}
                onKeyDown={handleListKeyDown}
                style={{ color: color }}
            >
                {selectedCurrency}
                <Arrow />
            </button>
            <ul
                className={`base-select__list ${isOptionsOpen ? "show" : ""}`}
                role="listbox"
                aria-activedescendant={optionsList[selectedOption]}
                tabIndex={-1}
                onKeyDown={handleListKeyDown}
            >
                {optionsList.map((option, index) => (
                    <li
                        key={index}
                        role="option"
                        aria-selected={selectedOption === index}
                        tabIndex={0}
                        onKeyDown={handleKeyDown(index)}
                        onClick={() => {
                            setSelectedThenCloseDropdown(index);
                        }}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
