import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {CheckBox} from '@rneui/themed';
import {Switch} from '@rneui/themed';
import ShowOnProfileSwitch from './_components/ShowOnProfileSwitch';
import ContinueBtn from './_components/ContinueBtn';
import Instructions from './_components/Instructions';
import GradientBackground from './_components/GradientBackground';

type GenderType = 'Man' | 'Woman' | 'Non-binary';

function Name({navigation}: any) {
  const [gender, setGender] = useState<GenderType | undefined>(undefined);
  const [showOnProfile, setShowOnProfile] = useState(true);

  const genderOptions: GenderType[] = ['Man', 'Woman', 'Non-binary'];

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4 ">
        <View className="space-y-6">
          <Instructions
            progress={2}
            title="Gender"
            info="You can choose if you want to show this on your profile."
          />

          <View className="w-full space-y-14">
            <View>
              {genderOptions.map((option, index) => (
                <CheckBox
                  key={index}
                  containerStyle={{
                    borderWidth: Platform.select({ios: 1, android: 2}),
                    borderColor:
                      gender === option
                        ? 'rgb(209 213 219)'
                        : 'rgb(229 231 235)',
                    borderRadius: 8,
                    paddingVertical: 16,
                  }}
                  checked={gender === option}
                  onPress={() => {
                    setGender(option);
                  }}
                  size={28}
                  title={option}
                  textStyle={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: Platform.select({ios: '600', android: '900'}),
                  }}
                  checkedColor="#C046D3"
                />
              ))}

              {/* Switch to choose to show gender on profile or not */}
              <ShowOnProfileSwitch showOnProfile={showOnProfile} setShowOnProfile={setShowOnProfile} />
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <ContinueBtn
          valid={gender}
          navigation={navigation}
          navigateTo="Height"
          data={{gender: gender, showGenderOnProfile: showOnProfile}}
          alertTitle="Confirm your gender"
          alertMessage="You cannot change this later."
        />
      </View>
    </GradientBackground>
  );
}

export default Name;
