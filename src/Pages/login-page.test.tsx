import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import LoginPage from './login-page';
import { AuthKey, isAuthenticated } from '../services/auth-service';

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

test("Let's go Button enabled if name provided", () => {
  const wrapper = mount(<LoginPage />);
  const input = wrapper.find('input');
  input.simulate('change', { target: { value: 'name' } });
  expect(wrapper.find('button').instance().disabled).toBeFalsy();
});

test("User authenticated after button Let's go clicked", () => {
  const name = 'some name';
  const wrapper = mount(<LoginPage />);
  const input = wrapper.find('input');
  input.simulate('change', { target: { value: name } });
  const button = wrapper.find('button');
  button.simulate('click');
  expect(localStorage.setItem).toHaveBeenLastCalledWith(AuthKey, name);
  const result = isAuthenticated();
  expect(result).toBeTruthy();
});
