import { StatusBar, View } from 'react-native';
import { styles } from './AppStyles';
import StartPage from './components/StartPage/StartPage';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BestPlayer } from './models/best-player';

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

  return (
    <View style={styles.container}>
      <StartPage bestPlayer={bestPlayer} />
      <StatusBar />
    </View>
  );
}