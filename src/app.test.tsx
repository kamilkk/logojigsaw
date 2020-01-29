import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('Get Hello friend ... h1 from first router', () => {
  const { getByText } = render(<App />);
  const h1Element = getByText(/Hello friend, tell me your name.../i);
  expect(h1Element).toBeInTheDocument();
});
