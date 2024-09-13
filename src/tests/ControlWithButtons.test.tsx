import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlWithButtons from '../components/ControlWithButtons';
import { controlStore } from '../store';

test('should work functional buttons', () => {
    const { getByText, getByPlaceholderText  } = render(<ControlWithButtons />);

    window.alert = jest.fn();

    expect(controlStore.inputValue).toBe('');

    fireEvent.click(getByText('Hello World!'));
    expect(controlStore.inputValue).toBe('Hello World!');

    fireEvent.click(getByText('Reset'));
    expect(controlStore.inputValue).toBe('');

    const input2 = getByPlaceholderText('Input 2');

    fireEvent.change(input2, { target: { value: '123' } });
    expect(controlStore.inputValue).toBe('123');

    fireEvent.click(getByText('Check Number'));

    expect(window.alert).toHaveBeenCalledWith('123');

    fireEvent.change(input2, { target: { value: 'Random Value' } });
    expect(controlStore.inputValue).toBe('Random Value');

    fireEvent.click(getByText('Alert'));

    expect(window.alert).toHaveBeenCalledWith('Random Value');
});