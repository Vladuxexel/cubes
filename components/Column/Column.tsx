import { Text, View } from "react-native";
import { ColumnProps } from "../../models/column-props";
import { styles } from "./ColumnStyles";

export default function Column({ width, order }: ColumnProps) {
    const getColor = () => order % 2 ? '#2a2a32' : '#24242c';

    return (
        <View style={{ width, backgroundColor: getColor() }}>
            <Text style={styles.text}>{width}</Text>
            <Text style={styles.text}>{order}</Text>
        </View>
    );
}