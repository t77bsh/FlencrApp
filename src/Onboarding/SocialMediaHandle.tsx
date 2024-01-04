import React, {useState} from 'react';
import {View} from 'react-native';
import GradientBackground from './_components/GradientBackground';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import {Input, Icon, ButtonGroup} from '@rneui/themed';

export default function SocialMediaHandle({navigation}: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [handle, setHandle] = useState('');

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4">
        <View className="space-y-6">
          <Instructions
            progress={5}
            title="Insta OR TikTok"
            info="Please share only one of either your Instagram OR TikTok handle that has at least 10k followers."
          />

          <View className="w-full">
            <ButtonGroup
              containerStyle={{borderRadius: 10}}
              selectedButtonStyle={{backgroundColor: '#C046D3'}}
              buttons={[
                <Icon
                  type="ionicon"
                  color={selectedIndex === 0 ? 'white' : undefined}
                  name="logo-instagram"
                />,
                <Icon
                  type="ionicon"
                  color={selectedIndex !== 0 ? 'white' : undefined}
                  name="logo-tiktok"
                />,
              ]}
              selectedIndex={selectedIndex}
              onPress={index => {
                setSelectedIndex(index);
                setHandle('');
              }}
            />
            <View>
              <Input
                autoCapitalize="none"
                onChangeText={setHandle}
                maxLength={selectedIndex === 0 ? 30 : 24}
                autoFocus
                placeholder={`my_${
                  selectedIndex === 0 ? 'insta' : 'tiktok'
                }_handle`}
                leftIcon={{
                  type: 'material',
                  name: 'alternate-email',
                }}
                errorMessage="Must have at least 10k followers."
                errorStyle={{color: 'black', fontWeight: '500', fontSize: 12}}
                value={handle}
              />
            </View>
          </View>
        </View>

        {/* Buttons */}
        <ContinueBtn
          navigation={navigation}
          valid={handle.length > 0 && handle.length < 31}
          navigateTo="Location"
          data={{
            socialMediaType: selectedIndex === 0 ? 'instagram' : 'tiktok',
            socialMediaHandle: handle,
          }}
          alertTitle={`${
            selectedIndex === 0 ? 'Instagram' : 'TikTok'
          }: @${handle}`}
          alertMessage="Double-check your handle."
        />
      </View>
    </GradientBackground>
  );
}
