export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};


if (!getItem('notifications')) {
  setItem('notifications', []);
}

if (!getItem('highScore')) {
  setItem('highScore', 0);
}
