import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3a3941',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between'
    },
    header: {
        height: '30%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 45,
        textAlign: 'center'
    },
    scoreContainer: {
        alignItems: 'center'
    },
    footer: {
        height: '20%',
        alignItems: 'center'
    },
    playButton: {
        alignItems: 'center',
        backgroundColor: "#09f",
        width: 300,
        height: 45,
        borderRadius: 25,
        marginTop: 50
    },
    buttonText: {
        fontSize: 30
    },
    crownImage: {
        width: 120,
        height: 100
    },
    scoreText: {
        fontSize: 30,
        paddingBottom: 15
    },
    winnerText: {
        fontSize: 20,
        color: 'yellow',
    },
    text: {
        color: '#fff',
        fontFamily: 'pm-regular'
    }
});