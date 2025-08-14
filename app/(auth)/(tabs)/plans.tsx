import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useReminders } from '../../../stores/ReminderStore';

export default function PlansScreen() {
  const router = useRouter();
  const { reminders, toggleComplete, deleteReminder, getUpcomingReminders } = useReminders();
  const [showCompleted, setShowCompleted] = useState(false);

  const upcomingReminders = getUpcomingReminders();
  const completedReminders = reminders.filter(reminder => reminder.isCompleted);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#FFA726';
      case 'low': return '#22c55e';
      default: return '#FFA726';
    }
  };

  return (
    <View className='bg-slate-900 pt-20 px-4 flex-1'>
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white">Reminders</Text>
        <Text className="text-gray-400 text-lg">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>

      {/* Toggle Buttons */}
      <View className="flex-row bg-slate-800 rounded-full p-1.5 mb-6">
        <TouchableOpacity
          className={`flex-1 py-2 px-4 rounded-full ${!showCompleted ? 'bg-[#FFA726]' : 'bg-transparent'}`}
          onPress={() => setShowCompleted(false)}
        >
          <Text className={`text-center font-medium ${!showCompleted ? 'text-white' : 'text-gray-400'}`}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 px-4 rounded-full ${showCompleted ? 'bg-[#FFA726]' : 'bg-transparent'}`}
          onPress={() => setShowCompleted(true)}
        >
          <Text className={`text-center font-medium ${showCompleted ? 'text-white' : 'text-gray-400'}`}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reminders List */}
      <ScrollView className="flex-1">
        {(showCompleted ? completedReminders : upcomingReminders).length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="calendar-outline" size={64} color="#64748b" />
            <Text className="text-gray-400 text-lg mt-4">
              {showCompleted ? 'No completed reminders' : 'No upcoming reminders'}
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              {showCompleted ? 'Complete some reminders to see them here' : 'Tap the + button to create your first reminder'}
            </Text>
          </View>
        ) : (
          (showCompleted ? completedReminders : upcomingReminders).map((reminder) => (
            <View key={reminder.id} className="bg-slate-800 rounded-xl p-4 mb-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View className={`w-3 h-3 rounded-full mr-2 ${
                      reminder.priority === 'high' ? 'bg-red-500' : 
                      reminder.priority === 'medium' ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`} />
                    <Text className={`text-lg font-semibold ${reminder.isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {reminder.title}
                    </Text>
                  </View>
                  {reminder.description && (
                    <Text className={`text-gray-400 text-sm ml-5 mb-1 ${reminder.isCompleted ? 'line-through' : ''}`}>
                      {reminder.description}
                    </Text>
                  )}
                  <View className="flex-row items-center ml-5 mb-1">
                    <Ionicons name="calendar-outline" size={16} color="#FFA726" />
                    <Text className="text-[#FFA726] ml-1 mr-4">
                      {new Date(reminder.date).toLocaleDateString()}
                    </Text>
                    <Ionicons name="time-outline" size={16} color="#FFA726" />
                    <Text className="text-[#FFA726] ml-1">{reminder.time}</Text>
                  </View>
                </View>
                <View className="flex-row items-center ml-3">
                  <TouchableOpacity
                    onPress={() => deleteReminder(reminder.id)}
                    className="p-2 rounded-full bg-slate-700 mr-2"
                  >
                    <Ionicons name="trash-outline" size={24} color="#ef4444" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => toggleComplete(reminder.id)}
                    className={`p-2 rounded-full ${reminder.isCompleted ? 'bg-green-500/20' : 'bg-slate-700'}`}
                  >
                    <Ionicons 
                      name={reminder.isCompleted ? "checkmark-circle" : "checkmark-circle-outline"} 
                      size={32} 
                      color={reminder.isCompleted ? "#22c55e" : "#64748b"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}