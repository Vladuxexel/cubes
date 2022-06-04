import { StatusBar, View, Text } from 'react-native';
import { styles } from './AppStyles';
import StartPage from './components/StartPage/StartPage';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BestPlayer } from './models/best-player';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayingPage from './components/PlayingPage/PlayingPage';

export default function App() {
  const [fontsLoaded] = useFonts({
    'pm-regular': require('./assets/fonts/PermanentMarker-Regular.ttf'),
  });

  const [bestPlayer, setBestPlayer] = useState<BestPlayer>();

  const getBestPlayer = async () => {
    const stringResult = await AsyncStorage.getItem('winner');
    const result = stringResult ? JSON.parse(stringResult) : null;
    setBestPlayer(result);
  };

  useEffect(() => { getBestPlayer() }, []);

  if (!fontsLoaded || !bestPlayer) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen name='StartPage' options={{ headerShown: false }}>
            {(props) => <StartPage bestPlayer={bestPlayer} navigation={props.navigation} />}
          </Stack.Screen>
          <Stack.Screen name='PlayingPage' component={PlayingPage} options={{ headerShown: false }} />
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
  );
}