import AsyncStorage from "@react-native-community/async-storage";

export default class Storage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  async setItem(value: unknown): Promise<void> {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  }

  async getItem(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.key);
    } catch (error) {
      return null;
    }
  }
}
