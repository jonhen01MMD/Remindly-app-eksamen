import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../../../stores/SettingsStore';

export default function SettingsScreen() {
  const { settings, updateSetting } = useSettings();
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <ScrollView className='bg-slate-900 pt-10'>
      {/* Account section */}
      <View className="px-4 mb-8">
        <Text className="text-gray-400 text-xs mb-2">Account</Text>
        <TouchableOpacity
          className="flex-row items-center bg-slate-800 rounded-xl px-4 py-4 mb-2"
          onPress={() => router.push('../settings/profile')}
        >
          <Ionicons name="person-circle-outline" size={24} color="#FFA726" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-base">Profile</Text>
            <Text className="text-gray-400 text-xs">View and edit your profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Settings section */}
      <View className="px-4 mb-8">
        <Text className="text-gray-400 text-xs mb-2">Settings</Text>
        <View className="bg-slate-800 rounded-xl">
          <View className="flex-row items-center px-4 py-4 border-b border-slate-700">
            <Ionicons name="notifications-outline" size={22} color="#FFA726" className="mr-4" />
            <Text className="text-white flex-1 text-base">Notifications</Text>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => updateSetting('notificationsEnabled', value)}
              thumbColor={settings.notificationsEnabled ? "#fff" : "#ccc"}
              trackColor={{ false: "#555", true: "#FFA726" }}
            />
          </View>
          <View className="flex-row items-center px-4 py-4">
            <Ionicons name="moon-outline" size={22} color="#FFA726" className="mr-4" />
            <Text className="text-white flex-1 text-base">Dark mode</Text>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => updateSetting('darkMode', value)}
              thumbColor={settings.darkMode ? "#fff" : "#ccc"}
              trackColor={{ false: "#555", true: "#FFA726" }}
            />
          </View>
        </View>
      </View>

      {/* Privacy and Security section */}
      <View className="px-4 mb-8">
        <Text className="text-gray-400 text-xs mb-2">Privacy and security</Text>
        <TouchableOpacity
          className="flex-row items-center bg-slate-800 rounded-xl px-4 py-4 mb-2"
          onPress={() => router.push('../settings/privacy')}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="#FFA726" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-base">Privacy and security</Text>
            <Text className="text-gray-400 text-xs">Manage your privacy and security settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* About section */}
      <View className="px-4 mb-8">
        <Text className="text-gray-400 text-xs mb-2">About</Text>
        <TouchableOpacity 
          className="flex-row items-center bg-slate-800 rounded-xl px-4 py-4 mb-2"
          onPress={() => setShowAboutModal(true)}
        >
          <Ionicons name="information-circle-outline" size={24} color="#FFA726" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-base">About Remindly</Text>
            <Text className="text-gray-400 text-xs">Version 1.0.0</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* About Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAboutModal}
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-slate-800 rounded-xl mx-6 p-6 max-w-sm">
            <View className="items-center mb-4">
              <Ionicons name="information-circle" size={48} color="#FFA726" />
              <Text className="text-white text-xl font-bold mt-2">About Remindly</Text>
            </View>
            
            <Text className="text-gray-300 text-center mb-4">
              Remindly is a simple and intuitive reminder app designed to help you stay organized and never miss important tasks or events.
            </Text>
            
            <Text className="text-gray-300 text-center mb-4">
              Built with React Native and Expo, this app provides a seamless experience across different platforms.
            </Text>
            
            <View className="items-center mb-4">
              <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
              <Text className="text-gray-400 text-sm">Made by Jonas Schøn Henriksen</Text>
            </View>
            
            <TouchableOpacity
              className="bg-orange-500 rounded-lg py-3 px-6"
              onPress={() => setShowAboutModal(false)}
            >
              <Text className="text-white text-center font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}