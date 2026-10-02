import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/Header';

beforeEach(() => {
    localStorage.clear();
});

test('toggles between light and dark mode', () => {
    render(<Header />);
    const button = screen.getByRole('button');

    // Initial state should be light mode
    expect(button).toHaveTextContent('Dark Mode');

    // Click to switch to dark mode
    fireEvent.click(button);
    expect(button).toHaveTextContent('Light Mode');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click to switch back to light mode
    fireEvent.click(button);
    expect(button).toHaveTextContent('Dark Mode');
    expect(localStorage.getItem('theme')).toBe('light');
});

// Additional tests can be added to check for persistence across reloads.