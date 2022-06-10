import { Text, View } from "react-native";
import { CubeProps } from "../../models/cube-props";
import { styles } from "./CubeStyles";

export default function Cube({ side, level, isHidden }: CubeProps) {
    const cubeSide = Number(side) - 10;

    function getValue(level: number): number {
        return Math.pow(2, level)
    }
    
    return (
        <View style={[styles.container, { width: cubeSide, height: cubeSide, opacity: isHidden ? 0 : 1 }]}>
            {/* TODO: Регулировать размер шрифта в зависимости от значения куба */}
            <Text style={styles.text}>{getValue(level)}</Text>
        </View>
    )
}