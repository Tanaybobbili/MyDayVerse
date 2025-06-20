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

// Default initializations
if (!getItem('notifications')) {
  setItem('notifications', []);
}

if (!getItem('highScore')) {
  setItem('highScore', 0);
}

if (!getItem('memoryGameBestScore')) {
  setItem('memoryGameBestScore', Number.MAX_SAFE_INTEGER);
}

// Sample test activity (optional)
if (!getItem('activities')) {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later

  setItem('activities', [
    {
      detail: "Demo Activity - 1 hour later",
      date: oneHourLater.toISOString().split('T')[0],
      time: oneHourLater.toTimeString().slice(0, 5) // HH:mm
    }
  ]);
}
