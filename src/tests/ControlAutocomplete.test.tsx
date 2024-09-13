import React from 'react';
import {render, waitFor, getByRole, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlAutocomplete from '../components/ControlAutocomplete';
import { controlStore } from '../store';

controlStore.selectSuggestion = jest.fn();

test('suggestions exists, but dont selected', async () => {
    controlStore.suggestions = [
        { name: 'USA', fullName: 'United States of America', flag: '🇺🇸' },
        { name: 'Canada', fullName: 'Canada', flag: '🇨🇦' }
    ];
    controlStore.loading = false;
    controlStore.error = '';

    const { getByPlaceholderText, getByText, getByRole } = render(<ControlAutocomplete />);

    const input = getByPlaceholderText('Введите название страны');
    expect(input).toBeInTheDocument();

    const select = await waitFor(() => getByRole('combobox'));
    expect(select).toBeInTheDocument();

    expect(getByText('USA, United States of America, 🇺🇸')).toBeInTheDocument();
    expect(getByText('Canada, Canada, 🇨🇦')).toBeInTheDocument();
});

test('suggestion selected', async () => {
    controlStore.suggestions = [
        { name: 'USA', fullName: 'United States of America', flag: '🇺🇸' },
        { name: 'Canada', fullName: 'Canada', flag: '🇨🇦' }
    ];
    controlStore.loading = false;
    controlStore.error = '';

    const { getByRole } = render(<ControlAutocomplete />);

    const select = await waitFor(() => getByRole('combobox'));
    fireEvent.change(select, { target: { value: 'Canada' } });

    expect(controlStore.selectSuggestion).toHaveBeenCalledWith({
        name: 'Canada',
        fullName: 'Canada',
        flag: '🇨🇦'
    });
});

test('display loading message', () => {
    controlStore.suggestions = [];
    controlStore.loading = true;
    controlStore.error = '';

    const { getByText } = render(<ControlAutocomplete />);

    expect(getByText('Загрузка...')).toBeInTheDocument();
});

test('display error message', () => {
    controlStore.suggestions = [];
    controlStore.loading = false;
    controlStore.error = 'Ошибка загрузки данных';

    const { getByText } = render(<ControlAutocomplete />);

    expect(getByText('Ошибка загрузки данных')).toBeInTheDocument();
});