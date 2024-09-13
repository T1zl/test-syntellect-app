import {ChangeEvent} from "react";
import {observer} from "mobx-react-lite";
import {controlStore} from "../store";

function ControlAutocomplete() {
    const maxSuggestions = 10;

    const visibleSuggestions = controlStore.suggestions.length > maxSuggestions
        ? controlStore.suggestions.slice(0, maxSuggestions)
        : controlStore.suggestions;

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedCountry = controlStore.suggestions.find(
            (country) => country.name === selectedValue
        );

        if (selectedCountry) {
            controlStore.selectSuggestion(selectedCountry);
        }
    };

    return (
        <>
            <h1>3 контрол</h1>

            <div className={'autocomplete'}>
                <input
                    type="text"
                    value={controlStore.inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => controlStore.setInputValue(e.target.value)}
                    placeholder="Введите название страны"
                />

                {controlStore.loading && <p className={'loading'}>Загрузка...</p>}

                {controlStore.error && <p className={'error'}>{controlStore.error}</p>}

                {!controlStore.loading && visibleSuggestions.length > 0 && (
                    <select
                        role={'combobox'}
                        onChange={handleSelectChange}
                        size={3}
                    >
                        {visibleSuggestions.map((suggestion, index) => (
                            <option key={index} value={suggestion.name}>
                                {suggestion.name}, {suggestion.fullName}, {suggestion.flag}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </>
    );
}

export default observer(ControlAutocomplete);