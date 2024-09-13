import { makeAutoObservable, runInAction } from 'mobx';
import {CountryInfo, getCountryByName} from "../api/apiService";

class ControlStore {
    inputValue = '';
    suggestions: CountryInfo[] = [];
    loading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    resetInputValue() {
        this.inputValue = '';
    }

    setInputValue(value: string) {
        this.inputValue = value;
        this.fetchSuggestions(value);
    }

    async fetchSuggestions(countryName: string) {
        if (!countryName.trim()) {
            this.suggestions = [];
            return;
        }

        this.loading = true;
        this.error = '';

        try {
            const response = await getCountryByName(countryName);

            runInAction(() => {
                this.suggestions = response;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Ошибка загрузки данных';
                this.loading = false;
            });
        }
    }

    selectSuggestion(suggestion: CountryInfo) {
        this.inputValue = `${suggestion.name}, ${suggestion.fullName}, ${suggestion.flag}`;
        this.suggestions = [];
    }
}

export const controlStore = new ControlStore();