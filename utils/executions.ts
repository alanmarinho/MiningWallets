import * as SecureStore from 'expo-secure-store';

interface SecureStoreValue {
  walletAddress: string;
  walletNumber: string; // wallet 66, 124
  walletStatus: string; // solved, unsolved
  walletBalance: number;
  numberOfAttempts?: string; // +36k, +325K, +1.2M
  lastAttempt?: string; // 2021-10-31T12:00:00
}

export async function setSecureStoreValue(key: string, value: string): Promise<void> {
  return SecureStore.setItemAsync(key, value);
}

export async function deleteSecureStoreValue(key: string): Promise<void> {
  return SecureStore.deleteItemAsync(key);
}

export async function getSecureStoreObject(key: string): Promise<SecureStoreValue | null> {
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}

export async function editSecureStoreObject(key: string, value: Partial<SecureStoreValue>): Promise<void> {
  const currentValue = await getSecureStoreObject(key);
  if (currentValue) {
    return setSecureStoreValue(key, JSON.stringify({ ...currentValue, ...value }));
  }
}
