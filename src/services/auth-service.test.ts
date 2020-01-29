import {
  AuthKey,
  login,
  isAuthenticated,
  userName,
  logout,
} from './auth-service';

test('isAuthenticated false without login', () => {
  const result = isAuthenticated();
  expect(localStorage.getItem).toHaveBeenLastCalledWith(AuthKey);
  expect(result).toBeFalsy();
});

test('isAuthenticated true after login', () => {
  const name = 'timon';
  login(name);
  const result = isAuthenticated();
  expect(localStorage.getItem).toHaveBeenLastCalledWith(AuthKey);
  expect(result).toBeTruthy();
});

test('isAuthenticated false after logout', () => {
  logout();
  const result = isAuthenticated();
  expect(localStorage.getItem).toHaveBeenLastCalledWith(AuthKey);
  expect(result).toBeFalsy();
});

test('login name to be save to localStorage', () => {
  const name = 'pumba';
  login(name);
  expect(localStorage.setItem).toHaveBeenLastCalledWith(AuthKey, name);
  expect(localStorage.__STORE__[AuthKey]).toBe(name);
});

test('user name to be received localStorage after login', () => {
  const name = 'hakuna matata';
  login(name);
  const result = userName();
  expect(localStorage.setItem).toHaveBeenLastCalledWith(AuthKey, name);
  expect(localStorage.getItem).toHaveBeenLastCalledWith(AuthKey);
  expect(localStorage.__STORE__[AuthKey]).toBe(name);
  expect(result).toEqual(name);
});
