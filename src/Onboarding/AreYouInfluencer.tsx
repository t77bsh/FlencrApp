import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native';
import GradientBackground from './_components/GradientBackground';
export default function AreYouInfluencer({navigation}: any) {
  const [meetsFollowersRequirement, setMeetsFollowersRequirement] =
    useState(false);

  return (
    <GradientBackground>
      <Image
        source={require('../../assets/images/topRightCircles.png')}
        className="absolute top-0 right-0 z-10"
        resizeMode="contain"
      />
      <View className="flex-1 gap-y-6 items-center justify-center p-4">
        <TouchableOpacity
          className="py-4 px-2 absolute top-0 left-0"
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="#C046D3" />
        </TouchableOpacity>

        <Text
          className={`text-lg p-1 text-black ${Platform.select({
            ios: 'font-bold',
            android: 'font-extrabold',
          })}`}>
          We're currently invite-only. However, you can request an invite if you
          have 10k or more followers on Instagram or TikTok.
        </Text>
        <View className="w-full space-y-14">
          {/* Checkboxes */}
          <View>
            <CheckBox
              containerStyle={{
                borderWidth: Platform.select({ios: 1, android: 2}),
                borderColor: meetsFollowersRequirement
                  ? 'rgb(209 213 219)'
                  : 'rgb(229 231 235)',
                borderRadius: 8,
                paddingVertical: 16,
              }}
              checked={meetsFollowersRequirement}
              onPress={() => {
                setMeetsFollowersRequirement(true);
              }}
              size={28}
              title="Yes, I have 10k or more followers."
              textStyle={{
                fontSize: 17,
                color: 'black',
                fontWeight: Platform.select({ios: '600', android: '900'}),
              }}
              checkedColor="#C046D3"
            />

            <CheckBox
              containerStyle={{
                borderWidth: Platform.select({ios: 1, android: 2}),
                borderColor: !meetsFollowersRequirement
                  ? 'rgb(209 213 219)'
                  : 'rgb(229 231 235)',
                borderRadius: 8,
                paddingVertical: 16,
              }}
              style={{borderRadius: 30}}
              checked={!meetsFollowersRequirement}
              onPress={() => {
                setMeetsFollowersRequirement(false);
              }}
              size={28}
              title="No, I don't have 10k followers."
              textStyle={{
                fontSize: 17,
                color: 'black',
                fontWeight: Platform.select({ios: '600', android: '900'}),
              }}
              checkedColor="#C046D3"
            />
          </View>
          <View className="space-y-5">
            <TouchableOpacity
              className="bg-purple rounded-lg py-3"
              onPress={() => {
                if (meetsFollowersRequirement) {
                  navigation.navigate('Login');
                } else {
                  Alert.alert(
                    'Sorry',
                    'You are not yet eligible.',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {
                          if (Platform.OS === 'android') {
                            navigation.navigate('Home');
                          }
                        },
                      },
                    ],
                    // Only works on Android
                    {cancelable: false},
                  );

                  // iOS modals are not cancelable hence navigate the user manually.
                  if (Platform.OS === 'ios') {
                    navigation.navigate('Home');
                  }
                }
              }}
              activeOpacity={0.7}>
              <Text className="text-center text-lg font-semibold text-white">
                {meetsFollowersRequirement ? 'Request Invite' : 'Continue'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InviteCode');
              }}>
              <Text className="text-center text-lg font-semibold text-purple">
                I have an invite already
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}
