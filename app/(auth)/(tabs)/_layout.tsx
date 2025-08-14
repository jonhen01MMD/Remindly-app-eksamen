import { HapticTab } from '@/components/HapticTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { router, Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import AddReminderBottomSheet from '../../../components/AddReminderBottomSheet';
import { useSettings } from '../../../stores/SettingsStore';

export default function TabLayout() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { settings } = useSettings();

  return (
      <View className="relative flex-1">
        <Tabs
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#FFA726',
            headerShown: true,
            tabBarButton: HapticTab,
            headerTransparent: true,
            headerTitle: '',
            tabBarStyle: {
              backgroundColor: '#1F2937',
              height: 85,
              paddingTop: 12,
            },
            headerRight: () => (
                <TouchableOpacity className="absolute bg-[#FFA726] p-1 rounded-full right-4 top-4 w-12 h-12 items-center justify-center overflow-hidden" onPress={() => router.push('../settings')}>
                  {settings.profileImage ? (
                    <Image 
                      source={{ uri: settings.profileImage }} 
                      className="w-full h-full rounded-full"
                      style={{ width: 38, height: 38 }}
                    />
                  ) : (
                    <Ionicons
                      name="person"
                      size={24}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
            ),
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color }) => (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="home" size={24} color={color} />
                  <View style={{ height: 10 }} />
                </View>
              ),
              tabBarLabelStyle: { marginTop: 0, fontSize: 12 },
            }}
          />
          <Tabs.Screen
            name="plans"
            options={{
              title: 'Upcoming Plans',
              tabBarIcon: ({ color }) => (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="calendar-outline" size={24} color={color} />
                  <View style={{ height: 10 }} />
                </View>
              ),
              tabBarLabelStyle: { marginTop: 0, fontSize: 12 },
            }}
          />
        </Tabs>

        
        <TouchableOpacity
          className="absolute bottom-32 right-6 bg-[#FFA726] p-3 rounded-full shadow-lg"
          onPress={() => bottomSheetRef.current?.expand()}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>

        {/* Reminder Bottom Sheet */}
        <AddReminderBottomSheet ref={bottomSheetRef} />
      </View>
  );
}
