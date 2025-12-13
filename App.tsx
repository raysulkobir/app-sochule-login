
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleLogin from './GoogleLogin';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { useEffect } from 'react';

function App() {
  const Stack = createNativeStackNavigator();
  ;

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permissions enabled:', authStatus);
      } else {
        Alert.alert(
          'Permissions not granted',
          'Please enable notifications manually in your settings.'
        );
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background Notification:', remoteMessage);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        'Notification Received',
        remoteMessage.notification?.title || 'You have a new message!',
        [
          {
            text: 'OK',
            onPress: () => console.log('Notification handled'),
          },
        ]
      );
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GoogleLogin">
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;