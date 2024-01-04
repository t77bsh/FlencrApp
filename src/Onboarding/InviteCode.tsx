import React from 'react';
import {View, Text, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {Input} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientBackground from './_components/GradientBackground';

export default function InviteCode({navigation}: any) {
  const [inviteCode, setInviteCode] = React.useState('');
  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center p-4">
          <View className="space-y-6">
            <Text className="text-3xl font-bold text-[#4E2AEB] text-center">
              Invite Code
            </Text>
            <Text className="text-lg font-semibold text-gray-600">
              Please enter your invite code.
            </Text>
          </View>
          <View className="space-y-4">
            <View className="flex justify-center items-between">
              <Input
                placeholder="e.g. 239017"
                autoFocus
                keyboardType="number-pad"
                onChangeText={setInviteCode}
                maxLength={6}
              />
              <View className="flex-row gap-x-4">
                <TouchableOpacity
                  className="py-3 px-2 bg-white rounded-lg shadow-lg"
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons name="arrow-back" size={30} color="#C046D3" />
                </TouchableOpacity>
                <TouchableOpacity
                  className={`${
                    inviteCode.length < 6 ? 'bg-[#bca7bf]' : 'bg-purple'
                  } rounded-lg py-3 flex-1 shadow-lg`}
                  activeOpacity={0.7}
                  disabled={inviteCode.length < 6}
                  onPress={() => {
                    navigation.navigate('Home');
                    Alert.alert('Sorry', 'Could not find that invite code.');
                  }}>
                  <Text className="text-white text-lg font-semibold text-center">
                    Unlock
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
