import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../../contexts/AuthContext';
import {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const authForDefaultApp = firebase.auth();

function ContinueBtn({
  navigation,
  valid,
  navigateTo,
  data,
  alertTitle,
  alertMessage,
}: {
  navigation: any;
  valid: boolean | string | undefined;
  navigateTo: string;
  data: object;
  alertTitle?: string | undefined;
  alertMessage?: string | undefined;
}) {
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);

  // The same function as storeDataToUsersProfileData, but it uses try catch and async/await
  const storeDataToUsersProfileData = async (user: FirebaseAuthTypes.User) => {
    try {
      setLoading(true);
      // Change back to !==
      if (process.env.NODE_ENV === 'development') {
        const userRef = firestore().collection('members').doc(user.uid);
        await userRef.update(data);
      }
      navigation.navigate(navigateTo);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Error', error.message);
    }
  };

  return (
    <View className="flex-row">
      <TouchableOpacity
        className={`${
          valid ? 'bg-purple' : 'bg-[#bca7bf]'
        } rounded-lg h-14 justify-center flex-1 shadow-lg`}
        onPress={() => {
          // Alert user asking to confirm
          if (alertTitle && alertMessage) {
            Alert.alert(alertTitle, alertMessage, [
              {
                text: 'Change',
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress: () => {
                  // Store data to user's profile
                  storeDataToUsersProfileData(user!);
                },
              },
            ]);
          } else {
            // Store data to user's profile
            storeDataToUsersProfileData(user!);
          }
        }}
        disabled={!valid || loading}
        activeOpacity={0.7}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-center text-lg font-semibold text-white">
            Continue
          </Text>
        )}
        {/* <TouchableOpacity
          onPress={() => authForDefaultApp.signOut()}
          accessibilityLabel="Sign Out">
          <Text>Sign Out</Text>
        </TouchableOpacity> */}
      </TouchableOpacity>
    </View>
  );
}

export default ContinueBtn;
