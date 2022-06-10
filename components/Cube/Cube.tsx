import { Text, View } from "react-native";
import { CubeProps } from "../../models/cube-props";
import { styles } from "./CubeStyles";

export default function Cube({ side, level, isHidden }: CubeProps) {
    const cubeSide = Number(side) - 10;

    function getValue(level: number): number {
        return Math.pow(2, level)
    }
    
    function getCubeColor(level: number): string {
        switch (level) {
            case 1: return '#8c81fb';
            case 2: return '#2aa7d3';
            case 3: return '#43a481';
            case 4: return '#c054e6';
            case 5: return '#e69539';
            case 6: return '#fc6a6a';
            case 7: return '#ac56f7';
            case 8: return '#2497e8';
            case 9: return '#d05cba';
            case 10: return '#9016b7';
            case 11: return '#3014c5';
            case 12: return '#168168';
            case 13: return '#882e17';
            case 14: return '#f99d07';
            case 15: return '#f99d07';
            default: return '#000';
        }
    }

    return (
        <View style={[styles.container, {
            backgroundColor: getCubeColor(level),
            width: cubeSide,
            height: cubeSide,
            opacity: isHidden ? 0 : 1 }]}>
            {/* TODO: Регулировать размер шрифта в зависимости от значения куба */}
            <Text style={[styles.text, { fontSize: level > 10 ? 15 : 20 }]}>{getValue(level)}</Text>
        </View>
    )
}