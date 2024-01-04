import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Instructions from './_components/Instructions';

function VerificationCode({navigation, keyboardOpen, confirm}: any) {
  const [verificationCodeValid, setVerificationCodeValid] = useState(false);
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));

  const inputs = useRef<(TextInput | null)[]>(new Array(6).fill(null));

  const handleInput = (text: string, index: number) => {
    // Check if at least six digits have been inputted
    if (text.length === 1 && index === 5) {
      setVerificationCodeValid(true);
    } else {
      setVerificationCodeValid(false);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next field if text is entered
    if (text && index < 5 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      const newCode = [...code];
      newCode[index] = ''; // Clear the current cell
      newCode[index - 1] = ''; // Clear the previous cell
      setCode(newCode);
      inputs.current[index - 1]?.focus();
    }
  };

  async function confirmCode() {
    try {
      await confirm.confirm(code.join(''));
      // navigation.navigate('CreateProfile');
      console.log('Success');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View className="flex-1 justify-between p-4">
      <View className="space-y-6">
        <Instructions
          title="Verification Code"
          info="You will receive a verification code via text shortly."
        />

        <View className="w-full space-y-14">
          <View className="flex-row justify-between gap-x-3">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                className="flex-1 py-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-semibold text-gray-700"
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => handleInput(text, index)}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(index);
                  }
                }}
                value={digit}
                ref={ref => {
                  inputs.current[index] = ref;
                }}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View
        className="flex-row gap-x-4"
        style={{
          marginBottom: keyboardOpen ? 0 : 48,
        }}>
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
            verificationCodeValid ? 'bg-purple' : 'bg-[#bca7bf]'
          } rounded-lg py-3 flex-1 shadow-lg`}
          onPress={confirmCode}
          disabled={!verificationCodeValid}
          activeOpacity={0.7}>
          <Text className="text-center text-lg font-semibold text-white">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default VerificationCode;
