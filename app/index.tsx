import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function loginScreen() {
  const dismissKeyboard = () => Keyboard.dismiss();
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex-1 justify-between p-8 bg-slate-900">
        <View className="pt-24 w-full">
          <Text className="text-4xl font-bold text-white mb-2">Welcome to</Text>
          <Text className="text-5xl font-bold text-[#FFA726] mb-16">
            Remindly
          </Text>
          
          {/* Feature sections */}
          <View className="pt-10">

            <View className="flex-row pb-10">
              <View className="w-12 h-12 bg-slate-800 rounded-full items-center justify-center mr-4">
                <Ionicons name="trending-up-outline" size={24} color="#FFA726" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-semibold text-[#FFA726] mb-2">Activity Tracking</Text>
                <Text className="text-gray-300 text-base leading-5">
                  Your personal reminder assistant that helps you keep track of everything important in your life
                </Text>
              </View>
            </View>
            
            <View className="flex-row pb-10">
              <View className="w-12 h-12 bg-slate-800 rounded-full items-center justify-center mr-4">
                <Ionicons name="person-outline" size={24} color="#FFA726" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-semibold text-[#FFA726] mb-2">Profile Management</Text>
                <Text className="text-gray-300 text-base leading-5">
                  Easily update and manage your personal information, settings, and preferences
                </Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="w-12 h-12 bg-slate-800 rounded-full items-center justify-center mr-4">
                <Ionicons name="phone-portrait-outline" size={24} color="#FFA726" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-semibold text-[#FFA726] mb-2">Local Storage</Text>
                <Text className="text-gray-300 text-base leading-5">
                  All your data is saved securely on your device, ensuring privacy and offline access
                </Text>
              </View>
            </View>

            
          </View>
        </View>

        <View className="w-full">
          <View className="items-center mb-6">
            <Ionicons name="people-outline" size={40} color="#FFA726" />
          </View>
          <Text className="text-sm text-white text-center mb-10">
            By pressing continue, you agree to our{' '}
            <Text className="text-blue-500 underline">Terms of Service</Text>
            {' '}and that you have read our{' '}
            <Text className="text-blue-500 underline">Privacy Policy</Text>
          </Text>
          <TouchableOpacity 
            className="bg-[#FFA726] py-4 rounded-full shadow-full"
            onPress={() => router.replace('/(tabs)')} 
          >
            <Text className="text-center text-white text-lg font-semibold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}