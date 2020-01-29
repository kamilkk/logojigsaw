export const AuthKey = 'auth';

export const login = (name: string) => {
  localStorage.setItem(AuthKey, name);
};

export const isAuthenticated = () => {
  if (localStorage.getItem(AuthKey) == null) {
    return false;
  } else {
    return true;
  }
};

export const userName = () => {
  const name = localStorage.getItem(AuthKey);
  return name;
};

export const logout = () => {
  if (localStorage.getItem(AuthKey) != null) {
    localStorage.removeItem(AuthKey);
  }
};
