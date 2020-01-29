import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from './login-page';

test('Get Name TextField from Login Page ', () => {
  const { getByTestId } = render(<LoginPage />);
  const nameTextField = getByTestId('name');
  expect(nameTextField).toBeInTheDocument();
});

test("Get Let's go Button from Login Page", () => {
  const { getByTestId } = render(<LoginPage />);
  const letsgoButton = getByTestId('letsgo');
  expect(letsgoButton).toBeInTheDocument();
});

test("Let's go Button disabled if no name provided", () => {
  const { getByTestId } = render(<LoginPage />);
  const letsgoButton = getByTestId('letsgo') as HTMLButtonElement;
  expect(letsgoButton).toBeInTheDocument();
  expect(letsgoButton.disabled).toBeTruthy();
});
