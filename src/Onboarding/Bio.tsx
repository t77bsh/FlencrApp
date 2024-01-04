import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import GradientBackground from './_components/GradientBackground';

// Screen for the user to upload their photos
export default function Photos({navigation}: {navigation: any}) {
  const [bio, setBio] = useState('');

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4">
        <View>
          {/* Instructions */}
          <Instructions title="Bio" info="" />

          {/* Bio  */}
          <TextInput
            multiline
            numberOfLines={7}
            className="w-full rounded-lg text-lg font-semibold text-gray-700"
            onChangeText={setBio}
            placeholder="Tell your future dates about yourself!"
            autoFocus
            maxLength={500}
          />
        </View>

        {/* Buttons */}
        <ContinueBtn
          navigation={navigation}
          valid={true}
          navigateTo="Location"
          data={{bio: bio}}
        />
      </View>
    </GradientBackground>
  );
}
