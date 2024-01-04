import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoLockup from './_components/LogoLockup';

export default function WelcomeScreen({navigation}: any) {
  return (
    <LinearGradient
      colors={[
        '#3d1139',
        '#591352',
        '#75156b',
        '#911785',
        '#ad189e',
        '#c91ab7',
        '#e51cd0',
        '#d5aedb',
      ]}
      locations={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 1]}
      className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center py-[20%] justify-between">
          {/* Logo */}
          <View className="mt-[20%]">
            <LogoLockup color="white" />
          </View>

          {/* Get Started */}
          <TouchableOpacity
            className="bg-white rounded-full py-4 px-20 shadow-lg"
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AreYouInfluencer')}>
            <Text className="text-purple text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
