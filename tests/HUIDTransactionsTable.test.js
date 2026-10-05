import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HUIDTransactionsTable from '../src/components/HUIDTransactionsTable';

test('exports transactions to CSV', () => {
  const transactions = [
    { id: '1', date: '2023-01-01', amount: '100', status: 'Completed' },
    { id: '2', date: '2023-01-02', amount: '200', status: 'Pending' }
  ];

  const { getByText } = render(<HUIDTransactionsTable transactions={transactions} />);
  const exportButton = getByText('Export to CSV');

  // Mock the click event to test CSV download
  const originalCreateObjectURL = URL.createObjectURL;
  URL.createObjectURL = jest.fn();

  fireEvent.click(exportButton);

  expect(URL.createObjectURL).toHaveBeenCalled();
  URL.createObjectURL = originalCreateObjectURL;
});