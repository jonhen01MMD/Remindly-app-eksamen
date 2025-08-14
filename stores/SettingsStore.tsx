import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsData {
  // Profile data
  name: string;
  email: string;
  profileImage: string | null;
  
  // Settings toggles
  notificationsEnabled: boolean;
  darkMode: boolean;
}

interface SettingsContextType {
  settings: SettingsData;
  updateSetting: <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => Promise<void>;
  updateMultipleSettings: (updates: Partial<SettingsData>) => Promise<void>;
  deleteAllData: () => Promise<void>;
}

const defaultSettings: SettingsData = {
  name: '',
  email: '',
  profileImage: null,
  notificationsEnabled: true,
  darkMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'remindly_settings';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  // Load settings from AsyncStorage on app start
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async (newSettings: SettingsData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const updateSetting = async <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const updateMultipleSettings = async (updates: Partial<SettingsData>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  // Clear AsyncStorage and Reset to default settings
  const deleteAllData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      
      setSettings(defaultSettings);
    } catch (error) {
      console.error('Failed to delete data:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, updateMultipleSettings, deleteAllData }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}