import { StatusBar } from 'react-native';
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
        <Stack.Navigator initialRouteName="StartPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name='StartPage'>
            {(props) => <StartPage bestPlayer={bestPlayer} navigation={props.navigation} />}
          </Stack.Screen>
          <Stack.Screen name='PlayingPage'>
            {() => <PlayingPage bestScore={bestPlayer.score} />}
          </Stack.Screen>
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
  );
}