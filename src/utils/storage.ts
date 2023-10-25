import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const getLocalData = async <T = string>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value as T;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
