import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { forwardRef, useMemo, useState } from 'react';
import { Alert, Keyboard, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useReminders } from '../stores/ReminderStore';

interface AddReminderBottomSheetProps {
  onClose?: () => void;
}

const AddReminderBottomSheet = forwardRef<BottomSheet, AddReminderBottomSheetProps>(
  ({ onClose }, ref) => {
    const { addReminder } = useReminders();
    const snapPoints = useMemo(() => ['75%'], []);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    
    const [newReminder, setNewReminder] = useState({
      title: '',
      description: '',
      date: new Date(),
      priority: 'medium' as 'low' | 'medium' | 'high',
      category: '',
    });

    const handleAddReminder = async () => {
      if (!newReminder.title.trim()) {
        Alert.alert('Error', 'Please enter a title for your reminder');
        return;
      }

      await addReminder({
        title: newReminder.title,
        description: newReminder.description,
        date: newReminder.date.toISOString(),
        time: newReminder.date.toTimeString().slice(0, 5),
        priority: newReminder.priority,
        category: newReminder.category,
      });

      setNewReminder({
        title: '',
        description: '',
        date: new Date(),
        priority: 'medium',
        category: '',
      });
      
      if (ref && 'current' in ref) {
        ref.current?.close();
      }
      onClose?.();
    };

    const handleClose = () => {
      if (ref && 'current' in ref) {
        ref.current?.close();
      }
      onClose?.();
    };

    const toggleMoreOptions = () => {
      setShowMoreOptions(!showMoreOptions);
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#1e293b' }}
        handleIndicatorStyle={{ backgroundColor: '#FFA726' }}
        backdropComponent={BottomSheetBackdrop}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BottomSheetScrollView className="flex-1 px-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">New Reminder</Text>
              <TouchableOpacity 
                onPress={handleClose}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="#FFA726" />
              </TouchableOpacity>
            </View>

            <TextInput
              className="bg-slate-700 text-white rounded-lg px-4 py-3 mb-4"
              placeholder="Reminder title"
              placeholderTextColor="#888"
              value={newReminder.title}
              onChangeText={(text) => setNewReminder({...newReminder, title: text})}
            />

            <TextInput
              className="bg-slate-700 text-white rounded-lg px-4 py-3 mb-4"
              placeholder="Description (optional)"
              placeholderTextColor="#888"
              value={newReminder.description}
              onChangeText={(text) => setNewReminder({...newReminder, description: text})}
              multiline
              numberOfLines={4}
            />

            <View className="mb-4">
              <Text className="text-white text-sm mb-2">Date and Time</Text>
              {Platform.OS === 'ios' ? (
                <View className="flex-row items-center">
                  <DateTimePicker
                    value={newReminder.date}
                    mode="date"
                    display="default"
                    accentColor="#FFA726"
                    minimumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setNewReminder({...newReminder, date: selectedDate});
                      }
                    }}
                  />

                  <DateTimePicker
                    value={newReminder.date}
                    mode="time"
                    display="default"
                    accentColor="#FFA726"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setNewReminder({...newReminder, date: selectedDate});
                      }
                    }}
                  />
                </View>
              ) : (
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 bg-slate-700 rounded-lg py-3 px-4"
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text className="text-white text-center">
                      {newReminder.date.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className="flex-1 bg-slate-700 rounded-lg py-3 px-4"
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text className="text-white text-center">
                      {newReminder.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                  value={newReminder.date}
                  mode="date"
                  display="default"
                  accentColor="#FFA726"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setNewReminder({...newReminder, date: selectedDate});
                    }
                  }}
                />
              )}

              {Platform.OS === 'android' && showTimePicker && (
                <DateTimePicker
                  value={newReminder.date}
                  mode="time"
                  display="default"
                  accentColor="#FFA726"
                  onChange={(event, selectedDate) => {
                    setShowTimePicker(false);
                    if (selectedDate) {
                      setNewReminder({...newReminder, date: selectedDate});
                    }
                  }}
                />
              )}
            </View>

            <View className="mb-10">
              <TouchableOpacity 
                className="flex-row items-center justify-between mb-3"
                onPress={toggleMoreOptions}
              >
                <Text className="text-white text-sm">More Options</Text>
                <Ionicons 
                  name={showMoreOptions ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#FFA726" 
                />
              </TouchableOpacity>

              {showMoreOptions && (
                <View className="mb-2">
                  <Text className="text-white text-sm mb-2">Priority</Text>
                  <View className="flex-row justify-between">
                    {(['low', 'medium', 'high'] as const).map((priority) => (
                      <TouchableOpacity
                        key={priority}
                        className={`flex-1 py-3 rounded-lg mx-2 ${newReminder.priority === priority ? 'bg-[#FFA726]' : 'bg-slate-700'}`}
                        onPress={() => setNewReminder({...newReminder, priority})}
                      >
                        <Text className="text-white text-center capitalize">{priority}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              className="bg-[#FFA726] rounded-lg py-4"
              onPress={handleAddReminder}
            >
              <Text className="text-white text-center font-semibold">Add Reminder</Text>
            </TouchableOpacity>

          </BottomSheetScrollView>
        </TouchableWithoutFeedback>
      </BottomSheet>
    );
  }
);

AddReminderBottomSheet.displayName = 'AddReminderBottomSheet';

export default AddReminderBottomSheet;
