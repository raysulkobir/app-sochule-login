
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleLogin from './GoogleLogin';


function App() {
  const Stack = createNativeStackNavigator();
  ;


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GoogleLogin">
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;