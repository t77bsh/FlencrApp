// Waitlist
import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import GradientBackground from './_components/GradientBackground';

export default function Waitlist() {
  const {width, height} = Dimensions.get('window');

  return (
    // Waitlist
    <GradientBackground>
      <View className="flex-1 relative justify-center space-y-10 items-center p-4 ">
        <ConfettiCannon
          count={200}
          origin={{x: width / 2, y: height / 2}}
          explosionSpeed={700}
          fallSpeed={1000}
          fadeOut
        />
        <Image
          source={require('../../assets/images/heartlock.png')}
          className="h-36"
          resizeMode="contain"
        />
        <View className="space-y-2">
          <Text className="text-3xl font-bold text-purple text-center">
            Thank you!
          </Text>
          <Text className="text-lg font-semibold text-gray-600">
            We are officially at full capacity. You will be notified when your
            spot becomes available!
          </Text>
        </View>
      </View>
    </GradientBackground>
  );
}
