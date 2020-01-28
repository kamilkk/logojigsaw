export const login = (name: string) => {
  window.localStorage.setItem('auth', name);
};

export const isAuthenticated = () => {
  if (window.localStorage.getItem('auth') == null) {
    return false;
  } else {
    return true;
  }
};

export const userName = () => {
  const name = window.localStorage.getItem('auth');
  return name;
};

export const logout = () => {
  if (window.localStorage.getItem('auth') != null) {
    window.localStorage.removeItem('auth');
  }
};
