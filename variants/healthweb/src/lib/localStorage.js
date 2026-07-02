
export const getLocalStorageItem = (key, defaultValue = null) => {
  console.warn("localStorage.getLocalStorageItem is deprecated. Use Supabase instead.");
  return defaultValue;
};

export const setLocalStorageItem = (key, value) => {
  console.warn("localStorage.setLocalStorageItem is deprecated. Use Supabase instead.");
  return false;
};

export const removeLocalStorageItem = (key) => {
  console.warn("localStorage.removeLocalStorageItem is deprecated. Use Supabase instead.");
  return false;
};

export const clearLocalStorage = () => {
  console.warn("localStorage.clearLocalStorage is deprecated. Use Supabase instead.");
  return false;
};