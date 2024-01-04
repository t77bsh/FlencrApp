import React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientBackground from './_components/GradientBackground';
import LogoLockup from './_components/LogoLockup';

function LoginScreen({navigation}: any) {
  return (
    <GradientBackground>
      <Image
        source={require('../../assets/images/topRightCircles.png')}
        className="absolute top-0 right-0 z-10"
        resizeMode="contain"
      />
      <View className="flex-1 gap-y-12 items-center justify-end p-4">
        {/* Back button */}
        <TouchableOpacity
          className="py-4 px-2 absolute top-0 left-0"
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="#C046D3" />
        </TouchableOpacity>

        {/* Logo */}
        <LogoLockup color="purple" />

        {/* Auth options */}
        <View className="space-y-4 mb-24">
          <TouchableOpacity
            className="bg-purple px-10 py-4 rounded-full items-center justify-center"
            onPress={() => {
              navigation.navigate('PhoneNumber');
            }}
            activeOpacity={0.7}>
            <Text className="text-white text-lg font-semibold">
              Continue with phone number
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

export default LoginScreen;
