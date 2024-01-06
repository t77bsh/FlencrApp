import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import GradientBackground from './_components/GradientBackground';

function Name({navigation}: any) {
  const [firstName, setFirstName] = useState('');
  const [valid, setValid] = useState(false);

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4">
        <View className="space-y-6">
          <Instructions
            progress={1}
            title="First name"
            info="Your name will be displayed on your profile."
          />

          <View className="w-full space-y-14">
            <View className="flex-row gap-x-2">
              <TextInput
                className="w-full pl-3 py-4 border-2 border-gray-300 rounded-lg text-2xl font-semibold text-gray-700"
                onChangeText={text => {
                  setFirstName(text[0]?.toUpperCase() + text?.slice(1));
                  setValid(text.length > 2);
                }}
                placeholder="First name"
                placeholderTextColor={'#d1d5db'}
                autoFocus
              />
            </View>
          </View>
        </View>

        {/* Buttons */}
        <ContinueBtn
          navigation={navigation}
          valid={valid}
          navigateTo="Gender"
          data={{firstName: firstName}}
          alertTitle={`Are you ${firstName}?`}
          alertMessage="Double-check your name as it cannot be changed later."
        />
      </View>
    </GradientBackground>
  );
}

export default Name;
