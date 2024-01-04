import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Platform,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import VerificationCode from './VerificationCode';
import Instructions from './_components/Instructions';
import GradientBackground from './_components/GradientBackground';

export default function PhoneNumber({navigation}: any) {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState<boolean | undefined>(
    undefined,
  );
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      // Cleanup
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePhoneLogin = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (e: any) {
      console.log(e);
      // Alert error
      Alert.alert('Error', e.message);
    }
  };

  return (
    <GradientBackground>
      {confirm === null ? (
        <View className="flex-1 justify-between p-4">
          <View className="space-y-6">
            <Instructions
              title="Phone number"
              info="A verification code will be sent to this number via text."
            />

            <View className="w-full space-y-6">
              <PhoneInput
                containerStyle={{
                  width: '100%',
                  borderRadius: 10,
                  backgroundColor: 'rgb(229 231 235)',
                }}
                textContainerStyle={{
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  backgroundColor: 'white',
                }}
                textInputStyle={{
                  fontWeight: '600',
                }}
                ref={phoneInput}
                defaultValue={value}
                defaultCode="GB"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                  const checkValid =
                    phoneInput.current?.isValidNumber(text) || false;
                  setValid(checkValid);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                autoFocus
              />
              {/* <Text className="text-yellow-500 text-base font-semibold">
                📣 — we're officially at full capacity! New users can still
                continue and reserve a spot.
              </Text> */}
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
                navigation.navigate('Login');
              }}>
              <Ionicons name="arrow-back" size={30} color="#C046D3" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`${
                valid ? 'bg-purple' : 'bg-[#bca7bf]'
              } rounded-lg py-3 flex-1 shadow-lg`}
              onPress={() => {
                handlePhoneLogin(formattedValue);
              }}
              disabled={!valid}
              activeOpacity={0.7}>
              <Text className="text-center text-lg font-semibold text-white">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <VerificationCode
          navigation={navigation}
          keyboardOpen={keyboardOpen}
          confirm={confirm}
        />
      )}
    </GradientBackground>
  );
}
