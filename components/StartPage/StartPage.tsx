import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./StartPageStyles";
import { StartPageProps } from '../../models/start-page-props'

export default function StartPage({ bestPlayer, navigation }: StartPageProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.headerText]}>Welcome to</Text>
                <Text style={[styles.text, styles.headerText]}>Cubes!</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Image style={styles.crownImage} source={require('../../assets/crown.png')} />
                <Text style={[styles.text, styles.scoreText]}>Best score</Text>
                {bestPlayer && <Text style={[styles.text, styles.winnerText]}>{bestPlayer?.score} points</Text>}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.playButton} onPress={() => {navigation.navigate('PlayingPage')}}>
                    <Text style={[styles.text, styles.buttonText]}>Play</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}