import React from 'react';
import {View, Text, Platform} from 'react-native';
import {Bar as ProgressBar} from 'react-native-progress';

function Instructions({
  title,
  info,
  progress,
}: {
  title: string;
  info: string;
  progress?: number | undefined;
}) {
  return (
    <View className="space-y-2 mt-8 items-center">
      {progress && (
        <ProgressBar
          className="mb-5"
          progress={progress / 7}
          width={200}
          color="purple"
          borderWidth={progress === 0 ? 0 : 1}
        />
      )}
      <Text
        className={`text-3xl p-1 text-purple ${Platform.select({
          ios: 'font-bold',
          android: 'font-extrabold',
        })}`}>
        {title}
      </Text>
      {info.length > 0 && (
        <Text className="text-gray-700 font-semibold">{info}</Text>
      )}
    </View>
  );
}

export default Instructions;
