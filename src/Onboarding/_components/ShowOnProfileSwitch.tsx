import React from 'react';
import {View, Text} from 'react-native';
import {Switch} from '@rneui/themed';

export default function ShowOnProfileSwitch({
  showOnProfile,
  setShowOnProfile,
}: {
  showOnProfile: boolean;
  setShowOnProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View className="bg-white mt-4 mx-2 h-12 px-3 border-gray-200 border-2 rounded-lg flex-row justify-between items-center">
      <Text className="font-semibold text-gray-700">Show on profile</Text>
      <Switch
        value={showOnProfile}
        onValueChange={value => setShowOnProfile(value)}
        trackColor={{
          true: 'purple',
          false: 'rgb(209 213 219)',
        }}
        thumbColor="white"
      />
    </View>
  );
}
