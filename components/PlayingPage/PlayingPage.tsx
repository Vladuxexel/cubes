import { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useInterval } from "../../hooks/useInterval";
import { PlayingPageProps } from "../../models/playing-page-props";
import PlayingContainer from "../PlayingContainer/PlayingContainer";
import { styles } from "./PlayingPageStyles";

export default function PlayingPage({ bestScore }: PlayingPageProps) {
    const [ticks, setTicks] = useState<number>(0);
    const [reset, setReset] = useState<boolean>();
    const [pause, setPause] = useState<boolean>();
    const [gameOver, setGameOver] = useState<boolean>();
    useInterval(() => setTicks(ticks + 1), 1000);

    function handleOverlayClick(): void {
        if (gameOver) {
            setGameOver(false);
            setReset(!reset);
        } else if (pause) {
            setPause(!pause)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.overlay, 
                    { display: pause || gameOver ? 'flex' : 'none', 
                      justifyContent: 'center', alignItems: 'center' }]} onPress={() => handleOverlayClick()} activeOpacity={0.4}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.text, { fontSize: 60 }]}>{pause && 'Paused' || gameOver && 'Game over!'}</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>Tap to {pause && 'continue' || gameOver && 'start again'}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.controlsPanel}>
                <TouchableOpacity style={styles.button} onPress={() => setReset(!reset)}>
                    <Image style={styles.image} source={require('../../assets/restart.png')} />
                </TouchableOpacity>
                <View style={styles.scoreContainer}>
                    <View style={styles.bestScoreContainer}>
                        <Image style={styles.crownImage} source={require('../../assets/crown.png')} />
                        <Text style={styles.text}>{bestScore}</Text>
                    </View>
                    <Text style={[styles.text, styles.currentScoreText]}>194</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => setPause(!pause)}>
                    <Image style={styles.image} source={require('../../assets/pause.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.playingFieldContainer}>
                <PlayingContainer ticks={ticks} reset={!!reset} pause={!!pause} onGameOver={() => setGameOver(true)} />
            </View>
        </View>
    );
}