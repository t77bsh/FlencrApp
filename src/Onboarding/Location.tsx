import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import {CheckBox} from '@rneui/themed';
import GradientBackground from './_components/GradientBackground';
import {Bar as ProgressBar} from 'react-native-progress';

// Screen for the user to upload their photos
export default function Location({navigation}: {navigation: any}) {
  const [inOrNearLondon, setInOrNearLondon] = useState<boolean | undefined>(
    undefined,
  );

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4">
        <View className="space-y-6">
          {/* Instructions */}
          <Instructions
            progress={6}
            title="Are you based in or near London?"
            info="There's no correct answer! This information helps our marketing team."
          />

          {/* Yes or no options  */}
          <View className="w-full space-y-14">
            {/* Checkboxes */}
            <View>
              <CheckBox
                containerStyle={{
                  borderWidth: Platform.select({ios: 1, android: 2}),
                  borderColor: 'rgb(229 231 235)',
                  borderRadius: 8,
                  paddingVertical: 16,
                }}
                checked={
                  inOrNearLondon === undefined || inOrNearLondon === false
                    ? false
                    : true
                }
                onPress={() => setInOrNearLondon(true)}
                size={28}
                title="Yes"
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
                  borderColor: 'rgb(229 231 235)',
                  borderRadius: 8,
                  paddingVertical: 16,
                }}
                checked={
                  inOrNearLondon === undefined || inOrNearLondon === true
                    ? false
                    : true
                }
                onPress={() => setInOrNearLondon(false)}
                size={28}
                title="No"
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
          valid={inOrNearLondon !== undefined}
          navigateTo="Waitlist"
          data={{inOrNearLondon: inOrNearLondon}}
        />
      </View>
    </GradientBackground>
  );
}
