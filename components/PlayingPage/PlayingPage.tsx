import { Text, View, Image, TouchableOpacity } from "react-native";
import { PlayingPageProps } from "../../models/playing-page-props";
import { styles } from "./PlayingPageStyles";

export default function PlayingPage({ bestScore }: PlayingPageProps) {
    return (
        <View style={styles.container}>
            <View style={styles.controlsPanel}>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Image style={styles.image} source={require('../../assets/restart.png')} />
                </TouchableOpacity>
                <View style={styles.scoreContainer}>
                    <View style={styles.bestScoreContainer}>
                        <Image style={styles.crownImage} source={require('../../assets/crown.png')} />
                        <Text style={styles.text}>{bestScore}</Text>
                    </View>
                    <Text style={[styles.text, styles.currentScoreText]}>194</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Image style={styles.image} source={require('../../assets/pause.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.playingFieldContainer}>
                <Text style={styles.text}>Palying field</Text>
            </View>
        </View>
    );
}