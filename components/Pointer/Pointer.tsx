import { Text, View } from "react-native";
import { ColumnProps } from "../../models/column-props";
import { styles } from "./PointerStyles";

export default function Pointer({ width, order }: ColumnProps) {
    const getColor = () => order % 2 ? '#2a2a32' : '#24242c'; // TODO: Вынести в общие функции

    return (
        <View style={[styles.arrowContainer, { width, backgroundColor: getColor() }]}>
            <View style={{ transform: [{ rotate: '90deg' }] }}>
                <Text style={styles.text}>&#10146;</Text>
            </View>
        </View>
    );
}