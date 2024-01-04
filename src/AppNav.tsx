import React from 'react';
import {View, Image} from 'react-native';
import {useAuth} from './contexts/AuthContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateProfile from './Onboarding/CreateProfile';
import Name from './Onboarding/Name';
import Gender from './Onboarding/Gender';
import Height from './Onboarding/Height';
import SexShown from './Onboarding/SexShown';
import Location from './Onboarding/Location';
import Waitlist from './Onboarding/Waitlist';
import WelcomeScreen from './Onboarding/Welcome';
import AreYouInfluencer from './Onboarding/AreYouInfluencer';
import Login from './Onboarding/Login';
import PhoneNumber from './Onboarding/PhoneNumber';
import InviteCode from './Onboarding/InviteCode';
import SocialMediaHandle from './Onboarding/SocialMediaHandle';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {user, loading, defaultAuthScreen} = useAuth();

  //   Loading screen
  if (loading || (user && !defaultAuthScreen)) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F3F6FA] w-screen h-screen">
        <Image
          source={require('../assets/images/logo_purple.png')}
          className="h-20"
          resizeMode="contain"
        />
      </View>
    );
  }

  
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'fade'}}
      initialRouteName={defaultAuthScreen}>
      {/* If user is logged in, show authenticated stack */}
      {user && defaultAuthScreen ? (
        <Stack.Group>
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen name="Name" component={Name} />
          <Stack.Screen name="Gender" component={Gender} />
          <Stack.Screen name="Height" component={Height} />
          <Stack.Screen name="SexShown" component={SexShown} />
          <Stack.Screen
            name="SocialMediaHandle"
            component={SocialMediaHandle}
          />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Waitlist" component={Waitlist} />
        </Stack.Group>
      ) : (
        // If user is not logged in, show unauthenticated stack
        <Stack.Group>
          <Stack.Screen name="Home" component={WelcomeScreen} />
          <Stack.Screen name="AreYouInfluencer" component={AreYouInfluencer} />
          <Stack.Screen name="InviteCode" component={InviteCode} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
