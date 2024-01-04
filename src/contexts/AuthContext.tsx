import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {Alert} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
// import {ActivityIndicator} from 'react-native';
// import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface AuthProviderProps {
  children: ReactNode;
}
type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  defaultAuthScreen: string | undefined;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  defaultAuthScreen: undefined,
});

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [defaultAuthScreen, setDefaultAuthScreen] = useState<
    string | undefined
  >(undefined);

  const handleUser = async (user: FirebaseAuthTypes.User) => {
    const userRef = firestore().collection('members').doc(user.uid);

    // Check if user is new
    userRef
      .get()
      .then(documentSnapshot => {
        if (!documentSnapshot.exists) {
          // User is new, add user to database
          userRef.set({
            phoneNumber: user.phoneNumber,
            providerId: user.providerId,
            creationDateTime: user.metadata.creationTime,
            uid: user.uid,
          });
          setDefaultAuthScreen('CreateProfile');
        } else {
          // User already exists, navigate to appropriate screen
          const data = documentSnapshot.data();
          if (data && Object.keys(data).length > 0) {
            if (data.dateOfBirth === undefined) {
              setDefaultAuthScreen('CreateProfile');
            } else if (data.firstName === undefined) {
              setDefaultAuthScreen('Name');
            } else if (data.gender === undefined) {
              setDefaultAuthScreen('Gender');
            } else if (data.height === undefined) {
              setDefaultAuthScreen('Height');
            } else if (data.attractedTo === undefined) {
              setDefaultAuthScreen('SexShown');
            } else if (data.socialMediaHandle === undefined) {
              setDefaultAuthScreen('SocialMediaHandle');
            } else if (data.inOrNearLondon === undefined) {
              setDefaultAuthScreen('Location');
            } else {
              // All fields are defined, navigate to waitlist
              setDefaultAuthScreen('Waitlist');
            }
          } else {
            // User exists, but there is no data in the database
            userRef.set({
              phoneNumber: user.phoneNumber,
              providerId: user.providerId,
              creationDateTime: user.metadata.creationTime,
              uid: user.uid,
            });
            setDefaultAuthScreen('CreateProfile');
          }
        }
      })
      .catch(error => {
        console.error('Error', error.message);
        Alert.alert('Error', error.message);
        setDefaultAuthScreen(undefined);
      });
  };

  

  useEffect(() => {
    const timeAtStart = new Date().getTime();
    const unsubscribe = auth().onAuthStateChanged(async user => {
      setDefaultAuthScreen(undefined);
    
      // Update user and loading state
      const timeAtEnd = new Date().getTime();
      const timePassedInSeconds = (timeAtEnd - timeAtStart) / 1000;

      // If the time passed is less than 1 second, wait 1 second before updating the user and loading state, so that the loading screen is not shown for a split second.
      if (timePassedInSeconds < 1) {
        setTimeout(async () => {
          setUser(user);
          setLoading(false);
        }, 1000);
      } else {
        setUser(user);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      handleUser(user);
      console.log('User logged in');
    } else {
      setDefaultAuthScreen(undefined);
      console.log('User not logged in');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{user, loading, defaultAuthScreen}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
