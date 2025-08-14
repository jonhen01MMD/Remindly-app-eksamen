import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useReminders } from '../../../stores/ReminderStore';
import { useSettings } from '../../../stores/SettingsStore';

export default function HomeScreen() {
  const router = useRouter();
  const { getTodaysReminders, getUpcomingReminders, toggleComplete } = useReminders();
  const { settings } = useSettings();

  const todaysReminders = getTodaysReminders();
  const upcomingReminders = getUpcomingReminders();
  const incompleteTodaysReminders = todaysReminders.filter(r => !r.isCompleted);

  return (
    <ScrollView className='bg-slate-900 pt-20 px-4'>
      {/* Dashboard Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white">Dashboard</Text>
        <Text className="text-gray-400 text-lg">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="mb-6">
        {/* Stats Overview */}
        {incompleteTodaysReminders.length > 0 ? (
          <View className="bg-slate-800 rounded-xl p-6 h-32 justify-center">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-[#FFA726] text-2xl font-bold">{incompleteTodaysReminders.length}</Text>
                <Text className="text-gray-400 text-sm">Reminders left today</Text>
              </View>
              <View className="bg-[#FFA726] rounded-full p-2">
                <Ionicons name="time-outline" size={24} color="white" />
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 items-center h-32 justify-center">
            <Ionicons name="checkmark-circle" size={48} color="#22c55e" />
            <Text className="text-green-400 text-center mt-2 font-semibold">All done for today!</Text>
            <Text className="text-gray-400 text-center text-sm">Great job! 🎉</Text>
          </View>
        )}
      </View>

      {/* Today's Reminders */}
      {todaysReminders.length > 0 && (
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">Today's Reminders</Text>
            <TouchableOpacity onPress={() => router.push('./plans')}>
              <Text className="text-[#FFA726]">View All</Text>
            </TouchableOpacity>
          </View>

          {todaysReminders.slice(0, 3).map((reminder) => (
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
                  <View className="flex-row items-center ml-5">
                    <Ionicons name="time-outline" size={16} color="#FFA726" />
                    <Text className="text-[#FFA726] ml-1">{reminder.time}</Text>
                  </View>
                </View>
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
          ))}
        </View>
      )}

      {/* Upcoming Overview */}
      <View className="mb-8">
        <Text className="text-white text-xl font-semibold mb-4">This Week</Text>
        <View className="bg-slate-800 rounded-xl p-4">
          <Text className="text-gray-400 mb-2">Upcoming reminders: {upcomingReminders.length}</Text>
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <Text className="text-gray-400 text-sm">High priority: {upcomingReminders.filter(r => r.priority === 'high').length}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}