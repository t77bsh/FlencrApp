import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <LinearGradient
        className="flex-1"
        colors={['#F3F6FA', '#d5aedb']}
        start={{x: 0.5, y: 0.7}}>
        <SafeAreaView className="flex-1">{children}</SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
