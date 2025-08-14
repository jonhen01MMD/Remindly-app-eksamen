import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  createdAt: string;
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'isCompleted'>) => Promise<void>;
  updateReminder: (id: string, updates: Partial<Reminder>) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  getUpcomingReminders: () => Reminder[];
  getTodaysReminders: () => Reminder[];
  clearAllReminders: () => Promise<void>;
  isLoading: boolean;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

const STORAGE_KEY = '@reminders';

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load reminders from AsyncStorage
  const loadReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReminders(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save reminders to AsyncStorage
  const saveReminders = async (newReminders: Reminder[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReminders));
      setReminders(newReminders);
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  };

  // Add new reminder
  const addReminder = async (reminderData: Omit<Reminder, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isCompleted: false,
    };
    const updatedReminders = [...reminders, newReminder];
    await saveReminders(updatedReminders);
  };

  // Update existing reminder
  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, ...updates } : reminder
    );
    await saveReminders(updatedReminders);
  };

  // Delete reminder
  const deleteReminder = async (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    await saveReminders(updatedReminders);
  };

  // Toggle completion status
  const toggleComplete = async (id: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, isCompleted: !reminder.isCompleted } : reminder
    );
    await saveReminders(updatedReminders);
  };

  // Get upcoming reminders (next 7 days)
  const getUpcomingReminders = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return reminders
      .filter(reminder => {
        const reminderDate = new Date(reminder.date);
        return reminderDate >= now && reminderDate <= nextWeek && !reminder.isCompleted;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Get today's reminders
  const getTodaysReminders = () => {
    const today = new Date().toDateString();
    return reminders
      .filter(reminder => new Date(reminder.date).toDateString() === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  // Clear all reminders
  const clearAllReminders = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setReminders([]);
    } catch (error) {
      console.error('Error clearing reminders:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  return (
    <ReminderContext.Provider value={{
      reminders,
      addReminder,
      updateReminder,
      deleteReminder,
      toggleComplete,
      getUpcomingReminders,
      getTodaysReminders,
      clearAllReminders,
      isLoading,
    }}>
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}
