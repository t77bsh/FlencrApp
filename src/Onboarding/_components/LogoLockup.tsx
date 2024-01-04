import {Text, Image, View} from 'react-native';

export default function LogoLockup({color}: {color: string}) {
  return (
    <View className="items-center gap-y-4 mt-[20%]">
      {color === 'white' ? (
        <Image
          source={require('../../../assets/images/logo_white.png')}
          className="h-20"
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require('../../../assets/images/logo_purple.png')}
          className="h-20"
          resizeMode="contain"
        />
      )}

      <Text className={`text-${color} text-lg italic font-semibold`}>
        The private dating app for influencers.
      </Text>
    </View>
  );
}
