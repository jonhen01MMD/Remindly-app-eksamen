import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../../../stores/SettingsStore';

export default function ProfileScreen() {
  const { settings, updateSetting, updateMultipleSettings } = useSettings();

  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      await updateSetting('profileImage', result.assets[0].uri);
    }
	}

	const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      await updateSetting('profileImage', result.assets[0].uri);
    }
	}

  const handleCameraIconPress = () => {
		Alert.alert(
			"Upload Profile Picture",
			"Choose an option",
			[
				{
					text: "Take Photo",
					onPress: pickImageFromCamera
				},
				{
					text: "Choose from Library",
					onPress: pickImageFromLibrary
				},
				{
					text: "Cancel",
					style: "cancel"
				}
			],
			{cancelable: true}
		)
	}

  const handleSaveChanges = async () => {
    Alert.alert("Success", "Changes saved successfully!");
  };

  return (
    <ScrollView className="flex-1 bg-slate-900 px-4">
      <View className="flex-1 bg-slate-900 px-4">

        {/* Profilbillede */}
        <View className="items-center my-10 py-4">
          <View className="relative">
            <View className="w-36 h-36 rounded-full bg-slate-700 items-center justify-center overflow-hidden">
              {settings.profileImage ? (
                <Image source={{ uri: settings.profileImage }} className="w-full h-full" />
              ) : (
                <Ionicons name="person-circle-outline" size={120} color="#64748b" />
              )}
            </View>
            <TouchableOpacity
              onPress={handleCameraIconPress} 
              className="absolute bottom-0 right-0 bg-[#FFA726] rounded-full p-2"
              style={{ elevation: 2 }}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 mt-2">Tryk for at ændre billede</Text>
        </View>

        {/* Navn */}
        <View className="mb-4">
          <Text className="text-gray-400 mb-1">Navn</Text>
          <TextInput
            className="bg-slate-800 text-white rounded-lg px-4 py-3"
            value={settings.name}
            onChangeText={(text) => updateSetting('name', text)}
            placeholder="Indtast navn"
            placeholderTextColor="#888"
          />
        </View>

        {/* Email */}
        <View className="mb-8">
          <Text className="text-gray-400 mb-1">Email</Text>
          <TextInput
            className="bg-slate-800 text-white rounded-lg px-4 py-3"
            value={settings.email}
            onChangeText={(text) => updateSetting('email', text)}
            placeholder="Indtast email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          className="bg-[#FFA726] rounded-xl py-4 items-center mb-4"
          onPress={handleSaveChanges}
        >
          <Text className="text-white text-base font-semibold">Gem ændringer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
