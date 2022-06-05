import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3a3941',
        height: '100%'
    },
    playingField: {},
    playingFieldContainer: {},
    controlsPanel: {
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2%'
    },
    text: {
        color: '#fff',
        fontFamily: 'pm-regular',
        fontSize: 15
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#09f",
        width: 50,
        height: 50,
        borderRadius: 25
    },
    image: {
        width: '70%',
        height: '70%'
    }, 
    scoreContainer: {
        width: '50%',
        height: '100%',
        backgroundColor: '#23232b',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5a595f',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bestScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    currentScoreText: {
        fontSize: 30
    },
    crownImage: {
        width: 32,
        height: 30,
        marginRight: 10
    }
});