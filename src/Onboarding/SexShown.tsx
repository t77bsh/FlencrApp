import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Platform, Keyboard} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import GradientBackground from './_components/GradientBackground';

function Name({navigation}: any) {
  const [preferredSex, setPreferredSex] = useState<
    'Males' | 'Females' | 'Both' | undefined
  >(undefined);

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4">
        <View className="space-y-6">
          <Instructions
            progress={4}
            title="What sex would you like to be shown?"
            info="This can be changed later and will not be shown on your profile."
          />
          <View className="w-full space-y-14">
            <View>
              <CheckBox
                containerStyle={{
                  borderWidth: Platform.select({ios: 1, android: 2}),
                  borderColor:
                    preferredSex === 'Males'
                      ? 'rgb(209 213 219)'
                      : 'rgb(229 231 235)',
                  borderRadius: 8,
                  paddingVertical: 16,
                }}
                checked={preferredSex === 'Males'}
                onPress={() => {
                  setPreferredSex('Males');
                }}
                size={28}
                title="Males"
                textStyle={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: Platform.select({ios: '600', android: '900'}),
                }}
                checkedColor="#C046D3"
              />

              <CheckBox
                containerStyle={{
                  borderWidth: Platform.select({ios: 1, android: 2}),
                  borderColor:
                    preferredSex === 'Females'
                      ? 'rgb(209 213 219)'
                      : 'rgb(229 231 235)',
                  borderRadius: 8,
                  paddingVertical: 16,
                }}
                style={{borderRadius: 30}}
                checked={preferredSex === 'Females'}
                onPress={() => {
                  setPreferredSex('Females');
                }}
                size={28}
                title="Females"
                textStyle={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: Platform.select({ios: '600', android: '900'}),
                }}
                checkedColor="#C046D3"
              />

              <CheckBox
                containerStyle={{
                  borderWidth: Platform.select({ios: 1, android: 2}),
                  borderColor:
                    preferredSex === 'Both'
                      ? 'rgb(209 213 219)'
                      : 'rgb(229 231 235)',
                  borderRadius: 8,
                  paddingVertical: 16,
                }}
                style={{borderRadius: 30}}
                checked={preferredSex === 'Both'}
                onPress={() => {
                  setPreferredSex('Both');
                }}
                size={28}
                title="Both"
                textStyle={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: Platform.select({ios: '600', android: '900'}),
                }}
                checkedColor="#C046D3"
              />
            </View>
          </View>
        </View>

        {/* Buttons */}
        <ContinueBtn
          navigation={navigation}
          navigateTo="SocialMediaHandle"
          valid={preferredSex}
          data={{attractedTo: preferredSex}}
        />
      </View>
    </GradientBackground>
  );
}

export default Name;
