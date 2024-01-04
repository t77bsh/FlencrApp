import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ShowOnProfileSwitch from './_components/ShowOnProfileSwitch';
import ContinueBtn from './_components/ContinueBtn';
import Instructions from './_components/Instructions';
import {Slider, Icon} from '@rneui/themed';
import GradientBackground from './_components/GradientBackground';

function Height({navigation}: any) {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [ft, setFt] = useState<number | undefined>(undefined);
  const [inches, setInches] = useState<number | undefined>(undefined);
  const [cm, setCm] = useState<number | undefined>(undefined);
  const [showOnProfile, setShowOnProfile] = useState(true);

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4">
        <View className="space-y-6">
          <Instructions
            progress={3}
            title="Height"
            info="You can choose if you want to show this on your profile. Drag the slider to select your height."
          />

          <View className="w-full space-y-14">
            <View>
              <Slider
                value={height}
                style={{height: 60, marginHorizontal: 20}}
                onValueChange={value => {
                  const valueInit = value + 36;
                  setHeight(value);
                  setFt(Math.floor(valueInit / 12));
                  setInches(valueInit % 12);
                  setCm(valueInit * 2.54);
                }}
                minimumTrackTintColor="purple"
                maximumValue={60}
                minimumValue={0}
                step={1}
                trackStyle={{height: 5, backgroundColor: 'transparent'}}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: 'transparent',
                }}
                thumbProps={{
                  children: (
                    <Icon
                      name="human-male-height"
                      type="material-community"
                      size={20}
                      reverse
                      containerStyle={{bottom: 20, right: 20}}
                      color="purple"
                    />
                  ),
                }}
              />

              {/* Height in feet and inches where 0 represents 3ft 0in and and 60 represents 8ft  */}
              <Text className="text-xl font-semibold text-gray-700">
                {ft !== undefined && inches !== undefined && cm !== undefined
                  ? ft + ' ft ' + inches + ' in ' + '(' + cm.toFixed(1) + 'cm)'
                  : '3ft 0in (91.4cm)'}
              </Text>

              {/* Switch to choose to show height on profile or not */}
              <ShowOnProfileSwitch
                showOnProfile={showOnProfile}
                setShowOnProfile={setShowOnProfile}
              />
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <ContinueBtn
          valid={height !== undefined ? true : false}
          navigation={navigation}
          navigateTo="SexShown"
          data={{
            height: {ft: ft, inches: inches},
            showHeightOnProfile: showOnProfile,
          }}
        />
      </View>
    </GradientBackground>
  );
}

export default Height;
